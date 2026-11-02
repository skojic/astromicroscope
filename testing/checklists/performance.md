# Performance checklist

Budgets come from `specs/07`. Run Lighthouse with the mobile preset, three runs, and take the median.

- [ ] LCP ≤ 2.0 s (lab, mobile); the LCP element is known and not lazy-loaded
- [ ] Total Blocking Time ≤ 150 ms; no long tasks after load
- [ ] CLS ≤ 0.05; every image and embed has reserved space
- [ ] JavaScript ≤ 70 KB compressed; 0 KB on static pages
- [ ] CSS ≤ 50 KB; critical CSS inline
- [ ] Fonts: ≤ 2 families, ≤ 4 woff2 files, Latin Extended subset, self-hosted, `font-display` set
- [ ] Images: AVIF/WebP, `srcset`/`sizes`, lazy below the fold
- [ ] No third-party request before interaction (YouTube facade, analytics deferred)
- [ ] Canvas and animation: start after idle, pause offscreen, off under reduced motion
- [ ] Caching headers: long life for hashed assets; HTML revalidated; Brotli or gzip on
- [ ] Field data (after launch): LCP, INP and CLS “good” at p75 on mobile and desktop in Search Console
