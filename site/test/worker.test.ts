// The Worker's environment guard (D56): the smoke test in the deploy job is a regression test, so it must be impossible
// to pass while a preview build is deployed as production. It really did pass on 2026-11-07: the preview build was
// uploaded to astromicroscope.com and the smoke test reported 28/28, while the production site sent noindex and
// `Disallow: /` in robots.txt. The Worker's own environment is the header the smoke test checks (x-astromicroscope-env);
// a Worker whose build does not match its environment refuses every /api/* request with 404.
import { test } from 'node:test';
import assert from 'node:assert/strict';
// The Worker imports its generated module, written by the build (P07, D59): build first or the import fails with a
// module-not-found that says so.
import { requireGenerated } from './generated-worker.mjs';
requireGenerated();
// @ts-expect-error plain TypeScript worker, no types here
import worker from '../src/worker/index.ts';
import { evaluateBuild } from '../scripts/smoke.mjs';

const TOKEN = 'https://astromicroscope.com/api/form-token';
const env = (value: string) => ({ SITE_ENV: value });

test('worker: a preview build answers /api/* from a production Worker with 404', async () => {
  const res = await worker.fetch(new Request(TOKEN), env('production'));
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { ok: false, error: 'build-not-production' });
  assert.equal(res.headers.get('x-astromicroscope-env'), 'preview');
});

test('worker: a preview build answers /api/* from a preview Worker (the form endpoint runs)', async () => {
  const res = await worker.fetch(new Request(TOKEN), env('preview'));
  assert.equal(res.status, 500); // no FORM_SIGNING_SECRET in the test: unconfigured, not a build mismatch
  assert.equal(res.headers.get('x-astromicroscope-env'), 'preview');
});

test('worker: a production build answers /api/* from a production Worker', async () => {
  process.env.SITE_ENV = 'production';
  try {
    const res = await worker.fetch(new Request(TOKEN), env('production'));
    assert.equal(res.status, 500);
    assert.equal(res.headers.get('x-astromicroscope-env'), 'production');
  } finally {
    delete process.env.SITE_ENV;
  }
});

test('worker: unknown paths still answer 404', async () => {
  const res = await worker.fetch(new Request('https://astromicroscope.com/api/unknown'), env('preview'));
  assert.equal(res.status, 404);
});

// P07 (D59): the Worker answers 410 Gone for the 143 spam URLs of the old hacked site, and the 404 page for every
// path the static assets do not have (the Worker runs before the assets, so its own 404 page is what a visitor gets).
test('worker: the spam URLs answer 410 Gone, with and without the trailing slash', async () => {
  // A preview build is the case of the test: the production build reads process.env.SITE_ENV once and the other tests
  // set it, so the spam test does not depend on the order of the test file.
  const env = { SITE_ENV: 'preview' };
  const paths = [
    '/analyse-experte-la-popularite-croissante-de-chicken-road-2-dans-le-paysage-ludique-moderne',
    '/analyse-experte-la-popularite-croissante-de-chicken-road-2-dans-le-paysage-ludique-moderne/',
    '/casinia-casino-quickhit-slots-rapid-wins-and-insta/',
  ];
  for (const path of paths) {
    const res = await worker.fetch(new Request('https://astromicroscope-preview.filipvicentijevic99.workers.dev' + path), env);
    assert.equal(res.status, 410, `${path} should be 410 Gone, got ${res.status}`);
  }
});

test('worker: an unknown path answers 404 with the 404 page, in the language of the URL', async () => {
  const env = { SITE_ENV: 'preview' }; // see the spam test: do not depend on the order of the tests
  const sr = await worker.fetch(new Request('https://astromicroscope-preview.filipvicentijevic99.workers.dev/does-not-exist/'), env);
  assert.equal(sr.status, 404);
  assert.match(sr.headers.get('content-type') ?? '', /text\/html/);
  assert.match(await sr.text(), /<html lang="sr-Latn"/);
  const en = await worker.fetch(new Request('https://astromicroscope-preview.filipvicentijevic99.workers.dev/en/does-not-exist/'), env);
  assert.equal(en.status, 404);
  assert.match(await en.text(), /<html lang="en"/);
});

test('smoke: the build environment header must match the production address', () => {
  assert.equal(evaluateBuild('production', 'production'), null);
  assert.equal(evaluateBuild('preview', 'preview'), null);
  assert.match(evaluateBuild('preview', 'production'), /preview build is deployed as production/);
  assert.equal(evaluateBuild('production', 'preview'), 'notice'); // a production build may sit on the preview address
  assert.match(evaluateBuild(undefined, 'production'), /preview build/); // no header at all is a preview build
});
