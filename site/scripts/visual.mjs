// The one browser check of the site (D56): what replaced the separate axe, e2e and cross-browser checks.
//   npm run build && npm run test:visual
// Every built page in Chromium, at 360 and 1440 px (a phone and a desktop). Fails on:
//   - horizontal overflow (and names the elements sticking out);
//   - more or fewer than one <h1>, or a first Tab that does not reach the skip link, or the skip link not reaching #main;
//   - console errors, page errors and requests that fail or answer 4xx/5xx (CSP violations show up as console errors);
//   - accessibility: axe-core (WCAG 2.2 A and AA) on the page, and on the phone menu open (focus moved into it, Escape
//     closes it and returns focus to the button);
//   - a request to another host before a visitor plays a video (the facade must not load YouTube), and playing a video
//     swapping in a youtube-nocookie iframe;
//   - the language switch on a video page going to the same video in the other language;
//   - the zodiac wheel lens (M07-05): choosing a sign shows its opening paragraph, arrow keys move the lens, and without
//     JavaScript the wheel is a list of 12 links.
// SHOTS_DIR=folder also saves a screenshot of every page. It does not judge taste: a changed design is still a human call.
// The browser checks the local site: the page origin and the localhost:4173 origin, so no request goes to another host.
import { readdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { serveDist } from './serve-dist.mjs';

const require = createRequire(import.meta.url);
// axe-core's own script, not @axe-core/playwright: the page's CSP forbids inline scripts, so this is injected with
// bypassCSP, and one injection is cheaper than the Playwright wrapper's evaluation per call.
const AXE_SRC = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const AXE_RUN = `window.axe.run(document, { runOnly: { type: 'tag', values: ${JSON.stringify(AXE_TAGS)} } })`;

const dist = process.env.VISUAL_DIST ?? fileURLToPath(new URL('../dist', import.meta.url));
const shots = process.env.SHOTS_DIR;
const VIEWPORTS = [[360, 800], [1440, 900]];

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const urls = (await htmlFiles(dist)).map((f) => '/' + relative(dist, f).split(sep).join('/').replace(/index\.html$/, '')).sort();
const server = await serveDist(dist);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });

const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);
const views = [];

