// Content checks that run before every build (M00-05; specs/05, testing/checklists/content.md).
//  - every key in src/i18n/*.json has sr and en text
//  - every content file sits in its language folder, has the same-named front matter `lang`, and has a pair in the other language with the same translationKey
//  - a file with `draft: true` may lack its pair outside production
//  - with SITE_ENV=production: no [placeholder] text (in string values and the body, not in YAML list syntax), no `ephemerisChecked: false`, no `draft: true`
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const LANGS = ['sr', 'en'];
const COLLECTIONS = ['articles', 'horoscope', 'pages'];
// "[something]" that is not the start of a Markdown link "[text](url)"
const PLACEHOLDER = /\[[^\]\n]+\](?!\()/g;

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else out.push(path);
  }
  return out;
}

/** Every string value in parsed front matter, so YAML lists like `topics: [finances]` are not read as placeholders. */
function* stringValues(value) {
  if (typeof value === 'string') yield value;
  else if (Array.isArray(value)) for (const v of value) yield* stringValues(v);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) yield* stringValues(v);
}

function splitFrontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { data: parse(m[1]) ?? {}, body: m[2] } : { data: {}, body: text, missing: true };
}

/** @param {{ root: string, production: boolean }} options  root = the site/ folder. Returns a list of problems. */
export async function checkContent({ root, production }) {
  const problems = [];

  // Interface strings
  for (const file of (await walk(join(root, 'src/i18n'))).filter((f) => f.endsWith('.json'))) {
    const data = JSON.parse(await readFile(file, 'utf8'));
    const name = relative(root, file);
    for (const [key, texts] of Object.entries(data)) {
      for (const lang of LANGS) {
        const text = texts?.[lang];
        if (typeof text !== 'string' || text.trim() === '') problems.push(`${name}: "${key}" has no "${lang}" text`);
        else if (production && PLACEHOLDER.test(text)) problems.push(`${name}: "${key}" (${lang}) contains a placeholder`);
        PLACEHOLDER.lastIndex = 0;
      }
    }
  }

  // Content files
  for (const collection of COLLECTIONS) {
    const base = join(root, 'src/content', collection);
    const keys = { sr: new Map(), en: new Map() }; // translationKey -> file
    for (const file of (await walk(base)).filter((f) => f.endsWith('.md'))) {
      const name = relative(root, file);
      const folderLang = relative(base, file).split(sep)[0];
      const { data, body, missing } = splitFrontMatter(await readFile(file, 'utf8'));
      if (missing) { problems.push(`${name}: no front matter`); continue; }
      if (!LANGS.includes(folderLang)) { problems.push(`${name}: must be inside ${collection}/sr/ or ${collection}/en/`); continue; }
      if (data.lang !== folderLang) problems.push(`${name}: lang is "${data.lang}" but the file is in the ${folderLang} folder`);
      if (!data.translationKey) problems.push(`${name}: no translationKey`);
      else keys[folderLang].set(data.translationKey, { name, draft: data.draft === true });
      if (production) {
        const texts = [...stringValues(data), body];
        if (texts.some((t) => t.match(PLACEHOLDER))) problems.push(`${name}: contains a placeholder`);
        if (data.ephemerisChecked === false) problems.push(`${name}: ephemerisChecked is false`);
        if (data.draft === true) problems.push(`${name}: draft is true`);
      }
    }
    for (const lang of LANGS) {
      const other = lang === 'sr' ? 'en' : 'sr';
      for (const [key, { name, draft }] of keys[lang]) {
        if (draft && !production) continue; // a draft may wait for its translation
        if (!keys[other].has(key)) problems.push(`${name}: no ${other} file with translationKey "${key}"`);
      }
    }
  }
  return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const production = process.env.SITE_ENV === 'production';
  const problems = await checkContent({ root, production });
  if (problems.length) {
    console.error(`Content check failed (${production ? 'production' : 'non-production'}):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    process.exit(1);
  }
  console.log(`Content check passed (${production ? 'production' : 'non-production'}).`);
}
