import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pageEntry, buildSitemap, buildRobots } from '../src/integrations/seo-files.mjs';
import { breadcrumbList, article, organization } from '../src/components/seo/jsonld.ts';

const page = (extra = '') => `<html><head><link rel="canonical" href="https://astromicroscope.com/en/"><link rel="alternate" hreflang="sr" href="https://astromicroscope.com/"><link rel="alternate" hreflang="en" href="https://astromicroscope.com/en/">${extra}</head></html>`;

test('page entry reads canonical and alternates', () => {
  const e = pageEntry(page());
  assert.equal(e?.canonical, 'https://astromicroscope.com/en/');
  assert.deepEqual(e?.alternates.map((a) => a.hreflang), ['sr', 'en']);
});

test('404 and noindex pages stay out of the sitemap', () => {
  assert.equal(pageEntry(page(), '/dist/404.html'), null);
  assert.equal(pageEntry(page('<meta name="robots" content="noindex" data-page-noindex>')), null);
  assert.equal(pageEntry('<html></html>'), null);
});

test('sitemap lists alternates; robots differs by environment', () => {
  const xml = buildSitemap([pageEntry(page())!]);
  assert.match(xml, /<loc>https:\/\/astromicroscope.com\/en\/<\/loc>/);
  assert.match(xml, /hreflang="sr"/);
  assert.match(buildRobots({ isProduction: true, site: 'https://astromicroscope.com' }), /Sitemap: https:\/\/astromicroscope.com\/sitemap.xml/);
  assert.match(buildRobots({ isProduction: false, site: 'x' }), /Disallow: \//);
});

test('json-ld builders', () => {
  const crumbs = breadcrumbList([{ name: 'Tekstovi', url: '/tekstovi/' }, { name: 'Podznak', url: '/tekstovi/podznak/' }]) as any;
  assert.equal(crumbs.itemListElement[1].position, 2);
  assert.equal(crumbs.itemListElement[1].item, 'https://astromicroscope.com/tekstovi/podznak/');
  const a = article({ headline: 'H', url: '/tekstovi/x/', published: '2026-01-02', lang: 'sr' }) as any;
  assert.equal(a.dateModified, '2026-01-02');
  assert.equal(a.inLanguage, 'sr-Latn');
  assert.equal((organization() as any).logo, 'https://astromicroscope.com/icon-512.png');
});
