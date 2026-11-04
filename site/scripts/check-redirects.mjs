// Launch check M13-02: the redirects file and the 410 for the spam URLs of the old site, against a deployed address.
//   node scripts/check-redirects.mjs <baseUrl> [--redirects public/_redirects] [--spam ../docs/sadrzaj/stari-sajt/spam-adrese.md] [--gone]
// Redirects use the Cloudflare `_redirects` format (contracts.md: "redirects file"): `/old /new 301` per line.
// Rules with wildcards or placeholders are listed as skipped. Without a redirects file the check says so and passes
// (the file comes with M02-01 and M13-02). --gone also requires every URL of the spam list to answer 410.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export function parseRedirects(text) {
  const rules = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const [from, to, code] = line.split(/\s+/);
    if (!from || !to) continue;
    rules.push({ from, to, status: Number(code ?? 302), dynamic: /[*:]/.test(from) || /[*:]/.test(to.replace(/^https?:\/\/[^/]+/, '')) });
  }
  return rules;
}

export function parseSpamUrls(md) {
  return [...md.matchAll(/^(https?:\/\/[^\s]+)$/gm)].map((m) => new URL(m[1]).pathname);
}

const get = (url) => fetch(url, { redirect: 'manual', headers: { 'user-agent': 'astromicroscope-redirect-check' }, signal: AbortSignal.timeout(15000) });

export async function checkRedirects(base, rules) {
  const failures = [];
  let checked = 0, skipped = 0;
  for (const r of rules) {
    if (r.dynamic || ![301, 302, 303, 307, 308].includes(r.status)) { skipped++; continue; }
    checked++;
    try {
      const res = await get(base + r.from);
      const loc = res.headers.get('location');
      const target = loc ? new URL(loc, base).pathname : null;
      const want = new URL(r.to, base).pathname;
      if (res.status !== r.status) failures.push(`${r.from}: status ${res.status}, wanted ${r.status}`);
      else if (target !== want) failures.push(`${r.from}: goes to ${target}, wanted ${want}`);
    } catch (e) { failures.push(`${r.from}: ${e.message}`); }
  }
  return { failures, checked, skipped };
}

export async function checkGone(base, paths) {
  const failures = [];
  const queue = [...paths];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const p = queue.shift();
      try { const res = await get(base + p); if (res.status !== 410) failures.push(`${p}: status ${res.status}, wanted 410`); }
      catch (e) { failures.push(`${p}: ${e.message}`); }
    }
  }));
  return failures;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const base = args.find((a) => /^https?:/.test(a))?.replace(/\/$/, '');
  if (!base) throw new Error('usage: node scripts/check-redirects.mjs <baseUrl> [--redirects file] [--spam file] [--gone]');
  const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
  const redirectsFile = new URL(opt('redirects', 'public/_redirects'), `file://${process.cwd()}/`);
  const spamFile = new URL(opt('spam', '../docs/sadrzaj/stari-sajt/spam-adrese.md'), `file://${process.cwd()}/`);
  let failures = [];
  const text = await readFile(redirectsFile, 'utf8').catch(() => null);
  if (text === null) console.log(`redirects: no file at ${fileURLToPath(redirectsFile)} yet (M02-01, M13-02): nothing to check`);
  else {
    const r = await checkRedirects(base, parseRedirects(text));
    failures.push(...r.failures);
    console.log(`redirects: ${r.checked} checked, ${r.skipped} skipped (wildcards or not a redirect), ${r.failures.length} failure(s)`);
  }
  if (args.includes('--gone')) {
    const paths = parseSpamUrls(await readFile(spamFile, 'utf8'));
    const g = await checkGone(base, paths);
    failures.push(...g);
    console.log(`410: ${paths.length} spam URL(s) checked, ${g.length} failure(s)`);
  }
  for (const f of failures.slice(0, 30)) console.log(`FAIL  ${f}`);
  if (failures.length > 30) console.log(`... and ${failures.length - 30} more`);
  if (failures.length) process.exit(1);
}
