# Report: M13 QA and launch

| | |
|---|---|
| Stage | idea |
| Last gate passed | none |
| Owner | Srdjan + Filip |
| Branch | `feature/m13-launch` (not created yet) |
| Last commit | — |
| Last updated | 2026-11-07, DNS dates recorded (D54) |

## Next step
Not started. Wait for: all modules. Then read `PLAN.md` and `plan/contracts.md`, create the branch, and start with task M13-01.
**DNS (D54):** the Cloudflare side of the DNS move (M13-03) is **done (2026-11-07)** — zone `astromicroscope.com` (`f3f47cce36e960f4007f11f80e7dceaa`, pending) in Filip's account, custom domains `astromicroscope.com` + `www` on the Worker, HTTPS/TLS/HSTS and DNSSEC on, Email Routing destination `astromicroscope@gmail.com` added (unverified). Left: paste `bradley.ns.cloudflare.com` / `demi.ns.cloudflare.com` at Hostinger and click the verification email; then enable Email Routing + catch-all. The **registrar transfer to Cloudflare is scheduled for 2026-11-29** and is optional for launch: the site works on Cloudflare DNS with the registrar still at Hostinger. Do not wait for the 29th to do DNS-dependent work (M12-03, custom domain, double-opt-in proof).

## Done
- Item, with evidence: the command run and the result line, or a PR link.

## Not done
- Item (task ID from PLAN.md).
- **Deferred to final polish (Srdjan, 2026-11-04):** a light privacy notice, with no legal page (D33). Plain consent text under each form (newsletter, waitlist, contact, analysis request: what is collected, why, who processes it (MailerLite, Gorica's email), how to ask for deletion), possibly one short page linked only from those notices. Open decisions: how long analysis data is kept, page or no page, whether analytics (P02b) uses cookies, wording of the waitlist consent. The consent text itself belongs to M12 (acceptance criterion "Consent text approved"), and Gorica approves the final wording. Whether the light version meets GDPR/ZZPL is unverified.

## Problems and blockers
- Domain renewed 2026-11-03 at Hostinger until 2027-10-15 (status Active, auto-renew on, lock on). **Two separate dates (D54):** the **DNS move** (zone in Filip's Cloudflare + nameservers at Hostinger) has no fixed date and can happen any day; the **registrar transfer to Cloudflare is scheduled for 2026-11-29** (45 days after the original expiry 2026-10-15) and is not a blocker for launch. For the transfer: remove lock, get the EPP code, about $11. Source: Cloudflare, “Transfer your domain to Cloudflare” (https://developers.cloudflare.com/registrar/domain-transfers/transfer-to-cloudflare/): “If your domain recently expired and you renewed it, wait at least 45 days after the original expiration date. Otherwise, the registry may not add the extra year.” Also: no change of registrant name, organization or email in the 60 days before the transfer (ICANN 60-day lock). Read 2026-11-03. Keep the owner email (filipvicentijevic03@gmail.com) unchanged until the transfer.
- For M13-03: the Hostinger account also has a “Starter Business Email Trial” on astromicroscope.com (until 2027-08-25). If any mailbox on the domain is in use, its MX records must move with DNS, or mail stops. To check with Gorica.
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
