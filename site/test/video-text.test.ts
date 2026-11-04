import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanText, shortDescription, shortTitle, stripBoilerplate } from '../src/components/sections/videos/text.ts';

test('contact lines, separators, hashtags and the signature are not part of the summary', () => {
  const raw = 'Retrogradna Venera u Škorpiji.\n\n#venera#astrologija\n\nInstagram: astromicroscope\n\nMejl: a@b.rs\n\nGorica Vićentijević, diplomirani astrolog.';
  assert.equal(stripBoilerplate(raw), 'Retrogradna Venera u Škorpiji.');
});

test('a description that is only contact lines becomes empty', () => {
  assert.equal(cleanText('Instagram: astromicroscope\nSajt: astromicroscope.com\nMejl: astromicroscope@gmail.com'), '');
});

test('leading contact block and "///" are removed, the text stays', () => {
  const raw = 'Instagram: @astromicroscope\nSajt: astromicroscope.com\nMejl: astromicroscope@gmail.com \n///\nUran ulazi u znak Blizanaca.';
  assert.equal(cleanText(raw), 'Uran ulazi u znak Blizanaca.');
});

test('a sentence that only mentions Instagram or an email is kept', () => {
  const s = 'Možeš mi se javiti na Instagramu @astromicroscope ili na mejl astromicroscope@gmail.com';
  assert.equal(cleanText(s), s);
});

test('the meta description comes from the first real paragraph', () => {
  const d = cleanText('Instagram: x\n\nPrvi pasus je ovde.\n\nDrugi pasus.');
  assert.equal(shortDescription(d), 'Prvi pasus je ovde.');
});

test('shortDescription and shortTitle cut at a word boundary within the limit', () => {
  assert.ok(shortDescription('reč '.repeat(80)).length <= 155);
  const t = shortTitle('Saturn u Ovnu - Uticaj na sve znakove zodijaka | Astromicroscope', 41);
  assert.ok(t.length <= 41 && t.endsWith('…'));
});
