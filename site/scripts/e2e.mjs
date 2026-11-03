// Browser checks on the built site (dist/) that unit tests cannot cover. Needs Chromium, like scripts/axe.mjs.
//  1. No request to YouTube or its image hosts before the visitor plays a video (specs/07, M11 acceptance).
//  2. Playing a video swaps in a youtube-nocookie iframe.
//  3. The language switch on a video page goes to the same video in the other language.
//  4. Every page has exactly one h1 and a skip link that lands on <main>.
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { serveDist } from './serve-dist.mjs';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const server = await serveDist(dist);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
const failures = [];
const check = (ok, message) => { if (!ok) { failures.push(message); console.error(`FAIL ${message}`); } };

async function pages(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await pages(p)));
    else if (e.name.endsWith('.html')) out.push('/' + relative(dist, p).split(sep).join('/').replace(/index\.html$/, ''));
  }
  return out;
}
const urls = await pages(dist);

// 1, 2, 3: first video page, if there is one
const video = urls.find((u) => /^\/video\/[^/]+\/$/.test(u));
if (video) {
  const page = await browser.newPage();
  const external = [];
  page.on('request', (r) => { if (!r.url().startsWith(base)) external.push(r.url()); });
  await page.goto(base + video, { waitUntil: 'networkidle' });
  check(external.length === 0, `${video}: requests to other hosts before click: ${external.join(', ')}`);
  await page.locator('[data-player] .facade').click();
  const src = await page.locator('[data-player] iframe').getAttribute('src');
  check(Boolean(src?.startsWith('https://www.youtube-nocookie.com/embed/')), `${video}: iframe src after click is ${src}`);
  await page.goto(base + video);
  await page.locator('.site-header ul[aria-label] a[hreflang="en"]').first().click();
  check(page.url() === base + video.replace('/video/', '/en/videos/'), `${video}: language switch went to ${page.url()}`);
  await page.close();
} else console.log('no video pages: checks 1-3 skipped');

// 4: headings and skip link
const page = await browser.newPage();
for (const url of urls) {
  await page.goto(base + url);
  const h1 = await page.locator('h1').count();
  check(h1 === 1, `${url}: ${h1} h1 elements`);
  await page.keyboard.press('Tab');
  const focusedSkip = await page.evaluate(() => document.activeElement?.classList.contains('skip'));
  check(focusedSkip, `${url}: first Tab does not reach the skip link`);
  await page.keyboard.press('Enter');
  const onMain = await page.evaluate(() => location.hash === '#main');
  check(onMain, `${url}: skip link does not go to #main`);
}
await browser.close();
server.close();
console.log(`e2e: ${urls.length} pages, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
