# M00 Foundation

| | |
|---|---|
| Owner | Srdjan |
| Needs first | Phase 0 decisions |
| Size | L |
| Specs | specs/03, specs/05, specs/07, plan/contracts.md |
| Branch | `feature/m00-foundation` |

## Goal
A working Astro project in `site/` that every other module builds on: SR/EN routing, base layout, brand tokens and fonts, content schemas, CI checks and preview deploys on Cloudflare Pages.

## Scope
- In: Project setup, routing, layout skeleton, schemas, CI, deploys
- Out: Any page content or section design

## Inputs
`plan/contracts.md`; `brand/tokens/tokens.css`, `brand/fonts/`; D09

## Deliverables
`site/` scaffold, `astro.config.*`, `src/styles/`, `src/layouts/`, `src/content.config.*`, `src/i18n/core.ts`, `src/components/ui/`, `.github/workflows/site-ci.yml`, Cloudflare Pages project

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
| M00-08 | Cloudflare Pages project with preview deploys per pull request |  |

## Acceptance criteria
- [ ] `npm run build` passes; SR and EN demo pages render
- [ ] CI runs on a pull request and reports axe and Lighthouse results
- [ ] Preview URL per pull request
- [ ] `contracts.md` confirmed or corrected; Filip notified
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Astro major-version changes; Cloudflare account access; Lighthouse results vary between runs (use median of 3)
