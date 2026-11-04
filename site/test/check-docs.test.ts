import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseReportHeader, parseStatusRows, definedDecisions, mentionedDecisions, newestLogDate, GATES_FOR_STAGE, STAGES } from '../scripts/check-docs.mjs';

const header = (stage: string, gate: string, owner = 'Srdjan') => `| | |\n|---|---|\n| Stage | ${stage} |\n| Last gate passed | ${gate} |\n| Owner | ${owner} |\n`;

test('a report header gives its stage, last gate and owner', () => {
  assert.deepEqual(parseReportHeader(header('done (G4 approved 2026-11-04)', 'G4')), { stage: 'done', gate: 'G4', owner: 'Srdjan' });
  assert.deepEqual(parseReportHeader(header('idea', 'none', 'Filip (+ review)')), { stage: 'idea', gate: 'none', owner: 'Filip' });
  assert.equal(parseReportHeader(header('review', 'G4 (owner approval; G2 and G3 did not run)')).gate, 'G4');
});

test('two owners are "both", as in the STATUS table', () => {
  assert.equal(parseReportHeader(header('idea', 'none', 'Srdjan + Filip')).owner, 'both');
});

test('every stage has a rule for the last gate, except blocked', () => {
  for (const s of STAGES) assert.ok(s === 'blocked' || GATES_FOR_STAGE[s as keyof typeof GATES_FOR_STAGE], s);
  assert.ok(GATES_FOR_STAGE.review.includes('G2') && !GATES_FOR_STAGE.review.includes('G4'));
});

test('STATUS rows give module id, owner and stage', () => {
  const rows = parseStatusRows('| Module | Owner |\n|---|---|\n| M00 Foundation | Srdjan | done | — | [REPORT](x) |\n| M13 QA and launch | both | idea | all | r |');
  assert.deepEqual(rows.map((r) => [r.id, r.owner, r.stage]), [['M00', 'Srdjan', 'done'], ['M13', 'both', 'idea']]);
});

test('decisions: defined, mentioned (not inside words, paths or code names) and the newest log date', () => {
  assert.deepEqual(definedDecisions('| D1 | a |\n| D12 | b |\n| ~~P03~~ | c |'), [1, 12]);
  assert.deepEqual(mentionedDecisions('see D12 and (D3), not 3D, ID5, a/D7 or `D9`'), [12, 3]);
  assert.equal(newestLogDate('# Log\n\n## 2026-11-04\n- x\n\n## 2026-11-03\n- y'), '2026-11-04');
});
