// SEO and link audit of the built site (dist/), the automated part of G2 (testing/gates.md) and testing/checklists/seo.md.
// Needs a built dist/ and a Chromium, like scripts/axe.mjs. No network: external links are not followed.
//
// Per page: title and description present, unique and not too long; canonical is the page itself; hreflang sr, en and
// x-default with return links to pages that exist; Open Graph and Twitter tags, og:image exists; JSON-LD parses and has
// the fields its type needs; images have alt and exist; robots meta matches the environment.
// Site-wide: sitemap lists every indexable page and nothing else; robots.txt matches the environment; every internal
// link and #anchor resolves; no "click here" link text.
//
// Pages of modules that are not built yet (routes in src/i18n/routes.ts) are reported as pending, not as failures.
// SEO_STRICT=1 turns pending links into failures: use it for the launch gate (M13).
import { readdir, readFile, access } from 'node:fs/promises';
import { join, relative, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { serveDist } from './serve-dist.mjs';
import { ROUTES } from '../src/i18n/routes.ts';

const dist = process.env.SEO_DIST ?? fileURLToPath(new URL('../dist', import.meta.url)); // SEO_DIST: audit another folder (used to test the audit itself)
const strict = process.env.SEO_STRICT === '1';
const failures = [];
const pending = new Map();
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

const exists = (p) => access(p).then(() => true, () => false);
async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const urlOf = (file) => '/' + relative(dist, file).split(sep).join('/').replace(/index\.html$/, '');
const is404 = (url) => url.endsWith('/404.html');

const urls = (await htmlFiles(dist)).map(urlOf).sort();
const server = await serveDist(dist);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
const page = await browser.newPage();

// ---------- read every page ----------
// The page is a static file: a static server has answered at load, and nothing adds a head tag after it, so 'load' is
// enough (the usual 'networkidle' waits ~500 ms per page for nothing, D56).
const data = {};
for (const url of urls) {
  await page.goto(base + url, { waitUntil: 'load' });
  data[url] = await page.evaluate(() => {
    const meta = (sel, a = 'content') => document.querySelector(sel)?.getAttribute(a) ?? null;
    const ld = [];
    for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
      try { const j = JSON.parse(s.textContent); ld.push(...(j['@graph'] ?? [j])); } catch { ld.push({ '@type': 'INVALID' }); }
    }
    return {
      title: document.title.trim(),
      description: meta('meta[name=description]'),
      robots: meta('meta[name=robots]'),
      canonical: meta('link[rel=canonical]', 'href'),
      hreflang: Object.fromEntries([...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => [l.hreflang, l.getAttribute('href')])),
      og: Object.fromEntries(['og:title', 'og:description', 'og:image', 'og:url'].map((p) => [p, meta(`meta[property="${p}"]`)])),
      twitter: meta('meta[name="twitter:card"]'),
      ld,
      ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
      images: [...document.images].map((i) => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt') })),
      links: [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), hidden: !!a.closest('[aria-hidden="true"]'), text: (a.textContent.trim() || a.querySelector('img')?.getAttribute('alt') || '').trim().toLowerCase(), label: (a.getAttribute('aria-label') || '').toLowerCase() })),
    };
  });
}
await browser.close();
server.close();

// ---------- environment ----------
const robotsTxt = await readFile(join(dist, 'robots.txt'), 'utf8').catch(() => '');
const preview = /^Disallow:\s*\/\s*$/m.test(robotsTxt);
const home = data['/'];
if (!home?.canonical) throw new Error('dist/index.html has no canonical link: cannot tell the site origin');
const origin = new URL(home.canonical).origin;
const indexable = urls.filter((u) => !is404(u));
console.log(`seo-check: ${urls.length} pages (${indexable.length} indexable), ${preview ? 'preview/local build (robots: Disallow /)' : 'production build'}, origin ${origin}${strict ? ', strict' : ''}`);

if (!preview && !/^Allow:\s*\/\s*$/m.test(robotsTxt)) fail('robots.txt', 'production robots.txt does not allow crawling');
if (!preview && !/^Sitemap:\s*\S+/m.test(robotsTxt)) fail('robots.txt', 'no Sitemap line'); // a preview robots.txt only says Disallow

