# Report: M02 Content migration

| | |
|---|---|
| Stage | approved |
| Last gate passed | G0 (2026-11-04) |
| Owner | Filip |
| Branch | `feature/m02-content-migration` (not created yet) |
| Last commit | — |
| Last updated | 2026-11-04, G0 recorded |

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
- 2026-11-04 (Srdjan, issue #9, D31): horoscope files are named by the English sign key (`aries.md`, …), in both languages.
- 2026-11-04 (Srdjan, issue #9): G0 passed, see the log. `check-content.mjs` now skips the sr/en pair check for `draft: true` outside production and tests placeholders on string values only; take it with `git merge main` into the module branch.
- 2026-11-03 (Srdjan, PR #5): consultations are not converted (D19, M09 owns the data); `konsultacije.md` → map entry “replaced by D19”, `/konsultacije/` → `/analize/`. `blog.md` and `godisnji-horoskop.md` → redirects to the new hubs, no target file.
- 2026-11-03 (Srdjan, PR #5, D22): 2026 horoscope converted to the schema in any case; tone and translation depend on which edition is current at launch; no manual tone work until Gorica gives the date for 2027.
- 2026-11-03 (Srdjan, PR #5): edited texts go to Gorica in batches of five before each pull request. M02 may start before Phase 0 is fully closed.

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|

## History
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
