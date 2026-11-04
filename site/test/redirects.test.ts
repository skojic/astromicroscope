import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseRedirects, parseSpamUrls } from '../scripts/check-redirects.mjs';
import { externalLinks, classify } from '../scripts/check-external-links.mjs';
import { extractLinks, internalPath, readHead } from '../scripts/crawl.mjs';
import { evaluateRobots, evaluateNoindex } from '../scripts/smoke.mjs';

test('_redirects: rules, default status, comments, wildcards are marked dynamic', () => {
  const rules = parseRedirects('# old pages\n/stara /nova/ 301\n\n/blog/* /tekstovi/:splat 301\n/a https://astromicroscope.com/b/\n');
  assert.deepEqual(rules.map((r) => [r.from, r.to, r.status, r.dynamic]), [['/stara', '/nova/', 301, false], ['/blog/*', '/tekstovi/:splat', 301, true], ['/a', 'https://astromicroscope.com/b/', 302, false]]);
});

test('the spam list of the old site gives 143 paths, all slugs between slashes', async () => {
  const md = await readFile(new URL('../../docs/sadrzaj/stari-sajt/spam-adrese.md', import.meta.url), 'utf8');
  const paths = parseSpamUrls(md);
  assert.equal(paths.length, 143);
  assert.ok(paths.every((p) => /^\/[^/]+\/$/.test(p)), 'every path is /slug/');
  assert.equal(new Set(paths).size, paths.length, 'no duplicates');
});

test('external links: own hosts and workers.dev are not external; hash is cut; duplicates are merged', () => {
  const html = '<a href="https://www.instagram.com/astromicroscope/">i</a><a href="https://astromicroscope.com/x">own</a><a href="https://x.workers.dev/">w</a><a href="https://www.instagram.com/astromicroscope/#a">i2</a><a href="/local/">l</a>';
  assert.deepEqual(externalLinks(html), ['https://www.instagram.com/astromicroscope/']);
});

test('link status classes: dead links fail, bot-blocking sites only warn', () => {
  assert.deepEqual([200, 301, 404, 410, 403, 429, 999, 503].map(classify), ['ok', 'ok', 'fail', 'fail', 'warn', 'warn', 'warn', 'warn']);
});

test('crawler: internal paths only, assets and other hosts skipped, relative links resolved', () => {
  const base = 'https://x.workers.dev';
  assert.equal(internalPath('/video/', base), '/video/');
  assert.equal(internalPath('https://x.workers.dev/en/#top', base), '/en/');
  assert.equal(internalPath('../en/', base, '/video/a/'), '/video/en/');
  assert.equal(internalPath('https://youtube.com/watch', base), null);
  assert.equal(internalPath('/_astro/a.css', base), null);
  assert.equal(internalPath('mailto:a@b.rs', base), null);
  assert.equal(internalPath('#main', base), null);
  assert.deepEqual(extractLinks('<a class="x" href="/a/">a</a><a href="/b/?q=1&amp;r=2">b</a>'), ['/a/', '/b/?q=1&r=2']);
  const h = readHead('<html lang="en"><title>T</title><meta name="description" content="D"><link rel="canonical" href="https://a/b/"><link rel="alternate" hreflang="sr" href="https://a/"><link rel="alternate" hreflang="en" href="https://a/en/">');
  assert.deepEqual([h.lang, h.title, h.description, h.canonical, h.hreflang.en], ['en', 'T', 'D', 'https://a/b/', 'https://a/en/']);
});

test('smoke expectations: preview must disallow and be noindex, production the opposite', () => {
  assert.equal(evaluateRobots('User-agent: *\nDisallow: /\n', 'preview'), null);
  assert.ok(evaluateRobots('User-agent: *\nAllow: /\nSitemap: https://a/sitemap.xml\n', 'preview'));
  assert.equal(evaluateRobots('User-agent: *\nAllow: /\nSitemap: https://a/sitemap.xml\n', 'production'), null);
  assert.ok(evaluateRobots('User-agent: *\nAllow: /\n', 'production'));
  assert.equal(evaluateNoindex('noindex', 'preview'), null);
  assert.ok(evaluateNoindex(null, 'preview'));
  assert.ok(evaluateNoindex('noindex', 'production'));
  assert.equal(evaluateNoindex(null, 'production'), null);
});
