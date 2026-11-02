# Test plan

Which checks cover which module. The tools are proposals until `specs/03` is decided; record the chosen tools and their versions here.

| Module | Automated (G2) | Manual (G3) |
|---|---|---|
| MOD-header-nav | axe; link check; Lighthouse | keyboard path, mobile menu focus trap and Escape, active state, 2.4.11 focus not hidden |
| MOD-language-switch | every page has a pair; hreflang return links | switch lands on the same page; screen reader reads the language names |
| MOD-seo-head | structured data validation per template; title and description length and uniqueness; canonical self-reference | Rich Results Test spot check; social card preview |
| MOD-hero | Lighthouse LCP ≤ 2.0 s and CLS ≤ 0.05 (mobile) | reduced motion; lens by keyboard; 360 px |
| MOD-learn-formats | axe; link check | empty state; both languages |
| MOD-youtube-feed | no third-party requests on load; VideoObject valid | facade plays on click; Serbian titles marked `lang="sr"` |
| MOD-private-analyses | axe; link check | accordion by keyboard (if used) |
| MOD-about | ProfilePage/Person valid | portrait alt text in both languages |
| MOD-newsletter | form works without JavaScript; errors announced | consent text reviewed; double opt-in tested |
| MOD-footer | link check | contact in the same place on every page |

## Site-wide checks before release
- Crawl the whole site (both languages): status codes, canonicals, hreflang, orphan pages, duplicate titles.
- Lighthouse on every template, mobile and desktop.
- `checklists/content.md`: no placeholders, every string translated and proofread.
