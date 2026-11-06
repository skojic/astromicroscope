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
| M13-01 | Full crawl in both languages: status codes, canonicals, hreflang, orphans | `npm run crawl -- <url> --mode production --strict` (D46) |
| M13-02 | Redirects from old URLs (M02 map); 410 for spam URLs (A2) | the redirects file is `site/public/_redirects` (contracts.md: "redirects file"); mechanism for 410 still to decide; check: `npm run check:redirects -- <url> --gone` (D46) |
| M13-03 | DNS moved to Filip's Cloudflare account; custom domain on the Worker; HTTPS; one host; DNSSEC | **D54: no fixed date** — as soon as a fresh Cloudflare token + Hostinger nameserver paste exist. The registrar transfer to Cloudflare is separate and scheduled for 2026-11-29 (optional for launch) |
| M13-04 | Search Console and Bing Webmaster Tools; sitemap submitted; security issues checked |  |
| M13-05 | Launch checklist: content, performance, accessibility, security (`testing/checklists/security.md`) | live smoke test: `npm run smoke -- <url> --mode production` (D46) |
| M13-06 | Search Console: Security issues, Manual actions, removal of spam URLs; monitoring set up (`specs/09` §6–7) | |
| M13-07 | Set the repository variables `PRODUCTION_AUDIT=true` (D48: strict production audit) and `FULL_BROWSER_CHECK=true` (D51: full three-browser layout check) | both stay set after launch |

## Acceptance criteria
- [ ] All gates G2–G5 recorded
- [ ] No placeholder left
- [ ] Search Console without new errors after 7 days
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Domain (A1); hacked-site history (A2)
