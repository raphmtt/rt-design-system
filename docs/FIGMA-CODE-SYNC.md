# Figma ↔ Code Sync Guide

This document describes how to keep the Figma design kit in sync with the code.

---

## Source of Truth

| Concern | Source of Truth |
|---------|-----------------|
| Token values | `packages/tokens/themes/*.theme.rtds.json` (OKLCH). Design tools may speak hex; convert at ingest. |
| Non-color primitives | `design/tokens/primitive.json` |
| Component API | Code (`@rtds/ui`) |
| Visual design | Figma / Penpot (mirrors code) |

---

## Hex handoff → OKLCH ingest

Design (Figma, Penpot, Tokens Studio) may still speak **hex**. Repo source of truth after ingest is **OKLCH** in `packages/tokens/themes/*.theme.rtds.json`. Do not check in parallel hex fields in the theme file.

1. Drop or update hex palettes (legacy `design/tokens/themes/*-{light,dark}.json` or the frozen snapshot in `packages/tokens/scripts/migrate-hex-to-oklch.js`)
2. Run `pnpm --filter @rtds/tokens migrate:hex`
3. Run `pnpm tokens:build` and commit generated CSS

See [THEMING.md](./THEMING.md) and [design/penpot/README.md](../design/penpot/README.md).

## Tokens Studio / Figma

Non-color primitives (spacing, type) can still sync from `design/tokens`. **Colors are not Tokens Studio hex** — they live in the OKLCH theme files.

### Workflow: Tokens → Code

```
Design hex (optional handoff)
    → packages/tokens/scripts/migrate-hex-to-oklch.js
packages/tokens/themes/*.theme.rtds.json     ← SOURCE OF TRUTH for color
    → pnpm tokens:build  (first-party generator, not Style Dictionary)
packages/tokens/dist/{atlas,folio,maison}.css
    → @rtds/ui/styles.css (product) / playground.css (demo)
```

### CI Check

PR CI runs `pnpm tokens:build` and fails if the generated CSS differs from committed CSS. This ensures token JSON and CSS stay in sync.

---

## Component Naming Parity

Component names in Figma **must match** code exactly. Use PascalCase.

### Foundations

| Figma Component | Code Component | Status |
|-----------------|----------------|--------|
| Button | Button | ☐ |
| Input | Input | ☐ |
| Textarea | Textarea | ☐ |
| Label | Label | ☐ |
| Checkbox | Checkbox | ☐ |
| Select | Select | ☐ |
| Switch | Switch | ☐ |
| Badge | Badge | ☐ |
| Avatar | Avatar | ☐ |
| Card | Card | ☐ |
| Dialog | Dialog | ☐ |
| Sheet | Sheet | ☐ |
| Accordion | Accordion | ☐ |
| Tabs | Tabs | ☐ |
| Tooltip | Tooltip | ☐ |
| Separator | Separator | ☐ |
| Skeleton | Skeleton | ☐ |
| Alert | Alert | ☐ |

### Layout

| Figma Component | Code Component | Status |
|-----------------|----------------|--------|
| Container | Container | ☐ |
| Section | Section | ☐ |
| Stack | Stack | ☐ |
| Grid | Grid | ☐ |
| Bleed | Bleed | ☐ |

### Navigation

| Figma Component | Code Component | Status |
|-----------------|----------------|--------|
| SiteHeader | SiteHeader | ☐ |
| SiteFooter | SiteFooter | ☐ |
| MobileNav | MobileNav | ☐ |
| AnnouncementBar | AnnouncementBar | ☐ |

### Marketing Blocks

| Figma Component | Code Component | Status |
|-----------------|----------------|--------|
| Hero | Hero | ☐ |
| LogoCloud | LogoCloud | ☐ |
| FeatureGrid | FeatureGrid | ☐ |
| FeatureSplit | FeatureSplit | ☐ |
| StatsRow | StatsRow | ☐ |
| PricingTable | PricingTable | ☐ |
| Testimonial | Testimonial | ☐ |
| TestimonialGrid | TestimonialGrid | ☐ |
| FAQ | FAQ | ☐ |
| CTASection | CTASection | ☐ |
| ContactForm | ContactForm | ☐ |
| NewsletterForm | NewsletterForm | ☐ |

---

## Variant Parity Checklist

For each component, verify these states exist in both Figma and code:

### Interactive States

- [ ] Default
- [ ] Hover
- [ ] Focus
- [ ] Active/Pressed
- [ ] Disabled
- [ ] Loading (if applicable)

### Theme Variants

- [ ] Aurora Light
- [ ] Aurora Dark
- [ ] Editorial Light
- [ ] Editorial Dark

### Size Variants (where applicable)

- [ ] Small (sm)
- [ ] Medium (md) — default
- [ ] Large (lg)

### Type Variants (component-specific)

Example for Button:
- [ ] Default
- [ ] Secondary
- [ ] Outline
- [ ] Ghost
- [ ] Destructive
- [ ] Link

---

## Parity Review Process

When updating components:

1. **Code first:** Update code component
2. **Document:** Update component story in Storybook
3. **Sync Figma:** Update Figma component to match
4. **Check states:** Verify all states × themes × sizes
5. **Mark complete:** Check off in this document

### Quarterly Review

Schedule quarterly reviews to:
- Audit all components for drift
- Update this checklist
- Document any intentional differences

---

## Manual Aspects

These aspects require manual maintenance (not automated):

- Figma layout composition
- Auto-layout fine-tuning
- Illustration assets
- Marketing copy
- Screenshot parity reviews
- Visual regression (consider Chromatic later)

---

## Troubleshooting

### Tokens not updating in Figma

Colors are not synced as hex from Tokens Studio. Edit `packages/tokens/themes/*.theme.rtds.json` (OKLCH) or re-run hex ingest. Non-color primitives still live in `design/tokens`.

### Component looks different

1. Compare Figma component with Storybook
2. Check if all variants are implemented
3. Verify token references match

### New token not available

1. Add to `packages/tokens/themes/*.theme.rtds.json` (OKLCH)
2. Run `pnpm tokens:build`
3. Commit generated CSS
