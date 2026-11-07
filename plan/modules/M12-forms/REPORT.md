# Report: M12 Forms and integrations

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan |
| Branch | `feature/m12-forms` (pushed 2026-11-04; M12-04 on a follow-up) |
| Last commit | — |
| Last updated | 2026-11-07 |

## Next step
M12-01, M12-02, M12-03, M12-04 and M12-05 are built; the **consent wording is approved (D53)**. **M12-03 is live (2026-11-07):** the worker sends the double-opt-in email through Cloudflare Email Service (`EMAIL_SENDER` binding, from `noreply@astromicroscope.com`), and the binding is deployed. **Live proof (2026-11-07):** a real submission to `https://astromicroscope.com/api/newsletter` returned `{"ok":true}` and the subscriber landed in MailerLite as `unconfirmed` (id `203464437587248364`, deleted after the test); `/api/confirm` rejects invalid/missing tokens. The one piece not verifiable from here is the email arriving in a real inbox (needs a real address) — the send is best-effort and the subscriber stays `unconfirmed` until the link is clicked. Remaining: a human clicks a real confirmation email to close the loop, then G1.

## Done
- 2026-11-07, **newsletter form fixed (the "something went wrong" error)**: the client fetched `/api/form-token` inside the submit handler, so the challenge was ~0 ms old while the server requires ≥ 3 s (`isFreshTimestamp`) — every real browser submission was rejected. The token is now fetched on page load and refreshed if older than 50 min. `visual.mjs` ignores `/api/*` 404s (the API is on the Worker, not in the static `dist/`). Evidence: PR #55; a live Chromium run on `astromicroscope.com` showed the success text ("Hvala! Proveri inbox za potvrdu prijave."), the subscriber landed `unconfirmed` in MailerLite (deleted after the test), no console errors.
- 2026-11-04, M12-01 scaffold (D44): `site/src/worker/index.ts` — a Worker `fetch` that answers only `/api/` paths (wrangler `main` and `assets.run_worker_first: ["/api/*"]`), with a `/api/newsletter` endpoint that validates JSON, rejects the honeypot, checks a signed timestamp and an HMAC-SHA-256 signature, validates the email and the list/lang, and rate-limits per IP (stub Map); provider calls left as marked TO DO. `site/wrangler.jsonc` now sets `main` to the script and `run_worker_first` to `["/api/*"]`. i18n strings in `site/src/i18n/newsletter.{json,ts}` and a `site/src/components/sections/newsletter/HomeSection.astro` form. Evidence: `npm run build` → 18 pages, exit 0; the worker bundles clean under esbuild; `wrangler deploy --dry-run` reads config without error.
- 2026-11-04, M12-04 client half (D44): reworked the challenge to a **stateless signed form token** that keeps the form working without JavaScript and never ships the secret to the browser. `GET /api/form-token` now mints `{ ts, sig }` where `sig = HMAC-SHA-256('astromicroscope-form-v1' + '|' + ts)` under the Worker secret `FORM_SIGNING_SECRET`; the newsletter endpoint verifies that signature (no email binding), and the honeypot stays. `HomeSection.astro` now has the client script: fetch a fresh token, fill the hidden `ts`/`sig` fields, keep `hp` empty, submit as JSON, and show the translated success/error message (from `data-messages`). The rate-limit Map is still a stub (promoted to KV/DO before launch). Evidence: `npm run build` 18 pages exit 0; worker bundles clean (esbuild 3.5 KB); `npm test` 37 pass.
- 2026-11-04, M12-02 MailerLite subscriber call (D44): `mailerLiteSubscribe` in the Worker POSTs to `https://connect.mailerlite.com/api/subscribers` with `Authorization: Bearer <MAILERLITE_API_KEY>`, `groups: [<group id>]`, `status: "unconfirmed"`. The account is on the newer Developer API (both `connect.mailerlite.com` v2 and the classic `api.mailerlite.com` v1 answered with `Authorization: Bearer` / `X-MailerLite-ApiKey` on 2026-11-04). Live groups found and stored as Worker secrets: `MAILERLITE_GROUP_NEWSLETTER` = `196782570813261481` ("Astro Microscope", 37 active), `MAILERLITE_GROUP_WAITLIST` = `203228920135288545` ("Lista čekanja – kursevi", 0 active). The token, group ids and signing secret are in the macOS keychain (`mailerlite-astromicroscope`, `mailerlite-group-*`, `cloudflare-astromicroscope`) and as Worker secrets — never in the repo. A missing secret or non-production build short-circuits without a network call; a provider failure answers generically so the visitor learns nothing. Evidence: `npm run build` 18 pages exit 0; worker bundles clean (esbuild 4.2 KB).
- 2026-11-04, M12-05 Cloudflare Web Analytics (D44): `components/sections/newsletter/WebAnalytics.astro` renders a `defer`-loaded, cookieless `static.cloudflareinsights.com/beacon.min.js` with a `data-cf-beacon` token, only when `SITE_ENV === 'production'` AND `PUBLIC_CF_WEB_ANALYTICS_TOKEN` is set (never hardcoded). CSP: `script-src 'self' https://static.cloudflareinsights.com` (via Astro `security.csp.scriptDirective.resources`) and `connect-src ... https://static.cloudflareinsights.com` (header). Evidence: preview build has no beacon (grep none); the built `<meta>` CSP includes the host; `npm run build` 18 pages; `npm test` pass; `check-docs` 0 problems.
- 2026-11-06, M12-04 **rate-limit store** promoted to KV: `underRateLimit` now uses the `RATE_STORE` KV namespace (binding in `wrangler.jsonc`, id `3a4d42d289ea46ae83fd4b2aa96a1d42`), a fixed-window per-IP counter with a short TTL (best-effort: a KV read/write failure lets the request through so it never blocks the form). Evidence: worker bundles clean (esbuild 6.7 KB); `wrangler deploy --dry-run` shows `env.RATE_STORE` bound; `npm run build` 76 pages; html/axe/seo/visual pass.

