// Weekly check of the external links in the built site (A4). Run after `npm run build`: node scripts/check-external-links.mjs
// A dead link (404, 410, DNS failure) fails; sites that refuse bots (401, 403, 405, 429, 999) or time out only warn.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function externalLinks(html, ownHosts = ['astromicroscope.com', 'www.astromicroscope.com']) {
  const out = new Set();
  for (const m of html.matchAll(/<a\s[^>]*?href="(https?:\/\/[^"]+)"/gi)) {
    const url = m[1].replaceAll('&amp;', '&').split('#')[0];
    try { if (!ownHosts.includes(new URL(url).hostname) && !new URL(url).hostname.endsWith('.workers.dev')) out.add(url); } catch { /* not a URL */ }
  }
  return [...out];
}

export function classify(status) {
  if (status >= 200 && status < 400) return 'ok';
  if ([401, 403, 405, 429, 999].includes(status) || status >= 500) return 'warn';
  return 'fail';
}

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

async function status(url) {
  const opts = { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (compatible; astromicroscope-link-check)' }, signal: AbortSignal.timeout(15000) };
  let res = await fetch(url, { ...opts, method: 'HEAD' });
  if ([400, 403, 405, 501].includes(res.status)) res = await fetch(url, { ...opts, method: 'GET' });
  return res.status;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = fileURLToPath(new URL('../dist', import.meta.url));
  const links = new Map(); // url -> pages
  for (const f of await htmlFiles(dist)) for (const u of externalLinks(await readFile(f, 'utf8'))) links.set(u, [...(links.get(u) ?? []), f.slice(dist.length)]);
  const failures = [], warnings = [];
  const queue = [...links.keys()];
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      try {
        const s = await status(url);
        const c = classify(s);
        if (c === 'fail') failures.push(`${url}: HTTP ${s} (on ${links.get(url)[0]})`);
        else if (c === 'warn') warnings.push(`${url}: HTTP ${s}`);
      } catch (e) {
        const dns = /ENOTFOUND|getaddrinfo/i.test(String(e.cause?.code ?? e.cause ?? e.message));
        (dns ? failures : warnings).push(`${url}: ${dns ? 'host not found' : (e.name === 'TimeoutError' ? 'timeout' : e.message)}`);
      }
    }
  }));
  for (const w of warnings) console.log(`warn  ${w}`);
  for (const f of failures) console.log(`FAIL  ${f}`);
  console.log(`check-external-links: ${links.size} external link(s), ${failures.length} dead, ${warnings.length} warning(s)`);
  if (failures.length) process.exit(1);
}
