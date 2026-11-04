# Report: M02 Content migration

| | |
|---|---|
| Stage | building |
| Last gate passed | G0 (2026-11-04) |
| Owner | Filip |
| Branch | `feature/m02-content-migration` (pushed 2026-11-03; `main` merged in 2026-11-04) |
| Last commit | `78fec8c` M02-02: convert the five transit articles to the article schema |
| Last updated | 2026-11-04, M02-02 done (10 of 10 articles, batch 2 with ephemeris check) |

## Next step
1. Filip: `git push`; send batch 2 to Gorica (document “Tekstovi za novi sajt – paket 2”) with the list “Batch 2 for Gorica” below. Batch 1 was sent on 2026-11-03.
2. M02-03: the 12 signs of the 2026 horoscope to the sign schema, files `site/src/content/horoscope/sr/2026/<english key>.md` (D31). 2026 is the edition at launch (D41), so M02-06 (tone **ti**, D18) applies to them too (D22).
3. M02-04: pages O meni, Zašto Astromicroscope, Kontakt (without the Nikola Stojanović paragraph, D20).
4. M02-05 for `podznak.md` (charts of Cardin, Kepler, Andersen) and for the 12 signs; M02-06 tone pass for `jupiter-u-lavu.md` (uses „vi”).
5. When Gorica approves a batch: remove `draft: true` from its files and open the pull request (D45: Filip merges it when `ci-gate` is green).

## Done
- **M02-01** old-URL map: all 28 pages have a new URL and a target file or a written reason (table “Old-URL map” below). Commit `47a2a64`.
- **M02-02 batch 1** (5 of 10 articles, the texts without transits): `potencijali.md`, `kako-da-vratis-sebe-sebi.md`, `podznak.md`, `astro-vodic-kroz-finansije.md`, `sta-otkriva-decji-horoskop.md` in `site/src/content/articles/sr/`. Commit `e4abd1c`. Answer word counts 50, 48, 51, 48, 48; titles 25–56 characters; descriptions 119–134 characters. Every text has `draft: true` (not yet approved by Gorica).
- **M02-02 batch 2** (the five transit articles): `mars-u-strelcu.md`, `retrogradni-uran.md`, `eklipsa.md`, `jupiter-u-lavu.md`, `saturn.md`. Commit `78fec8c`. Answers 53, 54, 50, 50, 48 words; titles 36–59 characters; descriptions 121–143 characters; `transits` filled for Mars, Uranus, Jupiter. All `draft: true`. M02-02 is complete: 10 of 10 articles.
- **M02-05 for batch 2:** every date checked (see Test evidence); four dates were off by one day and are corrected in the files for Gorica's confirmation (Batch 2 for Gorica). `ephemerisChecked: true` for all five.
- **M02-05 for batch 1, partly:** four texts have no astrological dates or chart positions to check → `ephemerisChecked: true`; `podznak.md` has three named natal charts → `false` (see Next step 4).

## Not done
- M02-03 horoscope 2026 (12 signs), M02-04 pages (About, Why Astromicroscope, Contact), M02-05 for the signs and `podznak.md`, M02-06 tone (ti) and structure edits.
- Schema check with Astro itself (`npm run build`): not run. The npm registry was blocked in both environments used this session (HTTP 403 from the proxy), so `node_modules` could not be installed. Instead the front matter was checked against the rules of `content.config.ts` with a YAML parser (types, `topics` enum, title ≤ 70, description ≤ 155, answer 40–60 words, dates, `lang` = folder): 5 of 5 pass. To do on Filip's computer: `cd site && npm ci && npx astro sync`.

