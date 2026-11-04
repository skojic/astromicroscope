// Crawl of a deployed site: the launch check M13-01 (status codes, canonicals, hreflang, orphans) against the live address.
//   node scripts/crawl.mjs <baseUrl> [--mode preview|production] [--strict]
// Follows internal links from / and /en/, then fetches every sitemap URL. Without --strict, internal links to pages that do
// not exist yet (modules not built) are warnings; with --strict (launch gate) they fail, as do redirect chains and orphans.
// seo-check.mjs does the same on the built files; this one sees what the server really sends.
import { fileURLToPath } from 'node:url';

const ASSET = /\.(css|js|mjs|png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|xml|txt|json|pdf|zip|map)$/i;

export function extractLinks(html) {
  return [...html.matchAll(/<a\s[^>]*?href="([^"]+)"/gi)].map((m) => m[1].replaceAll('&amp;', '&'));
}

/** Internal path of a link ("/x/", "https://host/x/#a" -> "/x/"), or null for other hosts, mail, anchors, assets. */
export function internalPath(href, base, from = '/') {
  if (/^(mailto|tel|javascript):/i.test(href) || href.startsWith('#')) return null;
  let u;
  try { u = new URL(href, new URL(from, base)); } catch { return null; }
  if (u.origin !== new URL(base).origin) return null;
  return ASSET.test(u.pathname) ? null : u.pathname;
}

export function readHead(html) {
  const meta = (re) => html.match(re)?.[1] ?? null;
  return {
    title: meta(/<title>([^<]*)<\/title>/i),
    description: meta(/<meta name="description" content="([^"]*)"/i),
    canonical: meta(/<link rel="canonical" href="([^"]*)"/i),
    robots: meta(/<meta name="robots" content="([^"]*)"/i),
    lang: meta(/<html lang="([^"]*)"/i),
    hreflang: Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)].map((m) => [m[1], m[2]])),
  };
}

async function fetchPage(base, path) {
  let url = base + path;
  const chain = [];
  for (let hop = 0; hop < 6; hop++) {
    const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'astromicroscope-crawl' }, signal: AbortSignal.timeout(15000) });
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      chain.push({ status: res.status, to: res.headers.get('location') });
      url = new URL(res.headers.get('location'), url).href;
      continue;
    }
    const type = res.headers.get('content-type') ?? '';
    return { status: res.status, chain, finalPath: new URL(url).pathname, html: type.includes('text/html') ? await res.text() : '' };
  }
  return { status: 0, chain, finalPath: path, html: '' };
}

export async function crawl(base, { mode = 'preview', strict = false, max = 300 } = {}) {
  const failures = [], warnings = [];
  const problem = (where, msg, soft = false) => (soft && !strict ? warnings : failures).push(`${where}: ${msg}`);
  const pages = new Map(); // path -> result
  const linkedFrom = new Map();
  const queue = ['/', '/en/'];
  const enqueue = (p, from) => { if (!linkedFrom.has(p)) linkedFrom.set(p, new Set()); if (from) linkedFrom.get(p).add(from); if (!pages.has(p) && !queue.includes(p)) queue.push(p); };
  while (queue.length && pages.size < max) {
    const path = queue.shift();
    if (pages.has(path)) continue;
    let r;
    try { r = await fetchPage(base, path); } catch (e) { pages.set(path, { status: 0 }); problem(path, `unreachable (${e.message ?? e})`); continue; }
    pages.set(path, r);
    if (r.chain.length > 1) problem(path, `redirect chain of ${r.chain.length} hops`, true);
    if (r.status !== 200) continue;
    for (const href of extractLinks(r.html)) { const p = internalPath(href, base, r.finalPath); if (p) enqueue(p, path); }
  }
  const reachable = new Set([...pages.keys()].filter((p) => pages.get(p).status === 200));

  for (const [path, r] of pages) {
    if (r.status === 200) {
      const h = readHead(r.html);
      if (!h.title?.trim()) problem(path, 'no title');
      if (!h.description?.trim()) problem(path, 'no meta description');
      if (!h.canonical) problem(path, 'no canonical');
      else if (new URL(h.canonical).pathname !== path && !r.chain.length) problem(path, `canonical ${h.canonical} is not the page itself`);
      const noindex = /noindex/i.test(h.robots ?? '');
      if (mode === 'preview' && !noindex) problem(path, 'preview page without noindex');
      if (mode === 'production' && noindex) problem(path, 'noindex on production');
      for (const lang of ['sr', 'en']) {
        const alt = h.hreflang[lang];
        if (!alt) { problem(path, `no hreflang ${lang}`); continue; }
        const altPath = new URL(alt).pathname;
        const other = pages.get(altPath) ?? await fetchPage(base, altPath).catch(() => null);
        if (other && !pages.has(altPath)) pages.set(altPath, other);
        if (!other || other.status !== 200) { problem(path, `hreflang ${lang} ${altPath} returns ${other?.status ?? 'nothing'}`); continue; }
        const back = readHead(other.html).hreflang[h.lang === 'en' ? 'en' : 'sr'];
        if (!back || new URL(back).pathname !== path) problem(path, `${altPath} has no hreflang link back to this page`);
      }
    } else if (r.status === 404 && (linkedFrom.get(path)?.size ?? 0) > 0) {
      problem(path, `internal link target returns 404 (linked from ${[...linkedFrom.get(path)].slice(0, 2).join(', ')})`, true);
    } else if (r.status !== 404 && r.status !== 0) {
      problem(path, `returns ${r.status}`);
    }
  }

  // sitemap
  let sitemapPaths = [];
  try {
    const sm = await fetch(`${base}/sitemap.xml`, { signal: AbortSignal.timeout(15000) });
    const xml = await sm.text();
    sitemapPaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    if (!sitemapPaths.length) problem('sitemap.xml', 'lists no URLs');
  } catch (e) { problem('sitemap.xml', `unreachable (${e.message ?? e})`); }
  for (const p of sitemapPaths) {
    const r = pages.get(p) ?? await fetchPage(base, p).catch(() => ({ status: 0 }));
    if (!pages.has(p)) pages.set(p, r);
    if (r.status !== 200) problem('sitemap.xml', `lists ${p}, which returns ${r.status}`);
    else if (!reachable.has(p)) problem('sitemap.xml', `${p} is an orphan: in the sitemap, linked from no page`, true);
  }
  return { pages: pages.size, failures, warnings };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const base = args.find((a) => /^https?:/.test(a))?.replace(/\/$/, '');
  if (!base) throw new Error('usage: node scripts/crawl.mjs <baseUrl> [--mode preview|production] [--strict]');
  const mode = args.includes('--mode') ? args[args.indexOf('--mode') + 1] : 'preview';
  const { pages, failures, warnings } = await crawl(base, { mode, strict: args.includes('--strict') });
  for (const w of warnings) console.log(`warn  ${w}`);
  for (const f of failures) console.log(`FAIL  ${f}`);
  console.log(`crawl: ${base} (${mode}${args.includes('--strict') ? ', strict' : ''}) ${pages} pages, ${failures.length} failure(s), ${warnings.length} warning(s)`);
  if (failures.length) process.exit(1);
}
