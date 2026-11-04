# Accessibility checklist (WCAG 2.2 AA)

Run per template, in both languages. Record the date and the result in `status/log.md`.

- [ ] axe: 0 violations
- [ ] Keyboard only: every action is reachable, in a logical order; no traps; the skip link works
- [ ] Focus is always visible and never hidden by sticky elements (2.4.11)
- [ ] Targets at least 24×24 px or spaced (2.5.8), including the SR/EN switch
- [ ] Nothing requires dragging (2.5.7); the chart lens works with keys
- [ ] Contrast: text 4.5:1, large text 3:1, UI and focus 3:1
- [ ] One H1; headings in order; landmarks present and labelled
- [ ] Images: meaningful alt text in the page language; decorative images `alt=""`
- [ ] `lang` correct on `<html>` and on passages in the other language
- [ ] Forms: visible labels, errors in text and announced, no redundant entry (3.3.7)
- [ ] Reduced motion: all animation stops; nothing flashes
- [ ] Zoom to 200% and width 320 px: no loss of content, no horizontal scrolling
- [ ] Screen reader pass: VoiceOver (macOS, iOS); NVDA if available (optional, not a gate: D38)
- [ ] Help and contact in the same place on every page (3.2.6)
