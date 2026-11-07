# Plan: stronger website protection without touching Lighthouse

Date: 2026-11-07 · Owner of the plan: Srdjan · Written after measuring the live site and the Cloudflare zone
Scope: what protects the site, what is missing, and what to add — with the rule that nothing below may cost a Lighthouse performance point on `/` or `/en/`.

## 1. What is left (everything else)

| Item | Status |
|---|---|
| **Issue #65 — Search Console + Bing** (M13-04, M13-06): verify the domain, submit the sitemap, screenshot Security issues / Manual actions, turn on the alerts | with Filip |
| **M13-07**: the strict production audit and the three-browser check, once by hand | not run |
| **M13-05**: the launch checklists (content, performance, security) once | not run |
| **M04** is still `testing`: the Rich Results Test on Article/ProfilePage was never run by hand | small |
| **Registrar transfer to Cloudflare 2026-11-29** (optional, not a blocker) | scheduled |
| **Serbian confirmation email** for the newsletter needs a MailerLite paid plan | Gorica |

Nothing is missing in the repo: no open PR, no open issue other than #65, every merge deploys automatically (D60) and `main` is clean.

## 2. The security test: what Lighthouse measures

Lighthouse 13 (mobile, throttled) scores performance from four lab metrics: **LCP ≤ 2.0 s**, **CLS ≤ 0.05**, **TBT ≤ 150 ms**, **total bytes ≤ 400 KB** (the budgets in `lighthouserc.live.json`). Measured on production today after the edge rate limit below: **performance 0.99, LCP 1.61 s, CLS 0, TBT 0**.

So the rule for this plan is simple:
- **No JavaScript may be added to a page.** JS costs TBT, and TBT is where a perfect score is lost.
- **No external script, stylesheet or font may be added** to the first load (CSP is hash-pinned; one third-party script means a looser CSP and more bytes).
- **Pages stay static** (served from the assets). CSP, HSTS, X-Content-Type-Options and the other headers are set on the CDN edge and at the Worker — a header costs nothing.
- No challenge, CAPTCHA or JS-based bot check in front of the pages.

Everything below follows that rule. Where a measure would break it, the plan says so and leaves it out.

## 3. What is already on (verified from the live site today)