## Problems and blockers
- **Resolved 2026-11-04 (`e5a1fea`, merged into the branch):** ~~`npm run check` fails on this branch~~ (expected, M00 owns the script): `check-content.mjs` requires an English file with the same `translationKey` for every Serbian file, in every build, not only in production. The five articles have no English pairs yet (M14), so the check, the build and CI fail until they exist. See Requests to other modules.
- **Resolved 2026-11-04 (`e5a1fea`):** ~~Bug in `check-content.mjs` (production only):~~ the placeholder check runs on `JSON.stringify(data)`, where every list becomes `["…"]`, which matches the placeholder pattern. Checked with Node: `{"topics":["finances"]}` → `true`. `topics` is required, so every article would fail a production build. See Requests to other modules.
- **Resolved 2026-11-04 (G0 recorded by Srdjan):** ~~G0 for M02 not recorded:~~ Srdjan's “may start” on PR #5 is in the log but not as a G0 decision, so the stage stays `idea`. Srdjan to record G0 so the stage can move to `building`.
- Line endings: in a shell without `core.autocrlf=true`, Git shows about 95 files on `main` as changed; they differ only in CRLF/LF (`git diff --ignore-cr-at-eol` is empty). Nothing to fix in the repo; commits on this branch store LF.
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: M02-04 says to convert “Consultations” into data, but D19 replaced the old service list with Gorica's four services, and `site/src/data/analyses.*` belongs to M09. Proposal: M02 does not convert `konsultacije.md`; M09-01 builds the data from `docs/sadrzaj/04`. The old URL `/konsultacije/` still goes into the redirect map. OK?
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: tone “ti” (D18). Should the 2026 horoscope (archive once the 2027 edition is out) also be edited from “vi” to “ti”, or kept as written? Keeping it saves about 7,000 words of editing.
- Note: the old page “Podznak kao skriveni odraz prave ličnosti” lived at a very long URL (the Maslow quote as slug). It goes into the M02-01 map so M13 can redirect it.
- Note: `blog.md` (article list) and `godisnji-horoskop.md` (14 words) are hub pages, not content; proposal: no target file, only a redirect to the new hubs (reason recorded per acceptance criterion 1).
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: M02-02 says Gorica approves every edited text. Proposal: one batch of five articles per pull request, and I send her the batch as a PDF or document for comments before the PR.

## Decisions taken in this module
- 2026-11-04 (Filip): `transits` in front matter use English lowercase keys (`planet: jupiter`, `sign: leo`), like the horoscope `sign` field, so both languages share them; `TransitTimeline` (M06-02) shows the names in the page language. Eclipses are events, not periods, so `eklipsa.md` has no `transits`.
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

## Batch 2 for Gorica
- **Titles:** “Mars u strelcu” → “Šta donosi Mars u Strelcu (novembar–decembar 2025)?”; “Poslednji poziv za promenu: retrogradni Uran u Biku” → “Šta znači povratak retrogradnog Urana u Bika 2025–2026?”; “Solarna i Lunarna eklipsa” → “Šta donose pomračenja Sunca i Meseca u 2026?”; “Jupiter u Lavu” → “Šta donosi Jupiter u Lavu 2026–2027?”; “Kada Saturn pomeri tlo pod nogama” keeps her words, plus “: Saturn kroz četvrtu kuću”.
- **Dates corrected (ephemeris):** Jupiter enters Leo on **30 June 2026** (text: 1 July) and leaves on **26 July 2027** (text: 27 July); previous stay **16 July 2014 – 11 August 2015** (text: 17 July – 12 August). Uranus is back in Taurus from **8 November 2025 to 26 April 2026** (text: 9 November – 27 April); it was retrograde only until 3–4 February 2026, so the sentence now says Uranus “se, u retrogradnoj fazi, vratio u znak Bika” for that period.
- **Structure:** sub-headings for the aspects and the 12 signs (Mars, Jupiter) and for the two eclipses; Mars text joined into paragraphs (the old page broke lines mid-sentence); Uranus: the three questions in the order of the old blog list; signatures removed (author box). Suggestion: the four Mars aspects could carry exact days (7 Nov sextile Pluto, 13 Nov conjunction Mercury, 9 Dec square Saturn, 14 Dec square Neptune).
- **Typos:** pomračenje, živela, možeš, izbegneš; missing spaces.
- **Note:** Mars (Nov–Dec 2025), Uranus (until April 2026) and the eclipses (Feb–Mar 2026) describe past periods; they are published with their original dates. Jupiter in Leo uses „vi” (M02-06 tone pass to „ti” pending).

