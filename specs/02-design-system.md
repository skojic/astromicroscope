---
id: SPEC-02
title: Design system
status: approved
updated: 2026-11-02
---

# Design system

**Direction D, Midnight Lens**, chosen by Gorica on 2026-11-02 (`status/decisions.md`, D08). The other directions were removed.

**The brand kit in `brand/` is the source of truth.** When a task says “use the brand kit” (or “koristi brending kit”), it means everything below. Never copy values by hand and never use anything from the removed directions.

| What | Where |
|---|---|
| Rules: logo, colour, contrast, type, elements, components, motion, photography, social, voice | `brand/index.html` (SR/EN) |
| Approved home page layout | `brand/home-reference.html` |
| Design tokens (colours, type, space, shape, motion) | `brand/tokens/tokens.css` (import this), `brand/tokens/tokens.json` |
| Fonts (self-hosted, Latin + Latin Extended, SIL OFL 1.1) | `brand/fonts/` + `brand/fonts/fonts.css` |
| Logo (SVG + PNG exports, favicons, avatar) | `brand/logo/` |
| Social templates (Instagram, YouTube) | `brand/social/` |

## Summary
- **Colour:** white `#FFFFFF` and soft beige `#F3ECE2` carry about two thirds of a layout; ice blue `#DCE7F4`, Uranus blue `#2E5BA6` (actions on light), Midnight `#0E1450` (night-sky hero, footer); gold `#D4AF5C` only for the logo, stars and hairlines; ink `#141A33` for text; `#8A6A2A` for small gold text on white.
- **Contrast:** computed per pair in `brand/index.html`. Gold on white (2.08:1) and on beige (1.78:1) is decoration only.
- **Type:** Schibsted Grotesk (headings, interface) + Newsreader (reading text, the name in the lockup). Scale tokens `--am-text-*`.
- **Signature:** the night-sky hero with the star field that follows the cursor, the natal chart with the magnifying lens, the G-and-microscope mark.
- **Motion:** only the star field moves on its own; everything else responds to the visitor; all motion off under `prefers-reduced-motion`.

## Open items
- **Font weight on the page.** Newsreader files are 87–147 KB each (its optical-size axis), so a page with both families and both subsets loads about 285 KB of fonts. That exceeds the spirit of `specs/07`. Decide at build time: instance Newsreader at a fixed optical size, subset harder, or load Newsreader only after first paint.
- **Logo source.** The mark is traced with potrace from the original logo of the old website (667 × 667 PNG). Fine detail is limited by that resolution; if the designer's vector original exists, replace the files in `brand/logo/` with it.
