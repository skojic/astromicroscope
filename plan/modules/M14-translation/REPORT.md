# Report: M14 English translation

| | |
|---|---|
| Stage | idea |
| Last gate passed | none |
| Owner | Filip (+ review) |
| Branch | `feature/m14-translation` (not created yet) |
| Last commit | — |
| Last updated | 2026-11-02, plan created |

## Next step
M14-01 (glossary) may start now, in parallel with M02 (Srdjan, PR #5): `git switch -c feature/m14-translation`, create `plan/modules/M14-translation/glossary.md`. Translation of texts waits for M02 files.

## Done
- Item, with evidence: the command run and the result line, or a PR link.

## Not done
- Item (task ID from PLAN.md).

## Problems and blockers
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: D17 says everything in English at launch. Does that include the 2026 horoscope archive (12 texts, about 7,000 words), or only the current edition? Excluding the archive would cut the effort by about a third.
- Word count to track: about 20,000 words from the old site plus `docs/sadrzaj/01–07`; counted per batch in this report.

## Decisions taken in this module
- 2026-11-03 (Srdjan, PR #5, D22): 2026 horoscope archive is not translated by hand until Gorica gives the 2027 date; machine translation only. An archive only in Serbian cannot be published (`specs/05`). Start with the glossary (M14-01) in parallel with M02.
- 2026-11-02 (D17): machine-translated first draft is fine; Filip edits every text; **Srdjan gives the final English review**; **everything in English at launch**.
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|

## History
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
