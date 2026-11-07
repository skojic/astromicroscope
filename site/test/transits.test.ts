import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatTransitDate, planetName, fill, transitBars, transitStrings } from '../src/i18n/transits.ts';

test('dates are formatted per language and never shift with the time zone', () => {
  assert.equal(formatTransitDate('2026-02-14', 'sr'), '14.2.2026.');
  assert.equal(formatTransitDate('2026-02-14', 'en'), '14 Feb 2026');
  assert.equal(formatTransitDate(new Date('2028-04-13T00:00:00Z'), 'en'), '13 Apr 2028');
});

test('planet names are translated, unknown ones pass through', () => {
  assert.equal(planetName('uranus', 'sr'), 'Uran');
  assert.equal(planetName('uranus', 'en'), 'Uranus');
  assert.equal(planetName('chiron', 'en'), 'chiron');
});

test('the transit sentence is filled in both languages', () => {
  assert.equal(fill(transitStrings.transitIn.sr, { planet: 'Saturn', sign: 'Ovan' }), 'Saturn, znak Ovan');
  assert.equal(fill(transitStrings.transitIn.en, { planet: 'Saturn', sign: 'Aries' }), 'Saturn in Aries');
});

test('bars share one scale', () => {
  const [one] = transitBars([{ planet: 'saturn', sign: 'aries', from: '2026-02-14', to: '2028-04-13' }]);
  assert.deepEqual(one, { left: 0, width: 100 });
  const [a, b] = transitBars([
    { planet: 'saturn', sign: 'aries', from: '2026-01-01', to: '2026-12-31' },
    { planet: 'jupiter', sign: 'leo', from: '2026-07-01', to: '2026-12-31' },
  ]);
  assert.equal(a.left, 0);
  assert.ok(b.left > 45 && b.left < 55 && a.width > b.width);
  assert.deepEqual(transitBars([]), []);
});
