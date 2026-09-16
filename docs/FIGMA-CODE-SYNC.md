# Figma ↔ Code Sync Guide

This document describes how to keep the Figma design kit in sync with the code.

---

## Source of Truth

| Concern | Source of Truth |
|---------|-----------------|
| Token values | `design/tokens/**/*.json` (Git) |
| Component API | Code (`@acme/ui`) |
| Visual design | Figma (mirrors code) |

---

## Tokens Studio Integration

### Setup

1. Install Tokens Studio plugin in Figma
2. Connect to this repository via GitHub sync
3. Set sync folder to `design/tokens`
4. Pull tokens to Figma

### Workflow: Tokens → Code

```
Figma (Tokens Studio)
    ↕ Git sync
design/tokens/**/*.json     ← SOURCE OF TRUTH for token values
    → Style Dictionary build
packages/tokens/dist/css/variables.css
    → imported by @acme/tw-preset
    → consumed by @acme/ui + apps/demo
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

1. Check Tokens Studio sync status
2. Verify `design/tokens` folder path
3. Try "Pull from GitHub" in plugin

### Component looks different

1. Compare Figma component with Storybook
2. Check if all variants are implemented
3. Verify token references match

### New token not available

1. Add to `design/tokens/*.json`
2. Run `pnpm tokens:build`
3. Commit generated CSS
4. Push and sync Tokens Studio
