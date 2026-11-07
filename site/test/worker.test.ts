// The Worker's environment guard (D56): the smoke test in the deploy job is a regression test, so it must be impossible
// to pass while a preview build is deployed as production. It really did pass on 2026-11-07: the preview build was
// uploaded to astromicroscope.com and the smoke test reported 28/28, while the production site sent noindex and
// `Disallow: /` in robots.txt. The Worker's own environment is the header the smoke test checks (x-astromicroscope-env);
// a Worker whose build does not match its environment refuses every /api/* request with 404.
import { test } from 'node:test';
import assert from 'node:assert/strict';
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

test('smoke: the build environment header must match the production address', () => {
  assert.equal(evaluateBuild('production', 'production'), null);
  assert.equal(evaluateBuild('preview', 'preview'), null);
  assert.match(evaluateBuild('preview', 'production'), /preview build is deployed as production/);
  assert.equal(evaluateBuild('production', 'preview'), 'notice'); // a production build may sit on the preview address
  assert.match(evaluateBuild(undefined, 'production'), /preview build/); // no header at all is a preview build
});
