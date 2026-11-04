# M00 Foundation

| | |
|---|---|
| Owner | Srdjan |
| Needs first | Phase 0 decisions |
| Size | L |
| Specs | specs/03, specs/05, specs/07, specs/09, plan/contracts.md |
| Branch | `feature/m00-foundation` |

## Goal
A working Astro project in `site/` that every other module builds on: SR/EN routing, base layout, brand tokens and fonts, content schemas, CI checks, security headers and preview deploys on Filip's Cloudflare account.

## Scope
- In: Project setup, routing, layout skeleton, schemas, CI, deploys
- Out: Any page content or section design

## Inputs
`plan/contracts.md`; `brand/tokens/tokens.css`, `brand/fonts/`; D09

## Deliverables
`site/` scaffold, `astro.config.*`, `src/styles/`, `src/layouts/`, `src/content.config.*`, `src/i18n/core.ts`, `src/components/ui/`, `.github/workflows/site-ci.yml`, Cloudflare Worker (static assets) on Filip's account

## Tasks
| ID | Task | Notes |
|---|---|---|
| M00-01 | Check `contracts.md` against the installed Astro version (APIs, file names) and correct it first | before Filip starts templates |
| M00-02 | Create the Astro project in `site/`, pin versions, document `npm` commands in `site/README.md` |  |
| M00-03 | SR at `/`, EN at `/en/`: routing and language helpers |  |
| M00-04 | Import brand tokens and fonts; reduce Newsreader weight (instance or subset) to meet `specs/07` | C5 |
| M00-05 | Content collection schemas from `contracts.md` §3, including a build failure on missing translations and `[placeholder]` in production |  |
| M00-06 | Base and Page layouts with the props from `contracts.md` §5; `ui/` buttons, links, cards, `Pending.astro` |  |
| M00-07 | CI: build, HTML validation, axe, Lighthouse budgets on every pull request |  |
| M00-08 | Hosting on **Filip's Cloudflare account** (2FA on, Srdjan as member): Worker with static assets (Cloudflare Pages is now part of Workers, per wrangler 4.151 and Cloudflare docs of 2026-10-12); preview URL per pull request; deploy from CI with a token limited to this Worker | D16 |
| M00-09 | Security headers via `_headers` (`specs/09` §4); previews `noindex` | D15 |
| M00-10 | Turn on Dependabot security updates; pin third-party actions to commit SHAs | `specs/09` §3 |

## Acceptance criteria
- [x] `npm run build` passes; SR and EN demo pages render
- [x] CI runs on a pull request and reports axe and Lighthouse results (PR #12: `site` job green)
- [x] Preview URL per pull request (PR #12: comment `Pregled / Preview`, 200, noindex, deleted on close)
- [x] `contracts.md` confirmed or corrected (PR #8); Filip notified in the M00 report, "Requests to other modules" (his acknowledgement is not recorded)
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Astro major-version changes; Cloudflare account access on Filip's side; Astro adapter support for Workers static assets (check in M00-01); Lighthouse results vary between runs (use median of 3)
