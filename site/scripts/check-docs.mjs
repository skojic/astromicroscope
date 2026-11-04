// Consistency check of the project documents (rule 5 of AGENTS.md, automated). Run from site/: `npm run check:docs`.
//   node scripts/check-docs.mjs          report problems, exit 1 when there are any
//   node scripts/check-docs.mjs --fix    also rewrite what can be derived: owner and stage cells of the STATUS module table
//                                        from the module reports, and the `Updated:` date from the newest log entry
// Checks: every module report has a valid stage and a last gate that fits it; the STATUS table matches the reports;
// every D-number mentioned anywhere is defined in status/decisions.md and no number is defined twice; STATUS `Updated:`
// is the date of the newest entry in status/log.md; relative links in STATUS.md point to files that exist.
import { readFile, readdir, writeFile, access } from 'node:fs/promises';
import { join, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const STAGES = ['idea', 'specced', 'approved', 'building', 'testing', 'review', 'done', 'blocked'];
// Which "Last gate passed" values fit a stage (testing/gates.md: G0 approved, G1 testing, G2/G3 review, G4/G5 done).
export const GATES_FOR_STAGE = { idea: ['none'], specced: ['none'], approved: ['G0'], building: ['none', 'G0'], testing: ['G1'], review: ['G2', 'G3'], done: ['G4', 'G5'] };

const firstWord = (s) => s.trim().split(/[\s(]/)[0];

export function parseReportHeader(text) {
  const cell = (label) => text.match(new RegExp(`^\\|\\s*${label}\\s*\\|\\s*(.+?)\\s*\\|\\s*$`, 'mi'))?.[1] ?? null;
  const stageRaw = cell('Stage');
  const gateRaw = cell('Last gate passed');
  const ownerRaw = cell('Owner');
  const gateMatch = gateRaw?.trim().match(/^(none|G[0-5])/i)?.[1];
  return {
    stage: stageRaw ? firstWord(stageRaw).toLowerCase() : null,
    gate: gateMatch ? (/^none$/i.test(gateMatch) ? 'none' : gateMatch.toUpperCase()) : null,
    owner: ownerRaw ? (/\s\+\s/.test(ownerRaw) ? 'both' : firstWord(ownerRaw)) : null, // "Srdjan + Filip" is "both" in STATUS
  };
}

/** Rows of the STATUS module table: `| M00 Foundation | Srdjan | done | … |`. */
export function parseStatusRows(text) {
  const rows = [];
  for (const [index, line] of text.split('\n').entries()) {
    const m = line.match(/^\|\s*(M\d\d)\b[^|]*\|([^|]*)\|([^|]*)\|/);
    if (m) rows.push({ index, id: m[1], owner: firstWord(m[2]), stage: firstWord(m[3]).toLowerCase() });
  }
  return rows;
}

export function definedDecisions(text) {
  return [...text.matchAll(/^\|\s*D(\d+)\s*\|/gm)].map((m) => Number(m[1]));
}

export function mentionedDecisions(text) {
  return [...text.matchAll(/(?<![\w/`.-])D(\d{1,3})(?![\w])/g)].map((m) => Number(m[1]));
}

export function newestLogDate(text) {
  return [...text.matchAll(/^##\s+(\d{4}-\d{2}-\d{2})\s*$/gm)].map((m) => m[1]).sort().at(-1) ?? null;
}

async function exists(p) { try { await access(p); return true; } catch { return false; } }
async function markdownFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.') || e.name === 'dist') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await markdownFiles(p)));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

export async function checkDocs(root, { fix = false } = {}) {
  const failures = [];
  const fail = (where, msg) => failures.push(`${where}: ${msg}`);
  const statusPath = join(root, 'status/STATUS.md');
  let status = await readFile(statusPath, 'utf8');

  // 1. module reports
  const reports = {};
  const modulesDir = join(root, 'plan/modules');
  for (const e of await readdir(modulesDir, { withFileTypes: true })) {
    const id = e.name.match(/^(M\d\d)-/)?.[1];
    if (!e.isDirectory() || !id) continue;
    const file = join(modulesDir, e.name, 'REPORT.md');
    if (!(await exists(file))) { fail(`plan/modules/${e.name}`, 'no REPORT.md'); continue; }
    const h = parseReportHeader(await readFile(file, 'utf8'));
    reports[id] = h;
    const where = `plan/modules/${e.name}/REPORT.md`;
    if (!h.stage || !STAGES.includes(h.stage)) { fail(where, `stage "${h.stage}" is not one of ${STAGES.join(', ')}`); continue; }
    if (!h.gate) { fail(where, 'no "Last gate passed" line (use none or G0 to G5)'); continue; }
    const allowed = GATES_FOR_STAGE[h.stage];
    if (allowed && !allowed.includes(h.gate)) fail(where, `stage ${h.stage} does not fit last gate ${h.gate} (expected ${allowed.join(' or ')}; testing/gates.md)`);
  }

  // 2. STATUS table against the reports
  const rows = parseStatusRows(status);
  const lines = status.split('\n');
  for (const id of Object.keys(reports)) {
    const row = rows.find((r) => r.id === id);
    if (!row) { fail('status/STATUS.md', `no table row for ${id}`); continue; }
    const rep = reports[id];
    if (!rep.stage) continue;
    const wrong = [];
    if (row.stage !== rep.stage) wrong.push(`stage ${row.stage} (report: ${rep.stage})`);
    if (rep.owner && row.owner.toLowerCase() !== rep.owner.toLowerCase()) wrong.push(`owner ${row.owner} (report: ${rep.owner})`);
    if (!wrong.length) continue;
    if (fix) {
      const parts = lines[row.index].split('|');
      if (rep.owner) parts[2] = ` ${rep.owner} `;
      parts[3] = ` ${rep.stage} `;
      lines[row.index] = parts.join('|');
    } else fail('status/STATUS.md', `${id} row differs from its report: ${wrong.join(', ')}`);
  }
  for (const r of rows) if (!reports[r.id]) fail('status/STATUS.md', `row ${r.id} has no module folder`);
  status = lines.join('\n');

  // 3. decisions
  const decisionsText = await readFile(join(root, 'status/decisions.md'), 'utf8');
  const defined = definedDecisions(decisionsText);
  const seen = new Set();
  for (const n of defined) { if (seen.has(n)) fail('status/decisions.md', `D${n} is defined twice`); seen.add(n); }
  const mdFiles = [...(await markdownFiles(root))].filter((f) => !f.includes(`${sep}docs${sep}sadrzaj${sep}stari-sajt${sep}`));
  for (const f of mdFiles) {
    const rel = f.slice(root.length + 1);
    const missing = new Set(mentionedDecisions(await readFile(f, 'utf8')).filter((n) => !seen.has(n)));
    for (const n of missing) fail(rel, `mentions D${n}, which is not defined in status/decisions.md`);
  }

  // 4. Updated: date against the log
  const newest = newestLogDate(await readFile(join(root, 'status/log.md'), 'utf8'));
  const updated = status.match(/^Updated:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
  if (!updated) fail('status/STATUS.md', 'no "Updated: YYYY-MM-DD" line');
  else if (newest && updated !== newest) {
    if (fix) status = status.replace(/^Updated:\s*\d{4}-\d{2}-\d{2}/m, `Updated: ${newest}`);
    else fail('status/STATUS.md', `Updated: ${updated} but the newest entry of status/log.md is ${newest}`);
  }
  if (updated && updated > new Date().toISOString().slice(0, 10)) fail('status/STATUS.md', `Updated: ${updated} is in the future`);

  // 5. relative links in STATUS.md
  for (const m of status.matchAll(/\]\((?!https?:|#|mailto:)([^)\s]+)\)/g)) {
    const target = resolve(dirname(statusPath), m[1].split('#')[0]);
    if (!(await exists(target))) fail('status/STATUS.md', `link ${m[1]} does not exist`);
  }

  if (fix) await writeFile(statusPath, status);
  return failures;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../../', import.meta.url)).replace(/\/$/, '');
  const fix = process.argv.includes('--fix');
  const failures = await checkDocs(root, { fix });
  if (failures.length) { console.log(failures.map((f) => `  - ${f}`).join('\n')); console.log(`check-docs: ${failures.length} problem(s)`); process.exit(1); }
  console.log(fix ? 'check-docs: STATUS.md synced from the reports and the log, no other problems' : 'check-docs: 0 problems');
}
