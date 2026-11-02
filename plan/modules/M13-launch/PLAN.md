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
| M13-01 | Full crawl in both languages: status codes, canonicals, hreflang, orphans |  |
| M13-02 | Redirects from old URLs (M02 map); 410 for spam URLs (A2) |  |
| M13-03 | DNS to Cloudflare Pages; HTTPS; one host |  |
| M13-04 | Search Console and Bing Webmaster Tools; sitemap submitted; security issues checked |  |
| M13-05 | Launch checklist: content, performance, accessibility |  |

## Acceptance criteria
- [ ] All gates G2–G5 recorded
- [ ] No placeholder left
- [ ] Search Console without new errors after 7 days
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Domain (A1); hacked-site history (A2)
