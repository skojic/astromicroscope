// Smoke test of a deployed address (A1 after every deploy, A4 daily, G5 live smoke test).
//   node scripts/smoke.mjs [baseUrl] [--retries 4]
// The address is production (D60: every merge to main deploys there, there is no other stage): indexable, robots.txt
// allows crawling and names the sitemap, and the build is the production build. A local build (noindex, robots.txt
// disallows everything, D24) deployed by mistake fails this check.
// A failing run is repeated (default 4 tries, 8 s apart) because a fresh deploy takes a moment to reach every edge.
import { fileURLToPath } from 'node:url';

// The site's only address since D60: every merge to main deploys there.
export const DEFAULT_URL = 'https://astromicroscope.com';

/** Headers every page must send (specs/09 section 4, src/integrations/headers.mjs). */
export const REQUIRED_HEADERS = ['strict-transport-security', 'content-security-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy'];

export function evaluateRobots(text) {
  if (!/^Allow:\s*\/\s*$/m.test(text)) return 'robots.txt does not allow crawling';
  if (!/^Sitemap:\s*\S+/m.test(text)) return 'robots.txt has no Sitemap line';
  return null;
}

export function evaluateNoindex(header) {
  return /noindex/i.test(header ?? '') ? `x-robots-tag: noindex on production (${header})` : null;
}

/**
 * The address serves the production build (D56): the x-astromicroscope-env header names the build the address was built
 * for. The _headers file sets it on the page; the Worker sends it on its API responses. A Worker build that does not match
 * its environment answers every /api/* request with 404 build-not-production. Anything but `production` (a local build,
 * or no header at all) is a failure: that build is noindex and has no MailerLite form.
 */
export function evaluateBuild(env) {
  return env === 'production' ? null : `a non-production build is deployed (build environment ${env ?? 'none'})`;
}

async function get(url) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'astromicroscope-smoke' }, signal: AbortSignal.timeout(15000) });
  return { status: res.status, headers: res.headers, text: await res.text() };
}

export async function runOnce(base) {
  const results = [];
  const check = (name, problem) => results.push({ name, problem: problem ?? null });
  const page = async (path, expect) => {
    let r;
    try { r = await get(base + path); } catch (e) { check(`${path} reachable`, String(e.message ?? e)); return null; }
    check(`${path} status ${expect.status}`, r.status === expect.status ? null : `got ${r.status}`);
    if (expect.lang) check(`${path} <html lang="${expect.lang}">`, r.text.includes(`<html lang="${expect.lang}"`) ? null : 'lang attribute differs');
    if (expect.title) check(`${path} title contains "${expect.title}"`, new RegExp(`<title>[^<]*${expect.title}`, 'i').test(r.text) ? null : 'title differs');
    return r;
  };

  const home = await page('/', { status: 200, lang: 'sr-Latn' });
  if (home) {
    for (const h of REQUIRED_HEADERS) check(`/ sends ${h}`, home.headers.get(h) ? null : 'missing');
    check('/ sends x-content-type-options: nosniff', /nosniff/i.test(home.headers.get('x-content-type-options') ?? '') ? null : 'not nosniff');
    check('/ csp has frame-ancestors', /frame-ancestors/.test(home.headers.get('content-security-policy') ?? '') ? null : 'missing frame-ancestors');
    check('/ robots header', evaluateNoindex(home.headers.get('x-robots-tag')));
    check('/ build environment', evaluateBuild(home.headers.get('x-astromicroscope-env')));
    check('/ robots meta', /<meta name="robots" content="[^"]*noindex/.test(home.text) ? 'robots meta noindex on production' : null);
  }
  await page('/en/', { status: 200, lang: 'en' });
  await page('/video/', { status: 200, lang: 'sr-Latn' });
  await page('/en/videos/', { status: 200, lang: 'en' });
  await page('/smoke-nepostoji/', { status: 404, lang: 'sr-Latn', title: 'pronađena' });
  await page('/en/smoke-nepostoji/', { status: 404, lang: 'en', title: 'Page not found' });
  try {
    const r = await get(`${base}/en`);
    const loc = r.headers.get('location') ?? '';
    check('/en redirects to /en/', [301, 302, 307, 308].includes(r.status) && /\/en\/$/.test(loc) ? null : `got ${r.status} ${loc}`);
  } catch (e) { check('/en redirects to /en/', String(e.message ?? e)); }
  // P07 (D59): one of the 143 spam URLs of the old hacked site answers 410 Gone (it was 404 before, which is only a
  // softer removal). The first URL of the list in the repository keeps this check honest without copying the list.
  try {
    const r = await get(`${base}/casinia-casino-quickhit-slots-rapid-wins-and-insta/`);
    check('a spam URL answers 410 Gone', r.status === 410 ? null : `got ${r.status} (the Worker should answer 410, P07/D59)`);
  } catch (e) { check('a spam URL answers 410 Gone', String(e.message ?? e)); }
  const robots = await page('/robots.txt', { status: 200 });
  if (robots) check('robots.txt content', evaluateRobots(robots.text));
  const sitemap = await page('/sitemap.xml', { status: 200 });
  if (sitemap) check('sitemap.xml is a urlset', /<urlset/.test(sitemap.text) ? null : 'not a sitemap');
  return results;
}

export async function smoke(base, retries = 4, delayMs = 8000) {
  let results;
  for (let attempt = 1; attempt <= retries; attempt++) {
    results = await runOnce(base);
    if (results.every((r) => !r.problem)) return { results, attempt };
    if (attempt < retries) await new Promise((r) => setTimeout(r, delayMs));
  }
  return { results, attempt: retries };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback; };
  const base = (args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? process.env.SMOKE_URL ?? DEFAULT_URL).replace(/\/$/, '');
  const { results, attempt } = await smoke(base, Number(opt('retries', 4)));
  for (const r of results) console.log(`${r.problem ? 'FAIL' : ' ok '}  ${r.name}${r.problem ? `: ${r.problem}` : ''}`);
  const failed = results.filter((r) => r.problem);
  console.log(`smoke: ${base} ${results.length - failed.length}/${results.length} checks passed, attempt ${attempt}`);
  if (failed.length) process.exit(1);
}
