import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed } from '../scripts/import-videos.mjs';

const entry = (published: string) => `<feed><entry><yt:videoId>abc12345678</yt:videoId><title>Naslov</title><published>${published}</published><media:description>Opis</media:description></entry></feed>`;

test('the feed date is kept for display and the full timestamp with timezone for structured data', () => {
  const [v] = parseFeed(entry('2026-09-22T19:46:51+00:00'));
  assert.equal(v.published, '2026-09-22');
  assert.equal(v.publishedAt, '2026-09-22T19:46:51+00:00');
});