// ---------- per page ----------
const seen = { title: new Map(), description: new Map() };
const requiredLd = {
  VideoObject: ['name', 'description', 'thumbnailUrl', 'uploadDate'],
  BreadcrumbList: ['itemListElement'],
  Organization: ['name', 'url'],
  Article: ['headline', 'datePublished', 'author'],
};
for (const url of urls) {
  const d = data[url];
  const noindex = /noindex/.test(d.robots ?? '');
  if (is404(url)) { if (!noindex) fail(url, '404 page without noindex'); continue; }
  if (preview ? !noindex : noindex) fail(url, preview ? 'preview build page without noindex' : `noindex in a production build (${d.robots})`);

  if (!d.title) fail(url, 'no title');
  else { if (d.title.length > 70) fail(url, `title is ${d.title.length} characters`); seen.title.set(d.title, [...(seen.title.get(d.title) ?? []), url]); }
  if (!d.description) fail(url, 'no meta description');
  else { if (d.description.length > 160) fail(url, `description is ${d.description.length} characters`); seen.description.set(d.description, [...(seen.description.get(d.description) ?? []), url]); }

  if (!d.canonical) fail(url, 'no canonical');
  else if (new URL(d.canonical).pathname !== url) fail(url, `canonical ${d.canonical} is not the page itself`);

  // M14 pending: during the build phase a page in only Serbian (no en pair, or an en link to an unbuilt page) is a
  // pending English work item, not a failure — the strict mode (launch gate, SEO_STRICT=1) still requires full pairs.
  if (strict) { for (const k of ['sr', 'en', 'x-default']) if (!d.hreflang[k]) fail(url, `no hreflang ${k}`); }
  else {
    for (const k of ['sr', 'x-default']) if (!d.hreflang[k]) fail(url, `no hreflang ${k}`);
    if (!d.hreflang['en'] && d.hreflang['sr']) pending.set(`en ${url}`, [...(pending.get(`en ${url}`) ?? []), url]);
  }
  const self = url.startsWith('/en/') ? 'en' : 'sr';
  for (const lang of ['sr', 'en']) {
    if (!d.hreflang[lang]) continue;
    const target = new URL(d.hreflang[lang], origin).pathname;
    if (!data[target]) {
      // D48-consistent: during the build phase the English mirror exists only after M14. A preview build (not strict)
      // treats a missing/unbuilt English pair as pending work, not a failure. The strict mode (launch gate) still fails.
      if (!strict && lang === 'en') { pending.set(target, [...(pending.get(target) ?? []), url]); continue; }
      fail(url, `hreflang ${lang} points to ${target}, which is not built`); continue;
    }
    const back = data[target].hreflang[self];
    if (!back || new URL(back, origin).pathname !== url) fail(url, `${target} has no hreflang ${self} link back to this page`);
  }

  for (const [k, v] of Object.entries(d.og)) if (!v) fail(url, `no ${k}`);
  if (!d.twitter) fail(url, 'no twitter:card');
  if (d.og['og:image']) {
    const p = new URL(d.og['og:image'], origin).pathname;
    if (!(await exists(join(dist, p)))) fail(url, `og:image ${p} is not in dist`);
  }

  for (const n of d.ld) {
    if (n['@type'] === 'INVALID') { fail(url, 'JSON-LD does not parse'); continue; }
    for (const field of requiredLd[n['@type']] ?? []) if (n[field] == null || n[field] === '') fail(url, `JSON-LD ${n['@type']} has no ${field}`);
    // Google's Rich Results Test flags a bare date here ("Invalid datetime value", "missing a timezone"): need date, time and offset.
    if (n['@type'] === 'VideoObject' && n.uploadDate && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(n.uploadDate)) fail(url, `JSON-LD VideoObject uploadDate "${n.uploadDate}" has no time and timezone`);
  }
  if (url !== '/' && url !== '/en/' && !d.ld.some((n) => n['@type'] === 'BreadcrumbList')) fail(url, 'no BreadcrumbList JSON-LD on an inner page');

  for (const img of d.images) {
    if (img.alt == null) fail(url, `image ${img.src} has no alt attribute`);
    if (img.src && !/^(https?:|data:)/.test(img.src) && !(await exists(join(dist, new URL(img.src, origin + url).pathname)))) fail(url, `image ${img.src} is not in dist`);
  }
}
for (const [kind, map] of Object.entries(seen)) for (const [text, us] of map) if (us.length > 1) fail(us.join(', '), `same ${kind}: "${text.slice(0, 60)}"`);

// ---------- sitemap ----------
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8').catch(() => '');
const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
if (!sitemap) fail('sitemap.xml', 'missing');
for (const u of indexable) if (!inSitemap.has(u) && !/noindex/.test(data[u].robots ?? '')) fail('sitemap.xml', `does not list ${u}`);
for (const u of inSitemap) if (!data[u]) fail('sitemap.xml', `lists ${u}, which is not built`);

// ---------- links ----------
const known = new Set(Object.values(ROUTES).flatMap((p) => Object.values(p)));
const BAD_TEXT = new Set(['click here', 'here', 'klikni ovde', 'kliknite ovde', 'ovde']);
async function resolves(pathname) {
  const p = decodeURIComponent(pathname);
  if (data[p]) return true;
  if (extname(p)) return exists(join(dist, p));
  return data[p.endsWith('/') ? p : p + '/'] ? true : false;
}
for (const url of urls) {
  for (const l of data[url].links) {
    if (!l.href || /^(mailto:|tel:|javascript:)/.test(l.href)) continue;
    let target;
    try { target = new URL(l.href, origin + url); } catch { fail(url, `unparsable link ${l.href}`); continue; }
    if (target.origin !== origin) continue; // external: not followed here
    if (!l.hidden && !l.text && !l.label) fail(url, `link to ${l.href} has no text`); // aria-hidden duplicates (thumbnail links) are skipped
    if (BAD_TEXT.has(l.text)) fail(url, `link text "${l.text}" is not descriptive (${l.href})`);
    const path = target.pathname;
    if (!(await resolves(path))) {
      if (known.has(path)) pending.set(path, [...(pending.get(path) ?? []), url]);
      else fail(url, `broken internal link ${l.href}`);
      continue;
    }
    if (target.hash && target.hash.length > 1) {
      const dest = data[path] ?? data[path.endsWith('/') ? path : path + '/'];
      if (dest && !dest.ids.includes(decodeURIComponent(target.hash.slice(1)))) fail(url, `link ${l.href}: no element with id "${target.hash.slice(1)}" on ${path}`);
    }
  }
}
if (pending.size) {
  console.log(`pending (route exists in routes.ts, page not built yet): ${[...pending].map(([p, from]) => `${p} (${from.length} pages)`).join(', ')}`);
  if (strict) for (const [p, from] of pending) fail(from[0], `link to ${p}, whose page is not built (SEO_STRICT=1)`);
}

if (failures.length) console.error(`\nFAIL\n${failures.map((f) => `  - ${f}`).join('\n')}`);
console.log(`seo-check: ${urls.length} pages, ${failures.length} failures, ${pending.size} pending routes`);
process.exit(failures.length ? 1 : 0);
