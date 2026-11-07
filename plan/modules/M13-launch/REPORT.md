# Report: M13 QA and launch

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan + Filip |
| Branch | `feature/m13-launch` (not created yet) |
| Last commit | — |
| Last updated | 2026-11-07, Search Console done (issue #65); only the registrar transfer (M13-08) left |

## Next step
**Nothing except the registrar transfer (M13-08, 2026-11-29).** Everything else is done or dropped (Srdjan, 2026-11-07: "delete everything else left as not important except registrar transfer"). The production address serves the production build, every merge deploys itself (D60) and the deploy's smoke test is green; the strict crawl is clean; redirects and the 410 are verified; Search Console and Bing are verified with the sitemap submitted and no security issues (issue #65, Filip).
**M13-08:** transfer the domain from Hostinger to Cloudflare on 2026-11-29 (unlock, EPP code, ~$11, keep the registrant contact unchanged — ICANN 60-day rule) and add the DNSSEC DS record at the registrar once the transfer is done.

## Done
- Item, with evidence: the command run and the result line, or a PR link.
- **M13-03 nameservers (Filip, 2026-11-07, issue #48 task 1):** hPanel → Domains → astromicroscope.com → DNS / Nameservers → Change nameservers: `ns1/ns2.dns-parking.com` → `bradley.ns.cloudflare.com`, `demi.ns.cloudflare.com` (01:07). Cloudflare mail 01:10: zone active. Checked before the change: no mailbox on the domain (the business email was never claimed, hPanel shows “Claim now”), DNSSEC at Hostinger empty (no DS record), the only Hostinger DNS record was `CNAME www → astromicroscope.com` (covered by the `www` custom domain on the Worker). DS record not yet added at Hostinger.
- **Production live (2026-11-07):** `site-deploy.yml` accepts a manual dispatch `production: true` that builds with `SITE_ENV=production` and deploys to `astromicroscope.com`; run 42353260675 succeeded → `smoke: https://astromicroscope.com (production) 28/28 checks passed`. Live checks: no `x-robots-tag: noindex`, `robots.txt` allows all + sitemap. **M13-07** was set as `PRODUCTION_AUDIT=true` and `FULL_BROWSER_CHECK=true` repository variables; since D56 those variables do nothing (the checks are a manual run, see the plan) and the production deploy is what keeps the address on the production build.
- **M13-02 redirects file (PR #53):** `site/public/_redirects` maps all 28 old-URL map entries 301 to the new routes (sign pages to the flat `/horoskop/<slug>/`, removed transit articles to `/tekstovi/`, old hubs to the new ones). Astro copies `public/` into `dist/` for Cloudflare Workers static assets.
- **www→apex redirect:** `http_request_dynamic_redirect` entrypoint rule created — `www.astromicroscope.com/*` 301 to `astromicroscope.com/*` (path preserved).

## Not done
- Item (task ID from PLAN.md).
- **Deferred to final polish (Srdjan, 2026-11-04):** a light privacy notice, with no legal page (D33). Plain consent text under each form (newsletter, waitlist, contact, analysis request: what is collected, why, who processes it (MailerLite, Gorica's email), how to ask for deletion), possibly one short page linked only from those notices. Open decisions: how long analysis data is kept, page or no page, whether analytics (P02b) uses cookies, wording of the waitlist consent. The consent text itself belongs to M12 (acceptance criterion "Consent text approved"), and Gorica approves the final wording. Whether the light version meets GDPR/ZZPL is unverified.

## Problems and blockers
- Domain renewed 2026-11-03 at Hostinger until 2027-10-15 (status Active, auto-renew on, lock on). **Two separate dates (D54):** the **DNS move** (zone in Filip's Cloudflare + nameservers at Hostinger) has no fixed date and can happen any day; the **registrar transfer to Cloudflare is scheduled for 2026-11-29** (45 days after the original expiry 2026-10-15) and is not a blocker for launch. For the transfer: remove lock, get the EPP code, about $11. Source: Cloudflare, “Transfer your domain to Cloudflare” (https://developers.cloudflare.com/registrar/domain-transfers/transfer-to-cloudflare/): “If your domain recently expired and you renewed it, wait at least 45 days after the original expiration date. Otherwise, the registry may not add the extra year.” Also: no change of registrant name, organization or email in the 60 days before the transfer (ICANN 60-day lock). Read 2026-11-03. Keep the owner email (filipvicentijevic03@gmail.com) unchanged until the transfer.
- For M13-03: the Hostinger account also has a “Starter Business Email Trial” on astromicroscope.com (until 2027-08-25). If any mailbox on the domain is in use, its MX records must move with DNS, or mail stops. **Checked 2026-11-07 (Filip): no mailbox exists; the trial was never claimed, so no MX records had to move.**
- Old Premium Web Hosting is not renewed (old WordPress, hacked); backup taken 2026-11-02, kept offline, not in the repo.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|

## History
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
