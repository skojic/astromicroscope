# Report: M01 Brand kit and logo

| | |
|---|---|
| Stage | review |
| Last gate passed | G1 (built) |
| Owner | Srdjan |
| Branch | `main` (committed directly by the owner) |
| Last commit | see `git log -- brand/` |
| Last updated | 2026-11-02, Srdjan (prepared with the assistant) |

## Next step
Srdjan and Gorica open `brand/index.html` and approve or list changes. If Gorica has the designer's vector logo, replace `brand/logo/` from it and re-export (commands below).

## Done
- Brand kit for direction D: rules page SR/EN (`brand/index.html`), home reference, tokens (`tokens.css`, `tokens.json`), fonts (6 woff2, SIL OFL 1.1), social templates with PNG previews.
- Logo traced from the original (`potrace 1.16`, from a 4× silhouette of `logo-original.png`); all SVG variants and PNG exports regenerated; sizes and transparency checked.
- Credential corrected to “research astrologer, Johannes Kepler Institute, 2025” in kit and home reference (SR and EN).
- Contrast ratios computed with the WCAG formula; gold on white 2.08:1 → decoration only; `#8A6A2A` for gold text (5.03:1 on white).

## Not done
- M01-04: designer's vector original (only if it exists).

## Problems and blockers
- Newsreader fonts ≈ 285 KB for four files (handled in M00).

## How to re-export the logo
1. Silhouette: render `logo-original.png` at 2668 px with CSS `filter: brightness(0)` on white (headless Chrome).
2. `sips -s format bmp sil.png --out sil.bmp` then `potrace sil.bmp -s -o traced.svg -k 0.5 -t 4 -a 1 -O 0.2`.
3. Use the path with `viewBox="380 10 2144 2648"`; render PNGs at the sizes listed in `brand/README.md`.

## History
- 2026-11-02: kit built; original logo traced; credential corrected.
