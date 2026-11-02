---
id: SPEC-07
title: Performance and Core Web Vitals
status: draft
updated: 2026-11-02
---

# Performance and Core Web Vitals

## Targets
Google's “good” thresholds (web.dev/articles/vitals, checked 2026-11-02), measured at the **75th percentile** of page loads, separately for mobile and desktop:

| Metric | Google “good” | Our lab budget (stricter, so field data stays green) |
|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5 s | ≤ 2.0 s on Lighthouse mobile |
| INP (Interaction to Next Paint) | ≤ 200 ms | Total Blocking Time ≤ 150 ms in lab; no task over 50 ms after load |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.05 |

INP replaced FID as a Core Web Vital in 2024.

## Page budgets (initial load, compressed, per page)
| Resource | Budget |
|---|---|
| HTML | ≤ 50 KB |
| CSS | ≤ 50 KB, critical CSS inline for the first screen |
| JavaScript | ≤ 70 KB in total; 0 KB on pages with no interactive parts |
| Fonts | at most 2 families and 4 files, woff2, subset to Latin plus Latin Extended, self-hosted |
| Hero image | ≤ 120 KB on mobile |
| Third-party requests before interaction | 0 |
These numbers are our proposal; adjust them in `status/decisions.md` with a reason.

## Rules
- **LCP element known per template** (usually the H1 or the hero image). Do not lazy-load it; preload it if it is an image; serve it from the same origin.
- **Fonts**: `font-display: swap` (or `optional` for display fonts), preload only the font used above the fold, and match fallback metrics to limit layout shift.
- **Images**: AVIF or WebP with fallback, `srcset` and `sizes`, explicit `width` and `height`, `loading="lazy"` below the fold, `decoding="async"`.
- **YouTube**: use a facade (thumbnail plus play button) and load the player only on click. The real player is heavy and should never load on page view.
- **Canvas effects** (for example D's star field): start after the page is idle, run only while visible, stop under `prefers-reduced-motion`, and simplify or disable on low-power or touch devices.
- **No layout shift**: reserve space for images, embeds, banners and the language switch; nothing appears above existing content after load.
- **Caching**: hashed file names with long cache life; HTML revalidated; serve through a CDN with HTTP/2 or HTTP/3 and Brotli or gzip.
- **Third parties**: analytics is light and deferred; no chat widgets or tag managers without a decision entry.

## Measurement
- Lab: Lighthouse (mobile preset) in CI on every main template, with fixed budgets (`testing/checklists/performance.md`).
- Field: CrUX data in Search Console once traffic is enough, plus a small real-user script that sends LCP, INP and CLS (the `web-vitals` library; check its current API before use).
