---
id: SPEC-09
title: Security
status: draft
updated: 2026-11-02
---

# Security

The old WordPress site was compromised: about 140 casino spam posts were injected from June 2026 (`docs/sadrzaj/stari-sajt/README.md`). How the attackers got in is not known; the backup was not analysed for the cause. This spec makes the new site much harder to attack and makes any problem visible quickly.

## 1. Architecture: remove what was attacked
- **No WordPress, no PHP, no database, no admin login on the website.** The site is static HTML built by Astro (D09). There is nothing on the server for an attacker to log in to or inject into.
- The only server code is the form handling in M12 (Cloudflare). It validates every field on the server, stores nothing it does not need, and has its own spam protection.
- The old site is **never restored**, and its backup is never uploaded anywhere or added to the repository.

## 2. Accounts: the real attack surface now
Whoever controls these accounts controls the site. Each one needs a strong unique password (a password manager). **Two-factor authentication is not part of this project and is not asked for anywhere** (D62: Srdjan, "2FA - stop asking for that, it will not happen, remove the ask"). The security work goes into what the site itself controls: DNS, DNS records that cannot be forged (DNSSEC), the edge (rate limits, bot directory), the headers and the API. The state table below is history; no action on it is expected.

The table is history (state on 2026-11-02); **no action on 2FA is expected** (D62).

| Account | Who | Then | Done since |
|---|---|---|---|
| GitHub `skojic` (owner) | Srdjan | 2FA on | — |
| GitHub `filipvicentijevic99` | Filip | unknown | — |
| Cloudflare account that hosts the site | Filip (D16) | did not exist yet | created, zone active, the site on it; Srdjan is a member; API tokens limited to the account |
| Domain registrar (Hostinger) | Gorica / Srdjan | domain expired | renewed to 2027-10-15, auto-renew on, lock on; **transfer to Cloudflare 2026-11-29** (M13-08, D54) |
| Old Hostinger hosting, WordPress | — | expired, compromised | gone; the old site is never restored |
| Email astromicroscope@gmail.com | Gorica | unknown | Email Routing live (catch-all to the inbox) |
| Instagram, YouTube @astromicroscope | Gorica | unknown | — |

When someone leaves the project: remove their GitHub access, Cloudflare membership and any tokens on the same day.

## 3. Repository (GitHub)
Already on (checked 2026-11-02):
- `main` protected by ruleset: pull requests, owner approval, required checks, no force push or deletion (D07).
- Secret scanning and push protection: a push containing a known secret type is blocked.
- Dependabot alerts (turned on 2026-11-02): warnings about vulnerable npm packages.
- GitHub Actions: default token is read-only and cannot approve pull requests.

Rules:
- **No secrets in the repository**, ever: API tokens, passwords and keys live in Cloudflare secrets and GitHub Actions secrets.
- Workflows use the smallest permissions they need; third-party actions are pinned to a full commit SHA.
- Dependabot security updates are turned on in M00, once `site/` exists, together with an exception in the branch-name check for `dependabot/` branches.
- The lock file is committed; CI installs with `npm ci`.

## 4. Website (HTTP headers and content)
Set in M00 (and checked in M13) through the hosting's `_headers` file:
- `Content-Security-Policy` that allows only our own scripts, styles, fonts and images (plus anything a decision explicitly allows, such as YouTube thumbnails); `frame-ancestors 'none'`; `object-src 'none'`.
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` that turns off camera, microphone, geolocation and payment.
- HTTPS only; one host; no mixed content.
- Third-party scripts only with a decision entry; analytics loaded after the page.
- Forms: server-side validation, rate limiting and an anti-spam challenge that works with the keyboard (M12).
- Preview builds send `X-Robots-Tag: noindex` so unfinished versions never appear in Google.

## 5. Domain and DNS
- Renew now, then turn on auto-renew and registrar lock.
- DNS moves to the Cloudflare account that hosts the site (needed for a custom domain on Workers).
- DNSSEC on after the move.
- SPF is on (`v=spf1 include:_spf.mx.cloudflare.net ~all`, set by Email Routing). **DMARC and DKIM are not adopted** (withdrawn with the security hardening plan, D61/D62): a DNS record change outside the plan.

## 6. Cleaning up after the old site (M13)
- After the domain points to the new site: add it to Google Search Console, check **Security issues** and **Manual actions**, and submit the new sitemap.
- Return **410 Gone** for every spam URL (list from the old database, prepared by Filip) and 301 redirects for the real old pages (M02 map).
- Use the Search Console removal tool for spam URLs that still show in results.

## 7. Watching for problems
- Search Console email alerts for security issues and indexing spikes.
- An uptime check on the home page (choose a free service in M13).
- GitHub notifications for Dependabot and secret-scanning alerts go to Srdjan.
- Monthly: review account access, open alerts and Search Console coverage; one line in `status/log.md`.

## 8. If something happens
1. Revoke the affected credential (token, password, session) first.
2. Roll back to the last good deployment (hosting keeps previous versions) or revert the commit.
3. Find the cause; write it in `status/log.md`; fix; record a decision if a rule changes.
