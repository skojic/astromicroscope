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
| M13-02 | Redirects from old URLs (M02 map); 410 for spam URLs (A2) | **done:** the redirects file is `site/public/_redirects`; the 410 is **D59** (the Worker answers the 143 spam URLs; `_redirects` cannot return 410) |
| M13-03 | DNS moved to Filip's Cloudflare account; custom domain on the Worker; HTTPS; one host; DNSSEC | **done** (D54): zone active on Cloudflare, custom domain and `www`, HTTPS/TLS/HSTS, DNSSEC on. **The DS record at the registrar is the remaining part and rides on M13-08.** |
| M13-04 | Search Console and Bing Webmaster Tools; sitemap submitted; security issues checked | **done 2026-11-07 (issue #65, Filip):** Domain property verified (TXT in Cloudflare), Manual actions and Security issues clean, the 4 spam sitemaps of the hacked site removed, `sitemap.xml` submitted (74 pages, Success), email alerts on, Bing imported |
| M13-05 | Launch checklist: content, performance, accessibility, security | **dropped** (Srdjan, 2026-11-07: "not important") — the per-module G1 evidence and the automated `site-ci` checks cover it |
| M13-06 | Search Console: Security issues, Manual actions, removal of spam URLs | **done** with M13-04 (issue #65): clean, spam sitemaps removed, spam URLs answer 410 (D59) |
| M13-07 | Strict production audit and the three-browser check, once by hand | **dropped** (Srdjan, 2026-11-07: "not important") — the deploy's smoke test and the weekly Lighthouse on production are the standing checks (D60) |
| M13-08 | **Registrar transfer to Cloudflare — 2026-11-29** (45 days after the original expiry 2026-10-15, D54/A1), and the DNSSEC DS record at the registrar | the one launch item left. Optional for the site to work; keeps the domain off Hostinger. Preparation: unlock, EPP code, $11 |

## Acceptance criteria
- [x] The site is live on the custom domain as the production build (D60) and the deploy's smoke test is green
- [x] The strict crawl is clean; redirects and the 410 verified; Search Console and Bing verified, sitemap submitted, no security issues or manual actions
- [ ] **The registrar transfer (M13-08) is done on 2026-11-29** — the one open item of M13 (Srdjan: "delete everything else left as not important except registrar transfer")

## Risks
Domain (A1); hacked-site history (A2)
