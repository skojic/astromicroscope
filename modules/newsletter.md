---
id: MOD-newsletter
title: Newsletter sign-up
stage: idea
gate: none
specs: [SPEC-03, SPEC-08]
updated: 2026-11-02
---

# Newsletter sign-up

## Purpose
Collects emails for new lessons, articles and course openings.

## Content (sr and en)
Label, email field, consent text, button, success and error messages, in both languages.

## Structure and semantics
A `<form>` with a visible `<label>`; it works without JavaScript (server endpoint) and is enhanced with it.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
The provider's script must not load on page view; post to our own endpoint or load the script on focus.

## Accessibility
Errors in text next to the field, announced via `aria-live`; double opt-in; consent wording checked under GDPR and the Serbian personal data law (ZZPL).

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| NEWS-01 | Form and validation | idea | |
| NEWS-02 | Provider integration (decision in specs/03) | idea | |
| NEWS-03 | Confirmation and error states | idea | |

## Tests
See `testing/test-plan.md`, row MOD-newsletter.
