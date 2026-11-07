# M13 QA and launch

| | |
|---|---|
| Owner | Srdjan + Filip |
| Needs first | all modules |
| Size | M |
| Specs | testing/gates.md |
| Branch | `feature/m13-launch` |

## Goal
The whole site passes the gates and goes live on astromicroscope.com without losing what the old site had.

## Scope
- In: Site-wide checks, redirects, DNS, Search Console, monitoring
- Out: New features

## Inputs
M02 URL map; A1, A2

## Deliverables
Redirects file, DNS records, `status/log.md` entries

## Tasks
| ID | Task | Notes |
|---|---|---|
| M13-01 | Full crawl in both languages: status codes, canonicals, hreflang, orphans | **done:** `crawl --mode production --strict` → 74 pages, 0 failures, 0 warnings (2026-11-07) |
| M13-02 | Redirects from old URLs (M02 map); 410 for spam URLs (A2) | **done:** the redirects file is `site/public/_redirects`; the 410 is **D59** (the Worker answers the 143 spam URLs; `_redirects` cannot return 410); check: `npm run check:redirects -- <url> --gone` (D46) and the smoke test's spam-URL check |
| M13-03 | DNS moved to Filip's Cloudflare account; custom domain on the Worker; HTTPS; one host; DNSSEC | **D54: no fixed date** — as soon as a fresh Cloudflare token + Hostinger nameserver paste exist. The registrar transfer to Cloudflare is separate and scheduled for 2026-11-29 (optional for launch) |
| M13-04 | Search Console and Bing Webmaster Tools; sitemap submitted; security issues checked | dashboard task for Filip: **issue #65** (Domain property via a TXT record in Cloudflare; the HTML-tag alternative is a code change for Srdjan). Specs: `specs/09` §6–7, `specs/06` Measurement |
| M13-05 | Launch checklist: content, performance, accessibility, security (`testing/checklists/security.md`) | live smoke test: `npm run smoke -- <url> --mode production` (D46) |
| M13-06 | Search Console: Security issues, Manual actions, removal of spam URLs; monitoring set up (`specs/09` §6–7) | part of **issue #65** (screenshots of Security issues and Manual actions first; a Review request goes together with Srdjan); spam URLs are below (M13-02) |
| M13-07 | Run the launch checks once by hand: the strict production audit (`SITE_ENV=production npm run build && SEO_STRICT=1 npm run test:seo`) and the three-browser check (`VISUAL_BROWSERS=chromium,firefox,webkit npm run test:axe`); the `PRODUCTION_AUDIT`/`FULL_BROWSER_CHECK` variables no longer do anything (D56). Deploy the production build to the custom domain (`site-deploy` with `production: true`) and keep the smoke test of that address green | the weekly smoke test and the deploy's smoke test fail on the production address until the production build is the one deployed |

## Acceptance criteria
- [ ] All gates G2–G5 recorded
- [ ] No placeholder left
- [ ] Search Console without new errors after 7 days
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Domain (A1); hacked-site history (A2)