## Old-URL map (M02-01)
Horoscope files are named by the English sign key (D31); the Serbian URL slug stays. Every one of the 28 pages of the old site (`docs/sadrzaj/stari-sajt/tekstovi/`, URLs from the source note at the top of each file; WordPress permalinks `/%postname%/`). New Serbian URLs follow `specs/01` and `plan/concept.md`; the English pairs come from M14. M13 builds the redirects from this table (301 from the old URL to the new one; old URL = new URL needs no redirect).

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
| 11 | `/ovan/` | `/horoskop/2026/ovan/` | `horoscope/sr/2026/aries.md` | `horoscope-2026-aries` | M02-03; file named by the English sign key (D31); 2026 is the edition at launch (D41) |
| 12 | `/bik/` | `/horoskop/2026/bik/` | `horoscope/sr/2026/taurus.md` | `horoscope-2026-taurus` | as 11 |
| 13 | `/blizanci/` | `/horoskop/2026/blizanci/` | `horoscope/sr/2026/gemini.md` | `horoscope-2026-gemini` | as 11 |
| 14 | `/rak/` | `/horoskop/2026/rak/` | `horoscope/sr/2026/cancer.md` | `horoscope-2026-cancer` | as 11 |
| 15 | `/lav/` | `/horoskop/2026/lav/` | `horoscope/sr/2026/leo.md` | `horoscope-2026-leo` | as 11 |
| 16 | `/devica/` | `/horoskop/2026/devica/` | `horoscope/sr/2026/virgo.md` | `horoscope-2026-virgo` | as 11 |
| 17 | `/vaga/` | `/horoskop/2026/vaga/` | `horoscope/sr/2026/libra.md` | `horoscope-2026-libra` | as 11 |
| 18 | `/skorpija/` | `/horoskop/2026/skorpija/` | `horoscope/sr/2026/scorpio.md` | `horoscope-2026-scorpio` | as 11 |
| 19 | `/strelac/` | `/horoskop/2026/strelac/` | `horoscope/sr/2026/sagittarius.md` | `horoscope-2026-sagittarius` | as 11 |
| 20 | `/jarac/` | `/horoskop/2026/jarac/` | `horoscope/sr/2026/capricorn.md` | `horoscope-2026-capricorn` | as 11 |
| 21 | `/vodolija/` | `/horoskop/2026/vodolija/` | `horoscope/sr/2026/aquarius.md` | `horoscope-2026-aquarius` | as 11 |
| 22 | `/riba/` | `/horoskop/2026/ribe/` | `horoscope/sr/2026/pisces.md` | `horoscope-2026-pisces` | as 11; old slug singular, page title “Ribe” |
| 23 | `/godisnji-horoskop/` | `/horoskop/` | none | — | hub page (14 words), redirect to the M07 hub (PR #5) |
| 24 | `/blog/` | `/tekstovi/` | none | — | article list, redirect to the M06 hub (PR #5) |
| 25 | `/konsultacije/` | `/analize/` | none | — | replaced by D19; data is M09's (PR #5) |
| 26 | `/o-meni/` | `/o-meni/` | `pages/sr/o-meni.md` | `about` | M02-04; key = `ROUTES` key in `i18n/routes.ts` |
| 27 | `/zasto-astromicroscope/` | `/o-meni/` | `pages/sr/zasto-astromicroscope.md` | `why-astromicroscope` | M02-04; the name story, shown inside About (M10-01); no route of its own |
| 28 | `/kontakt/` | `/kontakt/` | `pages/sr/kontakt.md` | `contact` | M02-04; key = `ROUTES` key |

Also for M13, not pages of this module: `/` stays `/`; the 143 spam URLs in `docs/sadrzaj/stari-sajt/spam-adrese.md` answer 410. Not in the backup extract and so not mapped: WordPress system and WooCommerce URLs (`/wp-admin/`, `/wp-login.php`, `/feed/`, `/?p=…`, shop and cart pages); M13 to decide 410 or home after a crawl of Search Console data.

## Requests to other modules
- **Done 2026-11-04 (Srdjan, `e5a1fea`):** ~~To M00 (Srdjan), `site/scripts/check-content.mjs`:~~ (1) skip the missing-pair check for entries with `draft: true` outside production (production already rejects drafts), so M02 can merge Serbian texts before M14; (2) run the placeholder check on the string values of the front matter, not on `JSON.stringify(data)`, so lists like `topics` are not reported as placeholders.
- **Answered 2026-11-04 (D31):** ~~To M07 (Srdjan): horoscope file names.~~ The map uses the Serbian slug as the file name (`horoscope/sr/2026/ovan.md`, `sign: aries`), like articles, where the file name is the URL slug. If M07 prefers `aries.md` in both languages, tell me before M02-03.
- **To M10 (Filip):** `pages/sr/zasto-astromicroscope.md` (`translationKey: why-astromicroscope`) has no route; it is the name story for the About page.
- **To M13:** the redirect list is the “Old-URL map” table in this report.

## Test evidence
| Check | Result | Date |
|---|---|---|
| Batch 2 dates against an ephemeris: own computation after Schlyter (geocentric, equinox of date; checked first on known dates: Saturn into Aries 2026-02-14, Neptune into Aries 2026-01-26, new moon 2026-02-17 12:01 UT) plus [NASA eclipses 2026](https://eclipse.gsfc.nasa.gov/OH/OH2026.html), [Cafe Astrology, Uranus 2025–26](https://cafeastrology.com/events/uranus-retrograde-enters-taurus-2025/), [Uranus enters Gemini 2026](https://cafeastrology.com/events/uranus-enters-gemini-2026), [Jupiter enters Leo 2026](https://natalecho.com/learn/astrology/jupiter-enters-leo-june-30-2026-exact-date-time-degree-effects-rising-sign) | Mars in Sagittarius 2025-11-04 – 12-15; sextile Pluto 11-07, conj. Mercury 11-13, square Saturn 12-09, square Neptune 12-14; Uranus station retro 2025-09-06, direct 2026-02-04 00:43 CET, in Taurus 2025-11-08 – 2026-04-26 (Belgrade); Uranus in Taurus 1934-06 – 1942-05, 2018-05-15; eclipses 2026-02-17 28° Aquarius (Uranus 27° Taurus, Saturn 0° Aries), 2026-03-03 12° Virgo (Mercury retrograde in Pisces), 2026-08-12; Jupiter into Leo 2026-06-30, into Virgo 2027-07-26, 2014-07-16 – 2015-08-11 | 2026-11-04 |
| Front matter of all 10 articles against the `content.config.ts` rules (PyYAML, own script) | 10 of 10 OK | 2026-11-04 |
| `check-docs.mjs` after merging `main` | `check-docs: 0 problems` | 2026-11-04 |
| Front matter of batch 1 against the `content.config.ts` rules (PyYAML, own script) | `OK` for 5 of 5 files | 2026-11-03 |
| Body of batch 1: placeholders `\[[^\]\n]+\](?!\()` | none in 5 files | 2026-11-03 |
| Body text kept: word diff old → new | only removed: source note, old H1, signature, one old H2 (potencijali), quote moved to front matter (podznak); other changes = typo list below | 2026-11-03 |
| `npm run build` | not run (npm registry blocked, HTTP 403) | 2026-11-03 |

## History
- 2026-11-04: `main` merged into the branch (G0, `check-content` fix, D31); map switched to English horoscope file names; M02-02 batch 2 converted with ephemeris check; M02-02 complete.
- 2026-11-03: branch created; M02-01 map; M02-02 batch 1 converted (5 articles); requests to M00 and M07 recorded.
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
