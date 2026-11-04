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
M00-08 remainder: the preview workflow (`.github/workflows/site-preview.yml`) is written and skips until `CLOUDFLARE_ACCOUNT_ID` exists and `CLOUDFLARE_API_TOKEN` is a dedicated CI token. The repo already holds a secret `CLOUDFLARE_API_TOKEN` (set 2026-11-03 20:15 UTC, origin and scope unknown, value unreadable). Srdjan or Filip: create an Account API token for this account only (template Edit Cloudflare Workers), set it as `CLOUDFLARE_API_TOKEN`, add `CLOUDFLARE_ACCOUNT_ID`, then check the first pull request run shows the `Pregled / Preview` comment. After that M00-08 can go through its gate; then G2 to G4 for M00.

## Done
- M00-08 (part): Worker `astromicroscope` with static assets deployed to Filip's Cloudflare account by Srdjan with his account API token (kept in the macOS keychain, not in the repo): `site/wrangler.jsonc`, `wrangler@4.157.0` pinned, scripts `deploy:dry-run` and `deploy:preview`. Address: `https://astromicroscope.filipvicentijevic99.workers.dev`, non-production build, `noindex` (D36). Evidence in the test table below. Pull request from `feature/m00-08-cloudflare-hosting`.
- M00-08 (part): `.github/workflows/site-preview.yml`: per-pull-request preview with `wrangler preview --name pr-<number>` (URL `https://pr-<number>-astromicroscope.filipvicentijevic99.workers.dev`), one updated comment on the pull request, preview deleted on close, skips without the two secrets and on fork pull requests (`pull_request`, not `pull_request_target`). `wrangler.jsonc` got an empty `previews` block, which `wrangler preview` requires. Not yet run in CI (no usable secrets).
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
- M00-08 preview in CI has not run yet: it needs the CI token and account ID secrets (see Next step). The manual deploy to the temporary address is done.
- Data schemas of contracts §3 (Analysis, Course, Video) are not in `content.config.ts`: their owners (M09, M08, M11) define them with their data. M11's is in `components/sections/videos/data.ts`.
- Not demonstrated: that a failing Lighthouse assertion or a failing axe run turns CI red (axe did report `label-content-name-mismatch` locally before two fixes; html-validate rejected a deliberately bad file).
- Headers on a live host: now checked on the temporary address (see test table). Custom domain, production build and DNS are not touched (launch, M13).

## Problems and blockers
- M00-08 token: Srdjan now has an account API token for Filip's account (verified 2026-11-04: `This API Token is valid and active` on the account endpoint; `wrangler whoami`: Account API Token). The CI token for GitHub secrets is still open: it should be separate from Srdjan's, limited to this account. `gh secret list` shows `CLOUDFLARE_API_TOKEN` (2026-11-03) but no `CLOUDFLARE_ACCOUNT_ID`; I have not touched either.
- First `wrangler deploy` failed at 10:00 UTC with `Could not automatically register "site" as your workers.dev subdomain` (wrangler's `GET .../workers/subdomain` got 404). The account subdomain `filipvicentijevic99` existed a few minutes later; cause (likely created when the dashboard page was opened) is inferred, not confirmed. The retry succeeded without changes.
- npm blocks the `esbuild` and `workerd` install scripts of wrangler (`install-scripts` warning). Decision: leave them blocked (least privilege). Deploys and `wrangler preview` work without them (tested 2026-11-04); local `wrangler dev` needs `workerd` and is not used in this project.
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
| `npm run deploy:dry-run` | `Read 87 files from the assets directory`, `--dry-run: exiting now.` | 2026-11-04 |
| `npm run deploy:preview` (retry) | `Success! Uploaded 69 files`, `https://astromicroscope.filipvicentijevic99.workers.dev`, Version ID `80733f36-e53a-49f4-b87a-c4439ea7a7e9` | 2026-11-04 |
| `wrangler preview --name m00-08-test --json` (throwaway, deleted after) | first run: `Your Wrangler configuration is missing a previews block`; after adding `"previews": {}`: preview URL `https://m00-08-test-astromicroscope.filipvicentijevic99.workers.dev` returned 200 with `x-robots-tag: noindex`, main address still 200; `wrangler preview delete` → `Preview "m00-08-test" deleted successfully.` Progress lines precede the JSON on stdout; the workflow cuts from the first `{` line | 2026-11-04 |
| `npm test` (site/) after the changes | `ℹ pass 25`, `ℹ fail 0`; `npm run build` `18 page(s) built`; `deploy:dry-run` `Read 87 files` | 2026-11-04 |
| `curl` on the live address | `/` and `/en/` 200; `/nepostoji/` and `/en/nepostoji/` 404 with titles `Strana nije pronađena` / `Page not found`; `/en` 307 to `/en/`; `x-robots-tag: noindex`, `strict-transport-security`, `content-security-policy`, `x-content-type-options` on all; `robots.txt` `Disallow: /`; `<meta name="robots" content="noindex">` and `<html lang="sr-Latn">` on `/` | 2026-11-04 |


## History
- 2026-11-02: plan created.
- 2026-11-03: M00-02 done (Astro 7.4.5 in `site/`, pinned, README); PR #6 opened.
- 2026-11-03: M00-01 done, G0 go (D23).
- 2026-11-03: M00-03 to M00-07 and M00-09 built and pushed to `main`; CI green.
- 2026-11-04: M00-08 part done: Worker deployed to the temporary workers.dev address (D36); CI previews open.
