# Report: M00 Foundation

| | |
|---|---|
| Stage | approved (G0, D23) |
| Last gate passed | none |
| Owner | Srdjan |
| Branch | `feature/m00-contracts-check` |
| Last commit | — (M00-01 not yet committed) |
| Last updated | 2026-11-03, M00-01 done, G0 go |

## Next step
M00-03 (SR at `/`, EN at `/en/`: routing and language helpers) on a new branch. The `contracts.md` corrections from M00-01 need a pull request that Filip also approves (`contracts.md` header); tell him.

## Done
- M00-01: `contracts.md` checked against Astro 7.4.5 in a scratch project (not in `site/`). Built fine: glob collection with `astro/zod` schema (a bad `topics` value failed the build with `InvalidContentEntryDataError`), i18n routing with `prefixDefaultLocale: false` (`/` = sr, `/en/` = en, `Astro.currentLocale` correct), `getRelativeLocaleUrl`, `Image` (webp output), `public/_headers` copied to `dist/`. Corrections made in `plan/contracts.md`: config file `content.config.ts`, imports, entry ids include the language folder. Not checked: form endpoints, Cloudflare adapter.
- G0 for M00: go, by Srdjan (D23).
- M00-02: Astro 7.4.5 project (minimal template) in `site/`, versions pinned exactly in `package.json`, `package-lock.json` committed, `site/README.md` documents the npm commands. Evidence: commits `40c865a`, `988f66e`; PR #6; in `site/` with Node 24.19.0 / npm 12.0.2, `npm ci` completed and `npm run build` printed `1 page(s) built in 130ms` and `Complete!` (2026-11-03). `npm run dev` and `npm run preview` were not run.

## Not done
- M00-03 to M00-10 (PLAN.md). M00-08 is blocked: Srdjan cannot create API tokens in Filip's Cloudflare account.

## Problems and blockers
- M00-08 (hosting) and the per-PR preview URL: Srdjan lacks the privilege to create API tokens in Filip's Cloudflare account (2026-11-03); Filip or an admin must create the token or raise the role.
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
- 2026-11-03: M00-01 done, G0 go (D23).