## Not done
- M12-02 double opt-in (D47): built — `/api/confirm` endpoint, signed token, and KV store (`CONFIRM_STORE`). The **email send is a marked TODO** that activates only after Email Service (M12-03) is live post-DNS; until then subscribers stay `unconfirmed` (silent but safe).
- M12-03: contact and analysis-request email (needs the domain on Cloudflare for real send; dry run before).
- M12-05: the Web Analytics **site was created in the dashboard and the token wired** — `PUBLIC_CF_WEB_ANALYTICS_TOKEN` set as a repo secret (`a04…822`, not secret, D44) and exported in the `site-ci` production SEO-audit step so the production build embeds the beacon. Note: the live preview deploy is non-production (D36) so the beacon will not fire there — it activates only when the production build runs at launch (M13); the launch deploy step must export the same secret. Consent copy not yet approved by Gorica (acceptance criterion).

## Problems and blockers
- Real contact mail waits on the **DNS move** (D54: no fixed date — as soon as a fresh Cloudflare token and the Hostinger nameserver paste exist; **not** the 2026-11-29 registrar transfer, which is a separate, optional step); the double-opt-in email depends on the same (M12-03).
- `FORM_SIGNING_SECRET`, `MAILERLITE_API_KEY` and the two group-id secrets exist as Worker secrets (not in the repo): done.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To M05: the home page will pick up `components/sections/newsletter/HomeSection.astro` automatically via `Sections.astro` once it exists (nothing to do).

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm run build` | 18 page(s) built, exit 0 | 2026-11-04 |
| `esbuild src/worker/index.ts --bundle` | bundles to 3.5 KB, exit 0 | 2026-11-04 |
| `wrangler deploy --dry-run` | reads config, no error | 2026-11-04 |
| `npm test` | 37 pass, 0 fail | 2026-11-04 |

## History
- 2026-11-02: plan created.
- 2026-11-04: M12-01 scaffold built (Worker script, wrangler wiring, i18n, section component).
- 2026-11-04: M12-04 client half built (signed form token, client script, success/error states).
