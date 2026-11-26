// The Worker's environment guard (D56): the smoke test in the deploy job is a regression test, so it must be impossible
// to pass while a non-production build is deployed as production. It really did pass on 2026-11-07: the preview build was
// uploaded to astromicroscope.com and the smoke test reported 28/28, while the production site sent noindex and
// `Disallow: /` in robots.txt. The Worker's own environment is the header the smoke test checks (x-astromicroscope-env);
// a Worker whose build does not match its environment refuses every /api/* request with 404.
// The Worker imports its generated module (the 404 pages and the spam paths), which the build writes (P07, D59), so it is
// loaded after the module exists: in CI the build has run before the unit tests (`npm run build` first). Without a build
// the failure says to run one.
import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-expect-error plain .mjs without types
import { GENERATED } from './generated-worker.mjs';
import { evaluateBuild } from '../scripts/smoke.mjs';

const TOKEN = 'https://astromicroscope.com/api/form-token';
const env = (value: string) => ({ SITE_ENV: value });

// @ts-expect-error plain TypeScript worker, no types here
const worker = await import('../src/worker/index.ts').then((m) => m.default, (e) => {
  throw new Error(`${e.message}\nrun \`npm run build\` first: it writes ${GENERATED.replace(/^.*\/site\//, 'site/')} (P07, D59)`);
});

test('worker: a local build answers /api/* from a production Worker with 404', async () => {
  const res = await worker.fetch(new Request(TOKEN), env('production'));
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { ok: false, error: 'build-not-production' });
  assert.equal(res.headers.get('x-astromicroscope-env'), 'local');
});

test('worker: a local build answers /api/* from a local Worker (the form endpoint runs)', async () => {
  const res = await worker.fetch(new Request(TOKEN), env('local'));
  assert.equal(res.status, 500); // no FORM_SIGNING_SECRET in the test: unconfigured, not a build mismatch
  assert.equal(res.headers.get('x-astromicroscope-env'), 'local');
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
  const res = await worker.fetch(new Request('https://astromicroscope.com/api/unknown'), env('local'));
  assert.equal(res.status, 404);
});

// P07 (D59): the Worker answers 410 Gone for the 143 spam URLs of the old hacked site, and the 404 page for every
// path the static assets do not have (the Worker runs before the assets, so its own 404 page is what a visitor gets).
test('worker: the spam URLs answer 410 Gone, with and without the trailing slash', async () => {
  // A local build is the case of the test: the production build reads process.env.SITE_ENV once and the other tests
  // set it, so the spam test does not depend on the order of the test file.
  const env = { SITE_ENV: 'local' };
  const paths = [
    '/analyse-experte-la-popularite-croissante-de-chicken-road-2-dans-le-paysage-ludique-moderne',
    '/analyse-experte-la-popularite-croissante-de-chicken-road-2-dans-le-paysage-ludique-moderne/',
    '/casinia-casino-quickhit-slots-rapid-wins-and-insta/',
  ];
  for (const path of paths) {
    const res = await worker.fetch(new Request('https://astromicroscope.com' + path), env);
    assert.equal(res.status, 410, `${path} should be 410 Gone, got ${res.status}`);
  }
});

test('worker: an unknown path answers 404 with the 404 page, in the language of the URL', async () => {
  const env = { SITE_ENV: 'local' }; // see the spam test: do not depend on the order of the tests
  const sr = await worker.fetch(new Request('https://astromicroscope.com/does-not-exist/'), env);
  assert.equal(sr.status, 404);
  assert.match(sr.headers.get('content-type') ?? '', /text\/html/);
  assert.match(await sr.text(), /<html lang="sr-Latn"/);
  const en = await worker.fetch(new Request('https://astromicroscope.com/en/does-not-exist/'), env);
  assert.equal(en.status, 404);
  assert.match(await en.text(), /<html lang="en"/);
});

test('smoke: the production address must serve the production build', () => {
  assert.equal(evaluateBuild('production'), null);
  assert.match(evaluateBuild('local'), /non-production build is deployed \(build environment local\)/);
  assert.match(evaluateBuild(undefined), /non-production build/); // no header at all is not the production build
});
