import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
// @ts-expect-error plain .mjs without types
import { checkContent } from '../scripts/check-content.mjs';

async function site(files: Record<string, string>) {
  const root = await mkdtemp(join(tmpdir(), 'am-'));
  for (const [path, text] of Object.entries(files)) {
    await mkdir(join(root, path, '..'), { recursive: true });
    await writeFile(join(root, path), text);
  }
  return root;
}
const md = (lang: string, key: string, extra = '') => `---\nlang: ${lang}\ntranslationKey: ${key}\nephemerisChecked: true\n${extra}---\nText\n`;

test('a complete pair passes', async () => {
  const root = await site({ 'src/content/pages/sr/a.md': md('sr', 'a'), 'src/content/pages/en/a.md': md('en', 'a') });
  assert.deepEqual(await checkContent({ root, production: true }), []);
});

test('missing English pair fails', async () => {
  const root = await site({ 'src/content/pages/sr/a.md': md('sr', 'a') });
  const problems = await checkContent({ root, production: false });
  assert.equal(problems.length, 1);
  assert.match(problems[0], /no en file with translationKey "a"/);
});

test('wrong lang folder fails', async () => {
  const root = await site({ 'src/content/pages/sr/a.md': md('en', 'a') });
  assert.match((await checkContent({ root, production: false }))[0], /lang is "en"/);
});

test('missing interface translation fails', async () => {
  const root = await site({ 'src/i18n/x.json': JSON.stringify({ k: { sr: 'a' } }) });
  assert.match((await checkContent({ root, production: false }))[0], /"k" has no "en" text/);
});

test('placeholders fail only in production; markdown links are fine', async () => {
  const root = await site({
    'src/content/pages/sr/a.md': md('sr', 'a').replace('Text', 'Cena: [cena] i [link](https://x.rs)'),
    'src/content/pages/en/a.md': md('en', 'a'),
  });
  assert.deepEqual(await checkContent({ root, production: false }), []);
  const prod = await checkContent({ root, production: true });
  assert.equal(prod.length, 1);
  assert.match(prod[0], /placeholder/);
});

test('ephemerisChecked false fails in production', async () => {
  const root = await site({
    'src/content/pages/sr/a.md': md('sr', 'a').replace('ephemerisChecked: true', 'ephemerisChecked: false'),
    'src/content/pages/en/a.md': md('en', 'a'),
  });
  assert.match((await checkContent({ root, production: true }))[0], /ephemerisChecked/);
});

test('a draft without its pair passes outside production and fails in production', async () => {
  const root = await site({ 'src/content/articles/sr/a.md': md('sr', 'a', 'draft: true\n') });
  assert.deepEqual(await checkContent({ root, production: false }), []);
  const prod = await checkContent({ root, production: true });
  assert.ok(prod.some((p) => /draft is true/.test(p)));
  assert.ok(prod.some((p) => /no en file/.test(p)));
});

test('a published file without its pair still fails outside production', async () => {
  const root = await site({ 'src/content/articles/sr/a.md': md('sr', 'a', 'draft: false\n') });
  assert.match((await checkContent({ root, production: false }))[0], /no en file/);
});

test('YAML list values in front matter are not placeholders', async () => {
  const extra = 'topics: ["finances"]\nother: [children, karmic]\n';
  const root = await site({
    'src/content/articles/sr/a.md': md('sr', 'a', extra),
    'src/content/articles/en/a.md': md('en', 'a', extra),
  });
  assert.deepEqual(await checkContent({ root, production: true }), []);
});

test('a placeholder inside a front matter string still fails in production', async () => {
  const root = await site({
    'src/content/articles/sr/a.md': md('sr', 'a', 'answer: "Cena je [cena]."\n'),
    'src/content/articles/en/a.md': md('en', 'a'),
  });
  const prod = await checkContent({ root, production: true });
  assert.equal(prod.length, 1);
  assert.match(prod[0], /placeholder/);
});
