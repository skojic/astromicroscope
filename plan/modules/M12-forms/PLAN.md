# M12 Forms and integrations

| | |
|---|---|
| Owner | Srdjan |
| Needs first | M00, P02b |
| Size | M |
| Specs | specs/03, specs/08 |
| Branch | `feature/m12-forms` |

## Goal
Newsletter sign-up, contact and analysis-request forms that actually send, with consent and spam protection.

## Scope
- In: Endpoints, provider integration, success/error states
- Out: Payments (A7)

## Inputs
Decision P02b (newsletter provider, form handling); questionnaire 20–23

## Deliverables
`site/functions/`, `site/src/components/sections/newsletter/`, `site/src/i18n/newsletter.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M12-01 | Choose and set up form handling on Cloudflare (check current options) |  |
| M12-02 | Newsletter with double opt-in |  |
| M12-03 | Contact and analysis-request sending |  |
| M12-04 | Spam protection without blocking keyboard users |  |

## Acceptance criteria
- [ ] Forms work without JavaScript
- [ ] Consent text approved
- [ ] Test messages arrive
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Provider choice; email deliverability from a gmail address


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