| Layer | State |
|---|---|
| Static site (no WordPress, no PHP, no login) | on. The only server code is the Worker's four `/api/*` routes |
| Security headers on the edge: HSTS 1 year incl. subdomains, CSP (`frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `img-src 'self' data:`, `font-src 'self'`) + Astro's hash-pinned `script-src` meta, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | on, every page |
| TLS: 1.2 minimum, TLS 1.3, always-HTTPS, Automatic HTTPS Rewrites | on |
| `www` → apex 301; old URLs 301; 143 spam URLs 410 from the Worker | on |
| DNSSEC (at Cloudflare, DS record at Hostinger still missing) | partly |
| Cloudflare: Browser Integrity Check, Security Level medium, DDoS L7 (free managed ruleset) | on |
| Edge rate limit on `/api/` — **10 requests / 10 s per IP** (free plan) | **added today**; tested: request 11 answers 429, pages unaffected, form works after the window |
| Worker form defences: signed 3 s–1 h challenge (HMAC-SHA-256), honeypot, server-side validation, per-IP KV counter (5/min), generic errors | on |
| Pull requests: `ci-gate` + `branch-name`, CODEOWNERS, squash-only, no force-push / no deletion; Dependabot alerts, secret scanning + push protection | on |
| Auto-deploy: every green push to `main` → production → smoke test of the production address | on (D60) |

## 4. What is missing, and what to add

Priority: **P0** = do now, low effort; **P1** = next; **P2** = later / needs a decision.

| # | Measure | Priority | Effort | Lighthouse effect |
|---|---|---|---|---|
| S1 | **Rate limit the two write endpoints** (`POST /api/newsletter`, `GET /api/confirm`) with the same free-plan rules — the `/api/form-token` limit is in place, the write paths are what spam costs | P0 | 10 min, API only | none |
| S2 | **HSTS `preload`** on: add `preload` to the header and submit the domain to the preload list — a browser-only protection for every first visit | P0 | 1 h + weeks of propagation | none |
| S3 | **Bot protection for AI crawlers**: `crawler_protection` (off today) plus the AI-bot settings in the zone — D37 allows AI crawlers; decide which stay allowed | P0 | 1 dashboards setting | none |
| S4 | **2FA on the accounts** (Cloudflare, GitHub, registrar, MailerLite, email) — the real attack surface now; the plan tracks it in `specs/09` §2 | P0 | human | none |
| S5 | **DS record for DNSSEC at Hostinger** — the zone has DNSSEC, the chain is incomplete without it | P0 | 15 min (Hostinger) | none |
| S6 | **Secret scanning non-provider patterns + validity checks** (off today) | P1 | 2 clicks | none |
| S7 | **Repo-level: private vulnerability reporting** and "require last-push approval" on the ruleset | P1 | 10 min | none |
| S8 | **Email authentication: SPF, DKIM, DMARC** — SPF is there (`~all`), **DMARC and DKIM are missing**: without them anyone can send mail as `@astromicroscope.com` (phishing under the brand name). Add a DNS TXT (`p=none` → `p=quarantine`) and the Cloudflare Email Routing DKIM | P1 | 1 h, DNS | none |
| S9 | **The Worker's own 410/404 path**: keep the `run_worker_first` route tight so the Worker still answers only what it must (it already does — pages go straight to the assets) | P1 | — | none |
| S10 | **Security.txt** at `/.well-known/security.txt` with a contact address | P2 | 10 min | none |
| S11 | **Cloudflare managed WAF rules** for the `/api/*` paths on the free plan (only on request — the plan's free WAF is limited) | P2 | unknown | none |
| S12 | **Uptime check** of the home page (specs/09 §7). Use Cloudflare Notifications / health-check or an external monitor. A JS-free external ping costs nothing | P1 | 30 min | none |
| S13 | **Daily smoke test is now production-only** (D60) — a second, separate check that the form still creates a subscriber is worth having (a real sign-up once a month, or a synthetic one with a disposable address) | P2 | manual | none |
| S14 | **Bot Fight Mode / Under Attack Mode**: OFF. Both inject JS and challenge pages — they would cost TBT and break the perfect score; not a fit for a static site with no login | — | — | **would break it — do not use** |

## 5. What we will *not* do (protection that costs the score)

| Idea | Why not |
|---|---|
| CAPTCHA / Turnstile on the forms | Third-party script + extra bytes on the form page → CSP loosening, TBT risk |
| JS bot challenge (Bot Fight Mode, JS Detections) | inflates TBT and LCP on first load |
| Cloudflare "Under Attack" mode | interstitial page + JS |
| Service Worker / client-side SRI reload | more JS, no measurable security gain here |
| A "security" script on the page (WAF-injected JS) | same as above |

If the site ever needs a real challenge, it should sit **only on `/api/*`** (no page JS), which is the shape of S1.

## 6. Plan of work

**Phase A — this week (P0):**
1. S1 rate-limit rules for `/api/newsletter` and `/api/confirm` (same free-plan rule shape).
2. S2 HSTS preload + submission.
3. S3 AI-crawler decision applied in the zone (needs your choice: allow bots for search, block AI training?).
4. S4 2FA check on every account (you + Filip).
5. S5 DS record at Hostinger (Filip).
6. Measure: Lighthouse again on `/` and `/en/` after every change (must stay ≥ 0.99, LCP ≤ 2.0 s, CLS ≤ 0.05, TBT ≤ 150 ms).

**Phase B — next (P1):** S6, S7, S8 (DMARC/DKIM), S12 uptime check.

**Phase C — later (P2):** S10 security.txt, S11, S13.

**Verification for every item:** the live headers (`curl -sI`), the smoke test of the production address, `npm run test:lighthouse:live` (three runs, median), and one line in `status/log.md` with the numbers.

## 7. Decisions needed from you

1. **AI crawlers (D37 allows them):** keep all allowed, or block AI-training crawlers (`GPTBot`, `ClaudeBot`, …) while keeping search bots? S3 depends on it.
2. **DMARC policy:** start at `p=none` (monitor only) and move to `p=quarantine` after two weeks — or go straight to `quarantine`? S8.
3. **2FA:** which of the six accounts have it today? S4 needs a one-line answer per account (the assistant cannot see the dashboards).

## 8. Effort and effect

- The P0 set is a few hours of configuration and DNS, no code on the pages, and it closes the three real gaps (write endpoints, phishing mail, DNSSEC chain).
- Nothing in it adds a byte to a page: the perfect Lighthouse score is kept by construction, and checked after every change.
