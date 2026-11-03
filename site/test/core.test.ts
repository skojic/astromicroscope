import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlLang, langFromPath, localizedPath, stripLang, otherLang, defineStrings, t } from '../src/i18n/core.ts';

test('language from path', () => {
  assert.equal(langFromPath('/'), 'sr');
  assert.equal(langFromPath('/tekstovi/podznak/'), 'sr');
  assert.equal(langFromPath('/en'), 'en');
  assert.equal(langFromPath('/en/'), 'en');
  assert.equal(langFromPath('/en/articles/rising-sign/'), 'en');
  assert.equal(langFromPath('/english/'), 'sr');
});

test('localized paths', () => {
  assert.equal(localizedPath('sr', '/'), '/');
  assert.equal(localizedPath('en', '/'), '/en/');
  assert.equal(localizedPath('en', '/kontakt/'), '/en/kontakt/');
  assert.equal(stripLang('/en/'), '/');
  assert.equal(stripLang('/en/x/'), '/x/');
  assert.equal(stripLang('/x/'), '/x/');
  assert.equal(otherLang('sr'), 'en');
});

test('html lang', () => {
  assert.equal(htmlLang('sr'), 'sr-Latn');
  assert.equal(htmlLang('en'), 'en');
});

test('strings: missing language fails', () => {
  assert.throws(() => defineStrings('x', { a: { sr: 'a' } } as never), /"a" has no "en" text/);
  assert.throws(() => defineStrings('x', { a: { sr: 'a', en: ' ' } }), /"a" has no "en" text/);
  const ok = defineStrings('x', { a: { sr: 'a', en: 'b' } });
  assert.equal(t(ok, 'a', 'en'), 'b');
});
