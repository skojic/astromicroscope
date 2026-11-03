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
Not started. Wait for: plan/contracts.md (not M00 code). Then read `PLAN.md` and `plan/contracts.md`, create the branch, and start with task M02-01.

## Done
- Item, with evidence: the command run and the result line, or a PR link.

## Not done
- Item (task ID from PLAN.md).

## Problems and blockers
- Question (Srdjan): M02-04 says to convert “Consultations” into data, but D19 replaced the old service list with Gorica's four services, and `site/src/data/analyses.*` belongs to M09. Proposal: M02 does not convert `konsultacije.md`; M09-01 builds the data from `docs/sadrzaj/04`. The old URL `/konsultacije/` still goes into the redirect map. OK?
- Question (Srdjan, Gorica): tone “ti” (D18). Should the 2026 horoscope (archive once the 2027 edition is out) also be edited from “vi” to “ti”, or kept as written? Keeping it saves about 7,000 words of editing.
- Note: the old page “Podznak kao skriveni odraz prave ličnosti” lived at a very long URL (the Maslow quote as slug). It goes into the M02-01 map so M13 can redirect it.
- Note: `blog.md` (article list) and `godisnji-horoskop.md` (14 words) are hub pages, not content; proposal: no target file, only a redirect to the new hubs (reason recorded per acceptance criterion 1).
- Process (Gorica): M02-02 says Gorica approves every edited text. Proposal: one batch of five articles per pull request, and I send her the batch as a PDF or document for comments before the PR.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|

## History
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
