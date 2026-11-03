# Report: M02 Content migration

| | |
|---|---|
| Stage | idea |
| Last gate passed | none |
| Owner | Filip |
| Branch | `feature/m02-content-migration` (not created yet) |
| Last commit | — |
| Last updated | 2026-11-02, plan created |

## Next step
Approved to start (Srdjan, PR #5). `git switch main && git pull`, then `git switch -c feature/m02-content-migration`; start with M02-01 (old-URL map), then M02-02 in batches of five articles.

## Done
- Item, with evidence: the command run and the result line, or a PR link.

## Not done
- Item (task ID from PLAN.md).

## Problems and blockers
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: M02-04 says to convert “Consultations” into data, but D19 replaced the old service list with Gorica's four services, and `site/src/data/analyses.*` belongs to M09. Proposal: M02 does not convert `konsultacije.md`; M09-01 builds the data from `docs/sadrzaj/04`. The old URL `/konsultacije/` still goes into the redirect map. OK?
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: tone “ti” (D18). Should the 2026 horoscope (archive once the 2027 edition is out) also be edited from “vi” to “ti”, or kept as written? Keeping it saves about 7,000 words of editing.
- Note: the old page “Podznak kao skriveni odraz prave ličnosti” lived at a very long URL (the Maslow quote as slug). It goes into the M02-01 map so M13 can redirect it.
- Note: `blog.md` (article list) and `godisnji-horoskop.md` (14 words) are hub pages, not content; proposal: no target file, only a redirect to the new hubs (reason recorded per acceptance criterion 1).
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: M02-02 says Gorica approves every edited text. Proposal: one batch of five articles per pull request, and I send her the batch as a PDF or document for comments before the PR.

## Decisions taken in this module
- 2026-11-03 (Srdjan, PR #5): consultations are not converted (D19, M09 owns the data); `konsultacije.md` → map entry “replaced by D19”, `/konsultacije/` → `/analize/`. `blog.md` and `godisnji-horoskop.md` → redirects to the new hubs, no target file.
- 2026-11-03 (Srdjan, PR #5, D22): 2026 horoscope converted to the schema in any case; tone and translation depend on which edition is current at launch; no manual tone work until Gorica gives the date for 2027.
- 2026-11-03 (Srdjan, PR #5): edited texts go to Gorica in batches of five before each pull request. M02 may start before Phase 0 is fully closed.

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
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|

## History
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
