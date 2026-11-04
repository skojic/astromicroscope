# M12 Forms and integrations

| | |
|---|---|
| Owner | Srdjan |
| Needs first | M00 (done), P02b (decided, D44) |
| Size | M |
| Specs | specs/03, specs/08 |
| Branch | `feature/m12-forms` |

## Goal
Newsletter sign-up (also the waitlist for the 2027 courses), contact and analysis-request forms that actually send, with consent and spam protection.

## Scope
- In: Endpoints, provider integration, success/error states
- Out: Payments (iteration 2)

## Inputs
Decision P02b (form handling); newsletter provider **MailerLite**, Gorica's existing account (D21); questionnaire 20–23

## Deliverables
The Worker script (path to be fixed with the `contracts.md` row, D44; not `site/functions/`, which is the Pages convention), `site/src/components/sections/newsletter/`, `site/src/i18n/newsletter.json`, forms for contact and analysis request

## Tasks
| ID | Task | Notes |
|---|---|---|
| M12-01 | Choose and set up form handling on Cloudflare (check current options) | **Done as a decision: D44.** Build: Worker script, `wrangler.jsonc` `main` and `assets.run_worker_first: ["/api/*"]` |
| M12-02 | Newsletter with double opt-in | MailerLite API from the Worker; the waitlist in its own group; double opt-in mechanism proven with the real account (D44) |
| M12-03 | Contact and analysis-request sending | Email Service binding to astromicroscope@gmail.com; real sending only after DNS is on Cloudflare; dry run before (D44) |
| M12-04 | Spam protection without blocking keyboard users | honeypot, signed timestamp, per-IP rate limit; Turnstile only if spam appears (D44) |
| M12-05 | Analytics: Cloudflare Web Analytics, loaded after the page, production build only, CSP extended; no cookie and no local storage (checked in a browser) | D44 |

## Acceptance criteria
- [ ] Forms work without JavaScript
- [ ] Consent text approved
- [ ] Test messages arrive
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Email Service needs the domain on Cloudflare (D44), so contact mail cannot be tested end to end before the DNS move; double opt-in through the MailerLite API is unproven until the real key is used; Email Service pricing and beta status not checked


## Component specs (moved from `modules/`)

### Component spec: Newsletter sign-up

#### Purpose
Collects emails for new lessons, articles and course openings.

#### Content (sr and en)
Label, email field, consent text, button, success and error messages, in both languages.

#### Structure and semantics
A `<form>` with a visible `<label>`; it works without JavaScript (server endpoint) and is enhanced with it.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
The provider's script must not load on page view; post to our own endpoint or load the script on focus.

#### Accessibility
Errors in text next to the field, announced via `aria-live`; double opt-in; consent wording checked under GDPR and the Serbian personal data law (ZZPL).

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| NEWS-01 | Form and validation | idea | |
| NEWS-02 | Provider integration (decision in specs/03) | idea | |
| NEWS-03 | Confirmation and error states | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-newsletter.
