# Report: M02 Content migration

| | |
|---|---|
| Stage | building |
| Last gate passed | G0 (2026-11-04) |
| Owner | Filip |
| Branch | `feature/m02-content-migration` (pushed 2026-11-03; `main` merged in 2026-11-04) |
| Last commit | `e4abd1c` M02-02: convert the first five articles to the article schema |
| Last updated | 2026-11-04, G0 recorded by Srdjan; `main` merged into the branch |

## Next step
1. Filip: `git push -u origin feature/m02-content-migration` (no PR yet).
2. Send batch 1 to Gorica (the five files in `site/src/content/articles/sr/`, as a document) with the list “Batch 1 for Gorica” below; her corrections go into the files; `draft: true` is removed once she approves.
3. M02-02 batch 2: `mars-u-strelcu`, `retrogradni-uran`, `eklipsa`, `jupiter-u-lavu`, `saturn` (slugs and keys in the map below), each with `transits` filled and `ephemerisChecked: false` until M02-05.
4. M02-05 for `podznak.md`: check the chart positions of Pierre Cardin, Johannes Kepler and Hans Christian Andersen, then set `ephemerisChecked: true`.
5. Ask Srdjan for the two `check-content.mjs` changes under “Requests to other modules”; until then `npm run check` fails on this branch.

## Done
- **M02-01** old-URL map: all 28 pages have a new URL and a target file or a written reason (table “Old-URL map” below). Commit `47a2a64`.
- **M02-02 batch 1** (5 of 10 articles, the texts without transits): `potencijali.md`, `kako-da-vratis-sebe-sebi.md`, `podznak.md`, `astro-vodic-kroz-finansije.md`, `sta-otkriva-decji-horoskop.md` in `site/src/content/articles/sr/`. Commit `e4abd1c`. Answer word counts 50, 48, 51, 48, 48; titles 25–56 characters; descriptions 119–134 characters. Every text has `draft: true` (not yet approved by Gorica).
- **M02-05 for batch 1, partly:** four texts have no astrological dates or chart positions to check → `ephemerisChecked: true`; `podznak.md` has three named natal charts → `false` (see Next step 4).

## Not done
- M02-02 batch 2 (five transit articles).
- M02-03 horoscope 2026 (12 signs), M02-04 pages (About, Why Astromicroscope, Contact), M02-05 for batch 2 and the signs, M02-06 tone (ti) and structure edits.
- Schema check with Astro itself (`npm run build`): not run. The npm registry was blocked in both environments used this session (HTTP 403 from the proxy), so `node_modules` could not be installed. Instead the front matter was checked against the rules of `content.config.ts` with a YAML parser (types, `topics` enum, title ≤ 70, description ≤ 155, answer 40–60 words, dates, `lang` = folder): 5 of 5 pass. To do on Filip's computer: `cd site && npm ci && npx astro sync`.

## Problems and blockers
- **`npm run check` fails on this branch** (expected, M00 owns the script): `check-content.mjs` requires an English file with the same `translationKey` for every Serbian file, in every build, not only in production. The five articles have no English pairs yet (M14), so the check, the build and CI fail until they exist. See Requests to other modules.
- **Bug in `check-content.mjs` (production only):** the placeholder check runs on `JSON.stringify(data)`, where every list becomes `["…"]`, which matches the placeholder pattern. Checked with Node: `{"topics":["finances"]}` → `true`. `topics` is required, so every article would fail a production build. See Requests to other modules.
- **G0 for M02 not recorded:** Srdjan's “may start” on PR #5 is in the log but not as a G0 decision, so the stage stays `idea`. Srdjan to record G0 so the stage can move to `building`.
- Line endings: in a shell without `core.autocrlf=true`, Git shows about 95 files on `main` as changed; they differ only in CRLF/LF (`git diff --ignore-cr-at-eol` is empty). Nothing to fix in the repo; commits on this branch store LF.
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: M02-04 says to convert “Consultations” into data, but D19 replaced the old service list with Gorica's four services, and `site/src/data/analyses.*` belongs to M09. Proposal: M02 does not convert `konsultacije.md`; M09-01 builds the data from `docs/sadrzaj/04`. The old URL `/konsultacije/` still goes into the redirect map. OK?
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: tone “ti” (D18). Should the 2026 horoscope (archive once the 2027 edition is out) also be edited from “vi” to “ti”, or kept as written? Keeping it saves about 7,000 words of editing.
- Note: the old page “Podznak kao skriveni odraz prave ličnosti” lived at a very long URL (the Maslow quote as slug). It goes into the M02-01 map so M13 can redirect it.
- Note: `blog.md` (article list) and `godisnji-horoskop.md` (14 words) are hub pages, not content; proposal: no target file, only a redirect to the new hubs (reason recorded per acceptance criterion 1).
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: M02-02 says Gorica approves every edited text. Proposal: one batch of five articles per pull request, and I send her the batch as a PDF or document for comments before the PR.