for (const [width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width, height }, bypassCSP: true });
  const page = await ctx.newPage();
  let problems = [];
  // "Failed to load resource" console noise is already reported by the response handler (with the URL), so skip it here.
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) problems.push(`console error: ${m.text().slice(0, 160)}`); });
  page.on('pageerror', (e) => problems.push(`page error: ${String(e.message).slice(0, 160)}`));
  page.on('requestfailed', (r) => problems.push(`request failed: ${r.url().slice(0, 120)}`));
  // /api/* lives on the deployed Worker, not in the static dist/ this check serves: a 404 there is expected.
  const isApi = (u) => /\/api\//.test(u);
  page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico') && !isApi(r.url())) problems.push(`HTTP ${r.status()}: ${r.url().slice(0, 120)}`); });
  const own = (u) => u.startsWith(base) || u.startsWith('http://localhost:');
  const external = [];
  page.on('request', (r) => { if (!own(r.url())) external.push(r.url()); });

  for (const url of urls) {
    problems = [];
    external.length = 0;
    const where = `${width}px ${url}`;
    // 'load' rather than 'networkidle': the served pages are complete at load and nothing runs after it, so waiting for
    // 500 ms of network quiet costs ~0.5 s per page for no extra evidence (D56).
    await page.goto(base + url, { waitUntil: 'load' });

    const m = await page.evaluate(() => {
      const root = document.documentElement;
      const overflow = root.scrollWidth > root.clientWidth;
      const out = [];
      const clipped = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return true; return false; };
      if (overflow) for (const el of document.body.querySelectorAll('*')) { const r = el.getBoundingClientRect(); if (r.right > root.clientWidth + 1 && r.width > 0 && !clipped(el)) out.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''}`); if (out.length >= 3) break; }
      return { overflow, sw: root.scrollWidth, cw: root.clientWidth, h1: document.querySelectorAll('h1').length, out };
    });
    if (m.overflow) fail(where, `horizontal overflow (${m.sw} > ${m.cw}) by ${m.out.join(', ') || 'unknown element'}`);
    if (m.h1 !== 1) fail(where, `${m.h1} <h1> elements`);

    // Skip link: the first Tab reaches it and Enter goes to #main.
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => document.activeElement?.classList.contains('skip'));
    if (!skip) fail(where, 'first Tab does not reach the skip link');
    else {
      await page.keyboard.press('Enter');
      const onMain = await page.evaluate(() => location.hash === '#main');
      if (!onMain) fail(where, 'skip link does not go to #main');
      await page.goto(base + url); // Enter moved to the anchor; go back to the page as it was
    }

    // Accessibility: axe on the page, then on the phone menu open.
    await page.evaluate(AXE_SRC);
    let violations = (await page.evaluate(AXE_RUN)).violations;
    const toggle = page.locator('.site-header .toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
      const focused = await page.evaluate(() => document.activeElement?.closest('[data-menu]') !== null);
      if (!focused || (await toggle.getAttribute('aria-expanded')) !== 'true') fail(where, 'phone menu did not open or focus did not move into it');
      violations = violations.concat((await page.evaluate(AXE_RUN)).violations);
      await page.keyboard.press('Escape');
      const back = await page.evaluate(() => document.activeElement?.classList.contains('toggle'));
      if (!back || (await toggle.getAttribute('aria-expanded')) !== 'false') fail(where, 'Escape did not close the menu and return focus to the button');
    }
    for (const v of violations) fail(where, `axe ${v.id} (${v.impact}) ${v.help} ${v.nodes.map((n) => n.target.join(' ')).join(' ')}`);

    for (const p of new Set(problems)) fail(where, p);
    if (external.length) fail(where, `requests to another host on load: ${external.slice(0, 3).join(', ')}`);
    views.push(where);
    if (shots) await page.screenshot({ path: join(shots, `${width}-${url.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home'}.png`) });
  }
  await ctx.close();
}

// Video facade: the player, the language switch and the privacy of the embed (specs/07, M11 acceptance).
const video = urls.find((u) => /^\/video\/[^/]+\/$/.test(u));
if (video) {
  const page = await browser.newPage();
  const external = [];
  page.on('request', (r) => { if (!r.url().startsWith(base)) external.push(r.url()); });
  await page.goto(base + video, { waitUntil: 'load' });
  if (external.length) fail(`video ${video}`, `requests to other hosts before click: ${external.join(', ')}`);
  await page.locator('[data-player] .facade').click();
  const src = await page.locator('[data-player] iframe').getAttribute('src');
  if (!src?.startsWith('https://www.youtube-nocookie.com/embed/')) fail(`video ${video}`, `iframe src after click is ${src}`);
  await page.goto(base + video);
  await page.locator('.site-header ul[aria-label] a[hreflang="en"]').first().click();
  if (page.url() !== base + video.replace('/video/', '/en/videos/')) fail(`video ${video}`, `language switch went to ${page.url()}`);
  await page.close();
} else console.log('no video pages: the facade checks are skipped');

// Zodiac wheel lens (M07-05).
const hub = await browser.newPage();
for (const h of ['/horoskop/', '/en/horoscope/']) {
  if (!urls.includes(h)) continue;
  await hub.goto(base + h);
  const panel = hub.locator('[data-lens-panel]');
  if (await panel.isVisible()) fail(h, 'lens is visible before a sign is chosen');
  // The signs are links: stop the navigation so the lens can be observed on the hub itself.
  await hub.evaluate(() => document.querySelectorAll('.sign').forEach((a) => a.addEventListener('click', (e) => e.preventDefault())));
  const first = hub.locator('.sign').first();
  await first.click();
  if (!(await panel.isVisible())) fail(h, 'lens did not open after choosing a sign');
  const text = (await hub.locator('[data-lens-text]').textContent())?.trim() ?? '';
  if (text.length <= 40) fail(h, `lens text is too short (${text.length} chars)`);
  if ((await first.getAttribute('aria-current')) !== 'true') fail(h, 'chosen sign is not marked aria-current');
  await hub.keyboard.press('ArrowRight');
  if ((await hub.locator('.sign').nth(1).getAttribute('aria-current')) !== 'true') fail(h, 'ArrowRight did not move the lens to the next sign');
  const noJs = await browser.newPage({ javaScriptEnabled: false });
  await noJs.goto(base + h);
  if ((await noJs.locator('.sign').count()) !== 12) fail(h, 'without JS the wheel is not 12 links');
  await noJs.close();
}
await hub.close();
await browser.close();
server.close();

if (failures.length) console.log(failures.slice(0, 40).map((f) => `  - ${f}`).join('\n'));
if (failures.length > 40) console.log(`  ... and ${failures.length - 40} more`);
console.log(`visual: ${urls.length} pages, ${views.length} views (${VIEWPORTS.map(([w]) => `${w}px`).join(', ')}), axe ${AXE_TAGS.length} tags, video facade and lens, ${failures.length} failure(s)`);
if (failures.length) process.exit(1);
