// Smoke test of a deployed address (A1 after every deploy, A4 daily, G5 live smoke test).
//   node scripts/smoke.mjs [baseUrl] [--mode preview|production] [--retries 4]
// preview (default): the temporary address, every response is noindex and robots.txt disallows everything (D24, D36).
// production: indexable, robots.txt allows crawling and names the sitemap.
// A failing run is repeated (default 4 tries, 8 s apart) because a fresh deploy takes a moment to reach every edge.
import { fileURLToPath } from 'node:url';

export const DEFAULT_URL = 'https://astromicroscope.filipvicentijevic99.workers.dev';

/** Headers every page must send (specs/09 section 4, src/integrations/headers.mjs). */
export const REQUIRED_HEADERS = ['strict-transport-security', 'content-security-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy'];

export function evaluateRobots(text, mode) {
  if (mode === 'preview') return /^Disallow:\s*\/\s*$/m.test(text) ? null : 'robots.txt does not disallow everything on a preview';
  if (!/^Allow:\s*\/\s*$/m.test(text)) return 'robots.txt does not allow crawling';
  if (!/^Sitemap:\s*\S+/m.test(text)) return 'robots.txt has no Sitemap line';
  return null;
}

export function evaluateNoindex(header, mode) {
  const noindex = /noindex/i.test(header ?? '');
  if (mode === 'preview') return noindex ? null : 'no x-robots-tag: noindex on a preview';
  return noindex ? `x-robots-tag: noindex on production (${header})` : null;
}

/**
 * The build the address serves matches the address (D56): the Worker's x-astromicroscope-env header names the build the
 * assets were made for (the _headers file). A mismatched build answers every /api/* request with 404 build-not-production.
 * On a preview address a mismatch is a notice: a production build may sit there until the next deploy. On production it
 * is a failure, and the build is the wrong one: the preview build, which is noindex and has no MailerLite form.
 */
export function evaluateBuild(env, mode) {
  const build = env === 'production' ? 'production' : 'preview';
  if (build === mode) return null;
  return mode === 'preview' ? 'notice' : `the preview build is deployed as production (build environment ${build})`;
}

async function get(url) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'astromicroscope-smoke' }, signal: AbortSignal.timeout(15000) });
  return { status: res.status, headers: res.headers, text: await res.text() };
}

export async function runOnce(base, mode) {
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
    check('/ robots header', evaluateNoindex(home.headers.get('x-robots-tag'), mode));
    const build = evaluateBuild(home.headers.get('x-astromicroscope-env'), mode);
    if (build === 'notice') console.log('notice  / build environment differs from the preview address');
    else check('/ build environment', build);
    check('/ robots meta', mode === 'preview' ? (/<meta name="robots" content="noindex"/.test(home.text) ? null : 'no robots meta noindex') : (/<meta name="robots" content="[^"]*noindex/.test(home.text) ? 'robots meta noindex on production' : null));
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
  const robots = await page('/robots.txt', { status: 200 });
  if (robots) check('robots.txt content', evaluateRobots(robots.text, mode));
  const sitemap = await page('/sitemap.xml', { status: 200 });
  if (sitemap) check('sitemap.xml is a urlset', /<urlset/.test(sitemap.text) ? null : 'not a sitemap');
  return results;
}

export async function smoke(base, mode, retries = 4, delayMs = 8000) {
  let results;
  for (let attempt = 1; attempt <= retries; attempt++) {
    results = await runOnce(base, mode);
    if (results.every((r) => !r.problem)) return { results, attempt };
    if (attempt < retries) await new Promise((r) => setTimeout(r, delayMs));
  }
  return { results, attempt: retries };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback; };
  const base = (args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? process.env.SMOKE_URL ?? DEFAULT_URL).replace(/\/$/, '');
  const mode = opt('mode', 'preview');
  if (!['preview', 'production'].includes(mode)) throw new Error(`--mode must be preview or production, got ${mode}`);
  const { results, attempt } = await smoke(base, mode, Number(opt('retries', 4)));
  for (const r of results) console.log(`${r.problem ? 'FAIL' : ' ok '}  ${r.name}${r.problem ? `: ${r.problem}` : ''}`);
  const failed = results.filter((r) => r.problem);
  console.log(`smoke: ${base} (${mode}) ${results.length - failed.length}/${results.length} checks passed, attempt ${attempt}`);
  if (failed.length) process.exit(1);
}
