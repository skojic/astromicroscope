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

import { alternates, switchTarget, pathFor } from '../src/i18n/routes.ts';

test('route pairs and the language switch target', () => {
  assert.equal(pathFor('articles', 'en'), '/en/articles/');
  assert.deepEqual(alternates('about'), { sr: '/o-meni/', en: '/en/about/' });
  assert.equal(switchTarget('en', 'about'), '/en/about/');
  // a content page passes its own paths
  assert.equal(switchTarget('en', 'rising-sign', { sr: '/tekstovi/podznak/', en: '/en/articles/rising-sign/' }), '/en/articles/rising-sign/');
  // no pair yet: falls back to the home page of that language, and hreflang gets no entry
  assert.deepEqual(alternates('some-article', { sr: '/tekstovi/x/' }), { sr: '/tekstovi/x/' });
  assert.equal(switchTarget('en', 'some-article', { sr: '/tekstovi/x/' }), '/en/');
});
