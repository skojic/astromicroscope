# Report: M00 Foundation

| | |
|---|---|
| Stage | idea |
| Last gate passed | none |
| Owner | Srdjan |
| Branch | `feature/m00-foundation` (PR #6) |
| Last commit | `988f66e` |
| Last updated | 2026-11-03, M00-02 done |

## Next step
M00-03 (SR at `/`, EN at `/en/`: routing and language helpers). M00-01 (check `contracts.md` against Astro 7.4.5) has no recorded result; do it before Filip starts templates. PR #6 needs the owner's approval to merge.

## Done
- M00-02: Astro 7.4.5 project (minimal template) in `site/`, versions pinned exactly in `package.json`, `package-lock.json` committed, `site/README.md` documents the npm commands. Evidence: commits `40c865a`, `988f66e`; PR #6; in `site/` with Node 24.19.0 / npm 12.0.2, `npm ci` completed and `npm run build` printed `1 page(s) built in 130ms` and `Complete!` (2026-11-03). `npm run dev` and `npm run preview` were not run.

## Not done
- M00-01, M00-03 to M00-08 (PLAN.md). Nothing recorded for M00-01.

## Problems and blockers
- Stage stays `idea`: no G0 approval is noted in `status/log.md` for this module, and the gate rules do not allow a stage change without it. Srdjan can note it.
- `npm ci` printed an `install-scripts` warning for `fsevents@2.3.3` (install script not run); not investigated.
- The commit `988f66e` and the first title of PR #6 labelled this work M00-03 by mistake; it is M00-02 (PR text corrected).

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|

## History
- 2026-11-02: plan created.
- 2026-11-03: M00-02 done (Astro 7.4.5 in `site/`, pinned, README); PR #6 opened.
