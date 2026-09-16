# Design System Principles

## Visual Identity: "Clear Signal"

### Core Principles

1. **Clarity over spectacle** — Landings convert; motion is secondary
2. **One accent, many neutrals** — Chromatic accent only for primary CTA / links / focus
3. **Breathing vertical rhythm** — Sections use generous Y padding; avoid cramped SaaS density
4. **Border-first depth** — Elevation via border + soft shadow; dark mode leans on borders
5. **Identical structure light/dark** — Only tokens change
6. **Agent-safe** — Everything expressible in tokens + documented variants

---

## Token Architecture

### Three Layers

```
Primitive  →  Semantic  →  Component
 (raw)         (role)       (optional)
```

1. **Primitive** — Raw values (palette scales, spacing, font sizes). **Never use directly in components.**
2. **Semantic** — Role-based tokens (`--background`, `--primary`, `--muted`). Components consume these.
3. **Component** — Optional aliases when semantic is insufficient (`--button-height-lg`).

### Theming Axes

| Axis | Attribute | Values |
|------|-----------|--------|
| Brand | `data-brand` on `<html>` | `aurora`, `editorial` |
| Mode | `.dark` class on `<html>` | light (default), dark |

Changing brand or mode **only** remaps CSS variables — **no component rewrites**.

---

## Typography

### Type Scale (rem, 16px root)

| Token | Size | Line-height | Use |
|-------|------|-------------|-----|
| `display` | 3rem → 4.5rem | 1.1 | Hero H1 only |
| `h1` | 2.25rem | 1.2 | Section titles |
| `h2` | 1.875rem | 1.25 | Subsections |
| `h3` | 1.5rem | 1.3 | Card titles |
| `h4` | 1.25rem | 1.35 | Small headings |
| `body-lg` | 1.125rem | 1.6 | Hero subcopy |
| `body` | 1rem | 1.6 | Default |
| `body-sm` | 0.875rem | 1.5 | Meta, captions |
| `label` | 0.875rem | 1.4 | Form labels |

### Font Families

| Brand | Headings | Body |
|-------|----------|------|
| Aurora | Plus Jakarta Sans | Inter |
| Editorial | Newsreader | Inter |

---

## Spacing

- **Base unit:** 4px
- **Major rhythm:** 8px
- **Scale:** 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32 (Tailwind-compatible)
- **Section Y:** `4rem` mobile → `6rem` md → `8rem` lg
- **Container:** `max-w-6xl` (72rem) with `px-4 md:px-6 lg:px-8`

---

## Radius

| Brand | Base Radius |
|-------|-------------|
| Aurora | 0.75rem |
| Editorial | 0.5rem |

Derive sm/md/lg/xl as: `calc(var(--radius) * factor)`

---

## Elevation

| Token | Light | Dark |
|-------|-------|------|
| `shadow-xs` | 0 1px 2px rgb(0 0 0/0.05) | none / border only |
| `shadow-sm` | 0 1px 3px rgb(0 0 0/0.08) | 0 0 0 1px var(--border) |
| `shadow-md` | soft mid for dropdowns | border + faint glow |

**Prefer `border-border` on cards in dark mode.**

---

## Motion

- **Duration:** 150ms micro, 200ms default, 300ms overlay
- **Easing:** `cubic-bezier(0.2, 0, 0, 1)`
- **Hover:** color/border only by default
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables transforms/transitions

### Forbidden in v1

- Autoplay video backgrounds
- Parallax scroll
- Infinite marquee

---

## Color Direction

### Aurora (SaaS/Product)
- Cool neutrals (zinc/slate)
- Accent: electric teal-violet (oklch high chroma)

### Editorial (Content/Services)
- Warm paper neutrals (stone)
- Accent: deep vermilion or forest green

### Contrast Requirements

- **Body text:** 4.5:1 (WCAG AA)
- **Large text:** 3:1

---

## Do / Don't

### Do

- ✓ Use semantic tokens (`bg-background`, `text-foreground`)
- ✓ Use component variants from props
- ✓ Test both brands × both modes
- ✓ Use `cn()` for class merging
- ✓ Keep hit targets ≥ 44×44px
- ✓ Add focus-visible styles

### Don't

- ✗ Use raw color values (`bg-zinc-100`)
- ✗ Use arbitrary Tailwind values (`w-[437px]`)
- ✗ Override component internal styles in consumer code
- ✗ Add animations without reduced-motion support
- ✗ Skip dark mode testing

---

## Component Naming

All components use PascalCase. Path: `@acme/ui/components/{ComponentName}`

See the component inventory in the technical design for the full list.
