# Report: M12 Forms and integrations

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan |
| Branch | `feature/m12-forms` (not created yet) |
| Last commit | — |
| Last updated | 2026-11-04 |

## Next step
M12-01 scaffold is on a local branch (not pushed). Continue: finish the client half of the signed timestamp + honeypot (M12-04), then M12-02 (MailerLite) with a real API key as a Worker secret, then M12-03 (Email Service) once the domain's DNS is on Cloudflare (M13). Read `PLAN.md` and `plan/contracts.md` before extending.

## Done
- 2026-11-04, M12-01 scaffold (D44): `site/src/worker/index.ts` — a Worker `fetch` that answers only `/api/` paths (wrangler `main` and `assets.run_worker_first: ["/api/*"]`), with a `/api/newsletter` endpoint that validates JSON, rejects the honeypot, checks a signed timestamp and an HMAC-SHA-256 signature, validates the email and the list/lang, and rate-limits per IP (stub Map); provider calls left as marked TO DO. `site/wrangler.jsonc` now sets `main` to the script and `run_worker_first` to `["/api/*"]`. i18n strings in `site/src/i18n/newsletter.{json,ts}` and a `site/src/components/sections/newsletter/HomeSection.astro` form (posts to `/api/newsletter`, no-JS, enhanced later). Evidence: `npm run build` → 18 pages, exit 0; the worker bundles clean under esbuild; `wrangler deploy --dry-run` reads config without error.

## Not done
- M12-02: MailerLite subscriber call (needs `MAILERLITE_API_KEY` Worker secret; double opt-in unproven, D44).
- M12-03: contact and analysis-request email (needs the domain on Cloudflare for real send; dry run before).
- M12-04: client half of the signature/honeypot, real rate-limit store (KV/DO) instead of the Map stub.
- M12-05: Cloudflare Web Analytics (production build only, CSP check).
- Consent copy not yet approved by Gorica (acceptance criterion).

## Problems and blockers
- Real contact mail waits on DNS on Cloudflare (M13, from ~2026-11-29).
- MailerLite double opt-in via API is unproven until the real key is used (D44).
- The unsigned form is rejected by the server until M12-04's client script ships; the form posts but does not succeed yet.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To M05: the home page will pick up `components/sections/newsletter/HomeSection.astro` automatically via `Sections.astro` once it exists (nothing to do).

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm run build` | 18 page(s) built, exit 0 | 2026-11-04 |
| `esbuild src/worker/index.ts --bundle` | bundles to 3.1 KB, exit 0 | 2026-11-04 |
| `wrangler deploy --dry-run` | reads config, no error | 2026-11-04 |

## History
- 2026-11-02: plan created.
- 2026-11-04: M12-01 scaffold built (Worker script, wrangler wiring, i18n, section component).
