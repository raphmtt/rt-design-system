# How to theme

Change **colors**, **fonts**, and **icons** without rewriting components.

Theme contract: `data-brand="atlas|folio|maison"` + `.dark` on `<html>`. There are no aliases for the old `aurora` / `editorial` ids.

---

## Colors

Each niche × mode is a JSON file of **hex** semantic tokens:

```
design/tokens/themes/atlas-light.json
design/tokens/themes/atlas-dark.json
design/tokens/themes/folio-light.json
design/tokens/themes/folio-dark.json
design/tokens/themes/maison-light.json
design/tokens/themes/maison-dark.json
```

1. Edit the hex values in the theme file (keep the same token keys).
2. Rebuild and commit generated CSS:

```bash
pnpm tokens:build
```

3. Components already consume `bg-background`, `text-foreground`, `bg-primary`, etc. Do **not** put raw hex in UI.

Radius is per niche in the same JSON (`component.radius`):

| Niche | Radius |
|-------|--------|
| atlas | `0.5rem` |
| folio | `0.375rem` |
| maison | `0.75rem` |

Switch at runtime:

```html
<html data-brand="folio" class="dark">
```

Or:

```tsx
<BrandProvider defaultBrand="atlas">
  <ThemeProvider defaultMode="system">{children}</ThemeProvider>
</BrandProvider>
```

`BrandSelect` + `ModeToggle` restyle the **full page**. Old `localStorage` values `aurora` / `editorial` migrate to `atlas`.

---

## Fonts

Locked stack (all niches — no per-niche type cosplay):

| Role | Family | Token | Utility |
|------|--------|-------|---------|
| Display | Instrument Serif | `--font-display` | `font-display` (Hero H1) |
| Heading / body | Inter | `--font-heading`, `--font-body` | `font-heading`, default body |
| Mono | JetBrains Mono | `--font-mono` | `font-mono` |

Source: `design/tokens/primitive.json` → `font.family.*`, referenced from each theme JSON.

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
import { Icon, ICON_SIZE_FEATURE } from '@acme/ui';
import { Zap } from 'lucide-react';

<Icon icon={Zap} size={ICON_SIZE_FEATURE} />
```

Stroke is `1.5`. Compact controls (checkbox, select chevron) may pass a smaller `size` so the glyph fits the hit box — stroke stays `1.5`.

---

## Pipeline

```
design/tokens/*.json  →  pnpm tokens:build  →  packages/tokens/dist/css/variables.css
                                              →  @acme/tw-preset @theme var(--…)
                                              →  @acme/ui + demo + Storybook
```

`pnpm tokens:check` fails if dist is out of date. Always commit `packages/tokens/dist`.