## Decisions taken in this module
- 2026-11-04 (Srdjan, issue #9, D31): horoscope files are named by the English sign key (`aries.md`, …), in both languages.
- 2026-11-04 (Srdjan, issue #9): G0 passed, see the log. `check-content.mjs` now skips the sr/en pair check for `draft: true` outside production and tests placeholders on string values only; take it with `git merge main` into the module branch.
- 2026-11-03 (Srdjan, PR #5): consultations are not converted (D19, M09 owns the data); `konsultacije.md` → map entry “replaced by D19”, `/konsultacije/` → `/analize/`. `blog.md` and `godisnji-horoskop.md` → redirects to the new hubs, no target file.
- 2026-11-03 (Srdjan, PR #5, D22): 2026 horoscope converted to the schema in any case; tone and translation depend on which edition is current at launch; no manual tone work until Gorica gives the date for 2027.
- 2026-11-03 (Srdjan, PR #5): edited texts go to Gorica in batches of five before each pull request. M02 may start before Phase 0 is fully closed.

## Batch 1 for Gorica
What changed in her texts, for her approval (nothing else in the body was touched):
- **New for every text:** title as a question, a search description and an “answer first” of 40–60 words, written from her own sentences. Her signature at the end is removed (the author box shows it).
- **Titles:** “Potencijali” → “Kako natalna karta pomaže u izboru fakulteta i karijere?”; “Podznak kao skriveni odraz prave ličnosti” → “Šta podznak (ascendent) govori o tvojoj ličnosti?”; “Astro vodič kroz finansije” → “Šta druga kuća u horoskopu govori o novcu?”; the other two keep their titles.
- **Potencijali:** the old heading “Potencijali koji oblikuju budućnost” at the top removed; Maslow's “Ili ćeš koračati napred…” (from the old blog list) as the quote; sub-headings added where the HTML had glued them to the text (“Sunce, Mesec i Ascendent”, “Primer 2”); **“Primer 6” renamed “Primer 4”** (there was no 4 or 5: please confirm); one paragraph about Mercury repeats almost word for word (left as is, her decision); typos: možemo, kuće, još, strpljivom, i (was “I”), što, kući, podršku, ascendenta; a missing full stop.
- **Kako da vratiš sebe sebi:** the opening sentence separated from the heading “Teret koji nismo birali”.
- **Podznak:** Maslow quote moved to the quote field; “ascedent” → “ascendent” throughout; “opste” → “opšte”, “potvrdjuje” → “potvrđuje”, “u znakuse” → “u znaku se”; heading “Primeri” for the examples; dashes in the 12 sign headings made the same. Please check the chart data of Cardin, Kepler and Andersen.
- **Finansije:** “oslanjanjena” → “oslanjanje na”; stray bold commas removed.
- **Everywhere:** a space after a full stop where it was missing (“novca.Važno” → “novca. Važno”).

## Old-URL map (M02-01)
Every one of the 28 pages of the old site (`docs/sadrzaj/stari-sajt/tekstovi/`, URLs from the source note at the top of each file; WordPress permalinks `/%postname%/`). New Serbian URLs follow `specs/01` and `plan/concept.md`; the English pairs come from M14. M13 builds the redirects from this table (301 from the old URL to the new one; old URL = new URL needs no redirect).

| # | Old URL | New URL (sr) | Target file (`site/src/content/`) | translationKey | Note |
|---|---|---|---|---|---|
| 1 | `/potencijali/` | `/tekstovi/potencijali/` | `articles/sr/potencijali.md` | `potentials` | batch 1 |
| 2 | `/kako-da-vratis-sebe-sebi/` | `/tekstovi/kako-da-vratis-sebe-sebi/` | `articles/sr/kako-da-vratis-sebe-sebi.md` | `return-to-yourself` | batch 1 |
| 3 | `/ljudi-su-vise-od-onoga-sto-se-vidi-na-prvi-pogled-njihov-pravi-potencijal-lezi-u-tome-sta-su-sposobni-postati-a-ne-u-onome-sta-trenutno-jesu-abraham-maslow/` | `/tekstovi/podznak/` | `articles/sr/podznak.md` | `rising-sign` | batch 1; old slug was the Maslow quote, new slug as in `contracts.md` §2 |
| 4 | `/astro-vodic-kroz-finansije/` | `/tekstovi/astro-vodic-kroz-finansije/` | `articles/sr/astro-vodic-kroz-finansije.md` | `finances-guide` | batch 1 |
| 5 | `/sta-otkriva-decji-horoskop/` | `/tekstovi/sta-otkriva-decji-horoskop/` | `articles/sr/sta-otkriva-decji-horoskop.md` | `childrens-horoscope` | batch 1 |
| 6 | `/mars-u-strelcu/` | `/tekstovi/mars-u-strelcu/` | `articles/sr/mars-u-strelcu.md` | `mars-in-sagittarius` | batch 2 (planned) |
| 7 | `/retrogradni-uran/` | `/tekstovi/retrogradni-uran/` | `articles/sr/retrogradni-uran.md` | `uranus-retrograde` | batch 2 (planned) |
| 8 | `/eklipsa/` | `/tekstovi/eklipsa/` | `articles/sr/eklipsa.md` | `eclipses` | batch 2 (planned) |
| 9 | `/jupiter-u-lavu/` | `/tekstovi/jupiter-u-lavu/` | `articles/sr/jupiter-u-lavu.md` | `jupiter-in-leo` | batch 2 (planned) |
| 10 | `/saturn/` | `/tekstovi/saturn/` | `articles/sr/saturn.md` | `saturn-fourth-house` | batch 2 (planned) |
| 11 | `/ovan/` | `/horoskop/2026/ovan/` | `horoscope/sr/2026/ovan.md` | `horoscope-2026-aries` | M02-03; D22: if 2027 is out at launch, redirect to `/horoskop/2027/ovan/` |
| 12 | `/bik/` | `/horoskop/2026/bik/` | `horoscope/sr/2026/bik.md` | `horoscope-2026-taurus` | as 11 |
| 13 | `/blizanci/` | `/horoskop/2026/blizanci/` | `horoscope/sr/2026/blizanci.md` | `horoscope-2026-gemini` | as 11 |
| 14 | `/rak/` | `/horoskop/2026/rak/` | `horoscope/sr/2026/rak.md` | `horoscope-2026-cancer` | as 11 |
| 15 | `/lav/` | `/horoskop/2026/lav/` | `horoscope/sr/2026/lav.md` | `horoscope-2026-leo` | as 11 |
| 16 | `/devica/` | `/horoskop/2026/devica/` | `horoscope/sr/2026/devica.md` | `horoscope-2026-virgo` | as 11 |
| 17 | `/vaga/` | `/horoskop/2026/vaga/` | `horoscope/sr/2026/vaga.md` | `horoscope-2026-libra` | as 11 |
| 18 | `/skorpija/` | `/horoskop/2026/skorpija/` | `horoscope/sr/2026/skorpija.md` | `horoscope-2026-scorpio` | as 11 |
| 19 | `/strelac/` | `/horoskop/2026/strelac/` | `horoscope/sr/2026/strelac.md` | `horoscope-2026-sagittarius` | as 11 |
| 20 | `/jarac/` | `/horoskop/2026/jarac/` | `horoscope/sr/2026/jarac.md` | `horoscope-2026-capricorn` | as 11 |
| 21 | `/vodolija/` | `/horoskop/2026/vodolija/` | `horoscope/sr/2026/vodolija.md` | `horoscope-2026-aquarius` | as 11 |
| 22 | `/riba/` | `/horoskop/2026/ribe/` | `horoscope/sr/2026/ribe.md` | `horoscope-2026-pisces` | as 11; old slug singular, page title “Ribe” |
| 23 | `/godisnji-horoskop/` | `/horoskop/` | none | — | hub page (14 words), redirect to the M07 hub (PR #5) |
| 24 | `/blog/` | `/tekstovi/` | none | — | article list, redirect to the M06 hub (PR #5) |
| 25 | `/konsultacije/` | `/analize/` | none | — | replaced by D19; data is M09's (PR #5) |
| 26 | `/o-meni/` | `/o-meni/` | `pages/sr/o-meni.md` | `about` | M02-04; key = `ROUTES` key in `i18n/routes.ts` |
| 27 | `/zasto-astromicroscope/` | `/o-meni/` | `pages/sr/zasto-astromicroscope.md` | `why-astromicroscope` | M02-04; the name story, shown inside About (M10-01); no route of its own |
| 28 | `/kontakt/` | `/kontakt/` | `pages/sr/kontakt.md` | `contact` | M02-04; key = `ROUTES` key |

Also for M13, not pages of this module: `/` stays `/`; the 143 spam URLs in `docs/sadrzaj/stari-sajt/spam-adrese.md` answer 410. Not in the backup extract and so not mapped: WordPress system and WooCommerce URLs (`/wp-admin/`, `/wp-login.php`, `/feed/`, `/?p=…`, shop and cart pages); M13 to decide 410 or home after a crawl of Search Console data.

## Requests to other modules
- **To M00 (Srdjan), `site/scripts/check-content.mjs`:** (1) skip the missing-pair check for entries with `draft: true` outside production (production already rejects drafts), so M02 can merge Serbian texts before M14; (2) run the placeholder check on the string values of the front matter, not on `JSON.stringify(data)`, so lists like `topics` are not reported as placeholders.
- **To M07 (Srdjan):** horoscope file names. The map uses the Serbian slug as the file name (`horoscope/sr/2026/ovan.md`, `sign: aries`), like articles, where the file name is the URL slug. If M07 prefers `aries.md` in both languages, tell me before M02-03.
- **To M10 (Filip):** `pages/sr/zasto-astromicroscope.md` (`translationKey: why-astromicroscope`) has no route; it is the name story for the About page.
- **To M13:** the redirect list is the “Old-URL map” table in this report.

## Test evidence
| Check | Result | Date |
|---|---|---|
| Front matter of batch 1 against the `content.config.ts` rules (PyYAML, own script) | `OK` for 5 of 5 files | 2026-11-03 |
| Body of batch 1: placeholders `\[[^\]\n]+\](?!\()` | none in 5 files | 2026-11-03 |
| Body text kept: word diff old → new | only removed: source note, old H1, signature, one old H2 (potencijali), quote moved to front matter (podznak); other changes = typo list below | 2026-11-03 |
| `npm run build` | not run (npm registry blocked, HTTP 403) | 2026-11-03 |

## History
- 2026-11-03: branch created; M02-01 map; M02-02 batch 1 converted (5 articles); requests to M00 and M07 recorded.
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
