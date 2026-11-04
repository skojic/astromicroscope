# Report: M00 Foundation

| | |
|---|---|
| Stage | building (G0 passed, D23) |
| Last gate passed | G0 |
| Owner | Srdjan |
| Branch | `main` (owner bypass, pushed directly) |
| Last commit | see `git log` (site CI green) |
| Last updated | 2026-11-04 |

## Next step
M00-08 and the preview URL once the Cloudflare token exists. Then gates G2 to G4 for M00.

## Done
- M00-10 Dependabot security updates: turned on by Srdjan on 2026-11-04 (`gh api -X PUT repos/skojic/astromicroscope/automated-security-fixes`). Evidence: `gh api repos/skojic/astromicroscope --jq .security_and_analysis` → `"dependabot_security_updates":{"status":"enabled"}` (before: `disabled`). Actions are pinned to SHAs.
- M00-01: `contracts.md` checked against Astro 7.4.5 and corrected (PR #8, merged).
- M00-02: Astro 7.4.5 project, versions pinned, README (PR #6).
- M00-03: `site/src/i18n/core.ts`, `routes.ts`: language helpers, route pairs; `src/pages/index.astro` and `en/index.astro` (sr at `/`, en at `/en/`, `<html lang>` `sr-Latn` / `en`).
- M00-04: tokens and fonts generated from `brand/` (`scripts/sync-brand.mjs`); Newsreader and Schibsted reduced (`scripts/reduce-fonts.py`): `Newsreader-normal-latin` 131,848 → 51,440 bytes, all six files 528 KB → 235 KB (D25).
- M00-05: `src/content.config.ts` (articles, horoscope, pages); `scripts/check-content.mjs` fails the build on a missing translation, a file in the wrong language folder, and (with `SITE_ENV=production`) a `[placeholder]`, `ephemerisChecked: false` or `draft: true`. A bad front-matter value fails the build (`InvalidContentEntryDataError`, tried on a throwaway file).
- M00-06: `layouts/Base.astro`, `Page.astro` (props from contracts §5 plus `paths`, `image`, `type`, `noindex`); `components/ui/` Button, Link, Card, Pending, Breadcrumbs.
- M00-07: `.github/workflows/site-ci.yml`: unit tests, content checks, build, html-validate, axe (WCAG 2.2 A/AA, phone and desktop, phone menu open), browser checks, Lighthouse mobile (median of 3: LCP ≤ 2000 ms, CLS ≤ 0.05, TBT ≤ 150 ms, 400 KB). Actions pinned to commit SHAs.
- M00-09: `dist/_headers` written at build (`src/integrations/headers.mjs`): HSTS, nosniff, Referrer-Policy, Permissions-Policy, CSP (frame-ancestors, object-src, base-uri, form-action, img/font/connect/frame-src) plus Astro's hash-based script/style CSP in each page; `X-Robots-Tag: noindex` unless `SITE_ENV=production` (D24).

## Not done
- M00-08 Hosting on Filip's Cloudflare account and the preview URL per pull request (blocked, see below).
- Data schemas of contracts §3 (Analysis, Course, Video) are not in `content.config.ts`: their owners (M09, M08, M11) define them with their data. M11's is in `components/sections/videos/data.ts`.
- Not demonstrated: that a failing Lighthouse assertion or a failing axe run turns CI red (axe did report `label-content-name-mismatch` locally before two fixes; html-validate rejected a deliberately bad file).
- Headers were not tested on a live host: Cloudflare applying `_headers` is unchecked.

## Problems and blockers
- M00-08: Srdjan cannot create API tokens in Filip's Cloudflare account (2026-11-03). Filip must create a token (Account API token, template Edit Cloudflare Workers, this account only) and add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets, or give Srdjan a role that can.
- `npm ci` prints an `install-scripts` warning for `fsevents@2.3.3` (macOS-only optional dependency); not investigated.
- CI first failed Lighthouse on CLS 0.13 (Linux runner, font swap). Fixed with `font-display: optional` (D25); local CLS 0, CI green afterwards.

## Decisions taken in this module
- D24 (preview vs production), D25 (fonts), D28 (logo) in `status/decisions.md`.

## Requests to other modules
- To all modules: use `Page.astro`, `components/ui/`, `i18n/core.ts`; add strings in `src/i18n/<module>.json` and validate them with `defineStrings`. `npm run check` and `npm test` must pass before a pull request; read `site/README.md`.
- To M06 and M10: the sign and article pages expect `TransitTimeline.astro` and `AuthorBox.astro` at the paths in contracts §5.
- To Filip: PR #8 changed `contracts.md`; M03 now owns `i18n/routes.ts` (route pairs); any page not in `ROUTES` passes its own `paths` to `Page.astro`.

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm test` (site/) | `ℹ pass 15`, `ℹ fail 0` | 2026-11-03 |
| `npm run build` | `18 page(s) built`, no warnings | 2026-11-03 |
| `npm run test:html` | no output, exit 0 (html-validate on `dist/`) | 2026-11-03 |
| `npm run test:axe` | `axe: 18 pages x 2 viewports, 0 violations` | 2026-11-03 |
| `npm run test:e2e` | `e2e: 18 pages, 0 failures` | 2026-11-03 |
| GitHub Actions `site-ci` on `main` | success for the last push (all steps incl. Lighthouse median of 3) | 2026-11-03 |

## History
- 2026-11-02: plan created.
- 2026-11-03: M00-02 done (Astro 7.4.5 in `site/`, pinned, README); PR #6 opened.
- 2026-11-03: M00-01 done, G0 go (D23).
- 2026-11-03: M00-03 to M00-07 and M00-09 built and pushed to `main`; CI green.
