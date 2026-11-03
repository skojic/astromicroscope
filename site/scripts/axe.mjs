// Runs axe-core (WCAG 2.2 A and AA rules) on every page in dist/, at phone and desktop width (specs/08).
// Needs a built dist/ and a Chromium: `npx playwright install chromium` (CI) or PW_CHANNEL=chrome to use installed Chrome.
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { serveDist } from './serve-dist.mjs';

const dist = fileURLToPath(new URL('../dist', import.meta.url));

async function pages(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await pages(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const urls = (await pages(dist)).map((f) => '/' + relative(dist, f).split(sep).join('/').replace(/index\.html$/, '')).filter((u) => !u.endsWith('.html') || u.endsWith('/404.html'));
const server = await serveDist(dist);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
let failures = 0;
for (const [name, viewport] of [['mobile', { width: 360, height: 800 }], ['desktop', { width: 1280, height: 900 }]]) {
  const context = await browser.newContext({ viewport });
  for (const url of urls) {
    const page = await context.newPage();
    await page.goto(base + url);
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    // Phone menu: open it, check focus handling, run axe again, close it with Escape (specs/08).
    const toggle = page.locator('.site-header .toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
      const focused = await page.evaluate(() => document.activeElement?.closest('[data-menu]') !== null);
      if (!focused || (await toggle.getAttribute('aria-expanded')) !== 'true') { failures += 1; console.error(`${name} ${url}: menu did not open or focus did not move into it`); }
      const open = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      violations.push(...open.violations);
      await page.keyboard.press('Escape');
      const back = await page.evaluate(() => document.activeElement?.classList.contains('toggle'));
      if (!back || (await toggle.getAttribute('aria-expanded')) !== 'false') { failures += 1; console.error(`${name} ${url}: Escape did not close the menu and return focus to the button`); }
    }
    for (const v of violations) {
      failures += 1;
      console.error(`${name} ${url}: ${v.id} (${v.impact}) ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`);
    }
    await page.close();
  }
  await context.close();
}
await browser.close();
server.close();
console.log(`axe: ${urls.length} pages x 2 viewports, ${failures} violations`);
process.exit(failures ? 1 : 0);
