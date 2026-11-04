// Cross-browser layout check of the built site: the automated part of the visual review (G3, checklists/visual-review.md).
//   npm run build && npm run test:visual
// Every built page in Chromium (360, 768, 1024, 1440 px) and in Firefox and WebKit (360 and 1440 px). Fails on:
// horizontal overflow (and names the elements sticking out), more or fewer than one <h1>, console errors, page errors, and
// requests that fail or answer 4xx/5xx (CSP violations show up as console errors). SHOTS_DIR=folder also saves a screenshot
// of every view (the CI job uploads them as an artifact). It does not judge taste: a changed design is still a human call.
import { readdir, mkdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { serveDist } from './serve-dist.mjs';

const dist = process.env.VISUAL_DIST ?? fileURLToPath(new URL('../dist', import.meta.url));
const shots = process.env.SHOTS_DIR;
const only = process.env.VISUAL_BROWSERS?.split(',');
const PLAN = [
  ['chromium', chromium, [360, 768, 1024, 1440], process.env.PW_CHANNEL || undefined],
  ['firefox', firefox, [360, 1440]],
  ['webkit', webkit, [360, 1440]],
].filter(([name]) => !only || only.includes(name));

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
if (shots) await mkdir(shots, { recursive: true });

const failures = [];
let views = 0;
for (const [name, type, widths, channel] of PLAN) {
  const browser = await type.launch({ channel });
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    let problems = [];
    page.on('console', (m) => { if (m.type() === 'error') problems.push(`console error: ${m.text().slice(0, 160)}`); });
    page.on('pageerror', (e) => problems.push(`page error: ${String(e.message).slice(0, 160)}`));
    page.on('requestfailed', (r) => problems.push(`request failed: ${r.url().slice(0, 120)}`));
    page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) problems.push(`HTTP ${r.status()}: ${r.url().slice(0, 120)}`); });
    for (const url of urls) {
      problems = [];
      await page.goto(base + url, { waitUntil: 'networkidle' });
      const m = await page.evaluate(() => {
        const root = document.documentElement;
        const overflow = root.scrollWidth > root.clientWidth;
        const out = [];
        const clipped = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return true; return false; };
        if (overflow) for (const el of document.body.querySelectorAll('*')) { const r = el.getBoundingClientRect(); if (r.right > root.clientWidth + 1 && r.width > 0 && !clipped(el)) out.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''}`); if (out.length >= 3) break; }
        return { overflow, sw: root.scrollWidth, cw: root.clientWidth, h1: document.querySelectorAll('h1').length, out };
      });
      views++;
      const where = `${name} ${width}px ${url}`;
      if (m.overflow) failures.push(`${where}: horizontal overflow (${m.sw} > ${m.cw}) by ${m.out.join(', ') || 'unknown element'}`);
      if (m.h1 !== 1) failures.push(`${where}: ${m.h1} <h1> elements`);
      for (const p of new Set(problems)) failures.push(`${where}: ${p}`);
      if (shots) await page.screenshot({ path: join(shots, `${name}-${width}-${url.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home'}.png`) });
    }
    await ctx.close();
  }
  await browser.close();
}
server.close();
if (failures.length) { console.log(failures.slice(0, 40).map((f) => `  - ${f}`).join('\n')); if (failures.length > 40) console.log(`  ... and ${failures.length - 40} more`); }
console.log(`visual: ${urls.length} pages, ${views} views (${PLAN.map(([n, , w]) => `${n} x${w.length}`).join(', ')}), ${failures.length} failure(s)`);
if (failures.length) process.exit(1);
