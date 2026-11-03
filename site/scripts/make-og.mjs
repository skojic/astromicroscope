// Renders the default social card (1200x630) for each language into public/og/ (M04-03).
// Run when the wording or the brand changes:  PW_CHANNEL=chrome node scripts/make-og.mjs   (or after `npx playwright install chromium`)
import { writeFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const styles = fileURLToPath(new URL('../src/styles/', import.meta.url));
const markFile = fileURLToPath(new URL('../src/assets/logo/mark-white.svg', import.meta.url));
const cards = {
  sr: { line: 'Astrologija u službi evolucije svesti.', sub: 'Gorica Vićentijević, profesionalni astrolog' },
  en: { line: 'Astrology in service of the evolution of consciousness.', sub: 'Gorica Vićentijević, professional astrologer' },
};

const html = ({ line, sub }) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="file://${styles}fonts.css"><link rel="stylesheet" href="file://${styles}tokens.css">
<style>
  *{box-sizing:border-box;margin:0} html,body{width:1200px;height:630px}
  body{background:var(--am-sky);color:var(--am-sky-text);font-family:var(--am-font-sans);padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:20px} .brand img{width:58px;height:72px}
  .name{font:500 40px/1.1 var(--am-font-serif)} 
  h1{font:700 76px/1.02 var(--am-font-sans);letter-spacing:-.04em;max-width:960px}
  .rule{width:96px;height:3px;background:var(--am-gold-foil);margin:28px 0 22px}
  .sub{font:400 30px/1.3 var(--am-font-serif);color:var(--am-sky-text)}
</style></head><body>
  <div class="brand"><img src="file://${markFile}" alt=""><span class="name">Astromicroscope</span></div>
  <div><h1>${line}</h1><div class="rule"></div><p class="sub">${sub}</p></div>
</body></html>`;

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const tmp = await mkdtemp(join(tmpdir(), 'am-og-'));
for (const [lang, card] of Object.entries(cards)) {
  // A real file, not setContent: pages on about:blank may not load file:// styles and images.
  const file = join(tmp, `${lang}.html`);
  await writeFile(file, html(card));
  await page.goto(`file://${file}`);
  await page.evaluate(() => document.fonts.ready);
  const out = fileURLToPath(new URL(`../public/og/default-${lang}.png`, import.meta.url));
  await writeFile(out, await page.screenshot({ type: 'png' }));
  console.log(`wrote public/og/default-${lang}.png`);
}
await browser.close();
