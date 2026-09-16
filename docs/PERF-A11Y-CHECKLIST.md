# Performance & Accessibility Checklist

Complete this checklist before shipping any landing page built with the Acme design system.

---

## Performance Budgets

| Metric | Budget | How to Check |
|--------|--------|--------------|
| JS transferred (initial, gzip) | ≤ 150 KB | Lighthouse / DevTools Network |
| CSS transferred | ≤ 40 KB | Lighthouse / DevTools Network |
| LCP (throttled 4G, cold) | ≤ 2.5 s | Lighthouse Performance |
| CLS | ≤ 0.1 | Lighthouse / Web Vitals |
| Fonts | display + body + mono (3 families) | Check `<link>` tags |

### Performance Checklist

- [ ] Run Lighthouse in Incognito with CPU throttling
- [ ] LCP ≤ 2.5s on throttled 4G
- [ ] CLS ≤ 0.1
- [ ] JS bundle ≤ 150 KB (gzip)
- [ ] CSS ≤ 40 KB (gzip)
- [ ] Fonts use `font-display: swap`
- [ ] Three families loaded (Instrument Serif, Inter, JetBrains Mono)
- [ ] Images have width/height attributes
- [ ] Images below fold are lazy loaded
- [ ] No layout-blocking third-party scripts
- [ ] Hero image optimized (WebP/AVIF)

---

## Accessibility (WCAG 2.2 AA)

### Structure

- [ ] Page has `<header>` landmark
- [ ] Page has `<main>` landmark
- [ ] Page has `<footer>` landmark
- [ ] Page has `<nav>` landmark
- [ ] Skip to content link is present and works
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Only one `<h1>` per page

### Focus & Interaction

- [ ] Focus ring visible on all interactive elements
- [ ] Focus ring uses `--ring` token
- [ ] Tab order is logical
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Primary buttons/links ≥ 44×44px hit area

### Color & Contrast

**Test all niches (atlas, folio, maison) and both modes (light, dark):**

- [ ] Body text contrast ≥ 4.5:1 (atlas light)
- [ ] Body text contrast ≥ 4.5:1 (atlas dark)
- [ ] Body text contrast ≥ 4.5:1 (folio light)
- [ ] Body text contrast ≥ 4.5:1 (folio dark)
- [ ] Body text contrast ≥ 4.5:1 (maison light)
- [ ] Body text contrast ≥ 4.5:1 (maison dark)
- [ ] Large text contrast ≥ 3:1 (all themes)
- [ ] Color is not the sole indicator of state/error
- [ ] Links distinguishable from body text

### Forms

- [ ] All inputs have associated `<label>`
- [ ] Required fields indicated
- [ ] Error states use `aria-invalid`
- [ ] Error messages have unique IDs linked to inputs
- [ ] Form submission provides feedback

### Media

- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Informative icons have accessible names
- [ ] Images have alt text
- [ ] Decorative images have `alt=""`

### Motion

- [ ] `@media (prefers-reduced-motion: reduce)` is honored
- [ ] Transforms/transitions disabled or minimal
- [ ] No auto-playing videos/animations

### Dialogs & Overlays

- [ ] Focus trapped inside dialog when open
- [ ] Escape key closes dialog
- [ ] Focus returns to trigger on close
- [ ] Background content is inert when dialog is open

### Storybook Validation

- [ ] a11y addon shows no violations
- [ ] All components tested in light mode
- [ ] All components tested in dark mode
- [ ] All components tested in atlas niche
- [ ] All components tested in folio niche
- [ ] All components tested in maison niche

---

## How to Run Checks

### Lighthouse

```bash
# Build production
pnpm build

# Serve and run Lighthouse
pnpm preview
# Open Chrome DevTools → Lighthouse → Analyze
```

### axe DevTools

1. Install [axe DevTools extension](https://www.deque.com/axe/devtools/)
2. Open the page
3. Run full page scan

### Manual Keyboard Testing

1. Press Tab through the entire page
2. Verify focus is visible
3. Test Enter/Space on buttons
4. Test Escape on modals
5. Verify no keyboard traps

### Screen Reader Testing

Test with at least one:
- macOS: VoiceOver (built-in)
- Windows: NVDA (free)
- Browser: ChromeVox extension

---

## Sign-off

| Check | Date | Tester |
|-------|------|--------|
| Performance (Lighthouse) | | |
| Accessibility (axe) | | |
| Keyboard navigation | | |
| Screen reader | | |
| Light mode (all niches) | | |
| Dark mode (all niches) | | |
| Mobile (375px) | | |
| Desktop (1440px) | | |
