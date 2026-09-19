# How to theme

Change **colors**, **fonts**, and **icons** without rewriting components.

**Colors (OKLCH):** see [THEMING.md](./THEMING.md). One `*.theme.rtds.json` per theme; generator emits `oklch()` CSS. Product apps import `@rtds/ui/styles.css` and toggle `.dark` on `<html>`.

This page covers fonts, icons, and radius.

---

## Colors

Author OKLCH `{ l, c, h }` objects in:

```
packages/tokens/themes/atlas.theme.rtds.json
packages/tokens/themes/folio.theme.rtds.json
packages/tokens/themes/maison.theme.rtds.json
```

Rebuild:

```bash
pnpm tokens:build
```

Components consume `bg-background`, `text-foreground`, `bg-primary`, `bg-success`, `bg-warning`, etc. Do **not** put raw hex or `oklch()` literals in UI.

Product path (one theme):

```css
@import "@rtds/ui/styles.css";
```

```html
<html class="dark">
```

Demo playground only may set `data-theme="folio"` (or use `BrandProvider`) to preview several JSON files. That is not the product contract.

Radius is per theme JSON (`radius`):

| Niche | Radius |
|-------|--------|
| atlas | `0.5rem` |
| folio | `0.375rem` |
| maison | `0.75rem` |

---

## Fonts

Locked stack (all niches — no per-niche type cosplay):

| Role | Family | Token | Utility |
|------|--------|-------|---------|
| Display | Instrument Serif | `--font-display` | `font-display` (Hero H1) |
| Heading / body | Inter | `--font-heading`, `--font-body` | `font-heading`, default body |
| Mono | JetBrains Mono | `--font-mono` | `font-mono` |

Source: `design/tokens/primitive.json` → `font.family.*`. The generator emits these on every theme CSS file.

Load Google Fonts in the app shell (`apps/demo/index.html`, Storybook `preview-head.html`, create CLI template):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

To swap a family: change the primitive value, update the `<link>`, run `pnpm tokens:build`.

---

## Icons

**One library:** Lucide (`lucide-react`), outline only, `currentColor`.

Use the `<Icon>` wrapper — do not set `strokeWidth` or mix icon packs.

| Context | Size | Example |
|---------|------|---------|
| UI chrome | `20` (default) | `<Icon icon={Menu} />` |
| Features / marketing | `24` | `<Icon icon={Zap} size={ICON_SIZE_FEATURE} />` |

```tsx
import { Icon, ICON_SIZE_FEATURE } from '@rtds/ui';
import { Zap } from 'lucide-react';

<Icon icon={Zap} size={ICON_SIZE_FEATURE} />
```

Stroke is `1.5`. Compact controls (checkbox, select chevron) may pass a smaller `size` so the glyph fits the hit box — stroke stays `1.5`.

---

## Pipeline

```
packages/tokens/themes/*.theme.rtds.json
    →  pnpm tokens:build
    →  packages/tokens/dist/{atlas,folio,maison,playground}.css
    →  @rtds/ui/styles.css  (product: atlas + Tailwind @theme)
    →  @rtds/ui + demo + Storybook
```

`pnpm tokens:check` fails if dist is out of date. Always commit `packages/tokens/dist`.

Full color contract: [THEMING.md](./THEMING.md).
