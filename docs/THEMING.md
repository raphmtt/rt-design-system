# Theming

Authors control colors in **one JSON file per theme**. A first-party generator emits real CSS. Apps consume **exactly one theme** with **light + dark** (`.dark` on `<html>`).

## Why OKLCH

Color source of truth is **OKLCH channels**, not hex.

- Perceptually uniform lightness and chroma — mixing and scales stay even
- Hue is independent of lightness, so tints/shades keep identity
- CSS can interpolate gradients **in oklch**, which hex/sRGB cannot do well

Penpot (and other design tools) may still speak **hex**. Convert at ingest with `pnpm --filter @rtds/tokens migrate:hex`. **After ingest, repo SoT is OKLCH** in `*.theme.rtds.json`. Do not keep parallel hex fields in the theme file.

Conversion uses Björn Ottosson’s OKLab (`packages/tokens/scripts/oklch.js`).

## Authoring `{ l, c, h }`

Canonical files: `packages/tokens/themes/*.theme.rtds.json`

```json
{
  "$schema": "../theme.rtds.schema.json",
  "name": "atlas",
  "colorSpace": "oklch",
  "light": {
    "background": { "l": 0.9851, "c": 0, "h": 0 },
    "primary": { "l": 0.2103, "c": 0.0059, "h": 285.89 }
  },
  "dark": {
    "background": { "l": 0.1408, "c": 0.0044, "h": 285.82 },
    "primary": { "l": 0.9851, "c": 0, "h": 0 }
  },
  "radius": "0.5rem"
}
```

| Channel | Range | Meaning |
|---------|--------|---------|
| `l` | 0–1 | Lightness |
| `c` | ≥ 0 | Chroma |
| `h` | 0–360 | Hue |
| `a` | 0–1, optional | Alpha |

Required semantic keys (camelCase in JSON → kebab-case CSS vars):

`background`, `foreground`, `card`, `cardForeground`, `primary`, `primaryForeground`, `secondary`, `secondaryForeground`, `muted`, `mutedForeground`, `accent`, `accentForeground`, `destructive`, `destructiveForeground`, `border`, `input`, `ring`, `success`, `warning`

Example: `primaryForeground` → `--primary-foreground: oklch(…)`.

Schema: `packages/tokens/theme.rtds.schema.json` (`colorSpace` must be `"oklch"`). Extra pairs such as `successForeground` are allowed if they use the same `{l,c,h}` shape. Light and dark must have the **same keys**.

## Build command

Design-system package (presets published from this repo):

```bash
pnpm tokens:build
# or
pnpm --filter @rtds/tokens build
```

The generator discovers `packages/tokens/themes/*.theme.rtds.json` and writes:

| Output | Use |
|--------|-----|
| `packages/tokens/dist/atlas.css` | Product preset: Atlas `:root` + `.dark` |
| `packages/tokens/dist/folio.css` | Product preset: Folio |
| `packages/tokens/dist/maison.css` | Product preset: Maison |
| `packages/tokens/dist/playground.css` | Storybook convenience — all presets, `data-theme` |

### CLI (`--in` / `--out`)

Apps should **own** their `*.theme.rtds.json` files and run the same generator:

```bash
# from an app directory
rtds-tokens --in ./themes --out ./src/generated/themes

# equivalent
node packages/tokens/scripts/build-tokens.js --in apps/demo/themes --out apps/demo/src/generated/themes
```

| Flag | Default | Meaning |
|------|---------|---------|
| `--in` | `packages/tokens/themes` | Directory of `*.theme.rtds.json` |
| `--out` | `packages/tokens/dist` | CSS output directory |
| `--default-theme` | `atlas` | Theme used for `:root` in `playground.css` |
| `--no-playground` | off | Skip `playground.css` |

Build **fails** on invalid OKLCH, missing required keys, or light/dark key mismatch.

CSS looks like:

```css
/* generated — do not edit */
:root {
  --background: oklch(0.9851 0 0);
  --primary: oklch(0.2103 0.0059 285.89);
  --radius: 0.5rem;
}
.dark {
  --background: oklch(0.1408 0.0044 285.82);
}
```

Commit `packages/tokens/dist`. CI runs `pnpm tokens:build` and fails on drift.

Hex → OKLCH (one-shot / Penpot ingest):

```bash
pnpm --filter @rtds/tokens migrate:hex
pnpm tokens:build
```

## App integration (product: one theme + light/dark)

Simplest (DS-shipped Atlas preset):

```css
@import "@rtds/ui/styles.css";
```

App-owned theme (recommended, what `apps/demo` does):

```css
@import "./generated/themes/atlas.css";
@import "@rtds/ui/base.css";
```

Toggle dark with `class="dark"` on `<html>` (or `ThemeProvider`).

**Do not** set `data-brand` / `data-theme` in product apps. There is no runtime multi-brand switcher on the product path.

To ship Folio or Maison instead of Atlas, generate that JSON and import its CSS file (or `@import "@rtds/tokens/folio.css"` if you want a DS preset).

`ThemeProvider` only switches light/dark.

## Demo: app-owned themes

`apps/demo` is the reference consumer:

1. Theme SoT: `apps/demo/themes/*.theme.rtds.json` (copies the demo **hosts**, not library playground CSS)
2. `pnpm --filter demo tokens:build` (also runs on `dev` / `build`) invokes the first-party generator with `--in ./themes --out ./src/generated/themes`
3. Default styling imports **one** generated file (`atlas.css`: `:root` + `.dark`) plus `@rtds/ui/base.css`
4. The header switcher is labeled **demo playground — real apps ship one theme file**. It only swaps among locally generated themes via `data-theme` (from the demo's own `playground.css`). It does **not** import `@rtds/ui/playground.css` or `@rtds/tokens/playground.css`.

Storybook still uses `@rtds/ui/playground.css` (package presets) for convenience. That is not the app integration path.

Product apps must not copy the playground switcher.

## Future gradients

Prefer CSS interpolation in OKLCH where supported:

```css
background: linear-gradient(in oklch, var(--primary), var(--accent));
```

Optional helpers from `@rtds/tokens` (tooling / fallbacks — not a gradient component API):

```ts
import { formatOklch, oklchMix, gradientStop } from '@rtds/tokens';

gradientStop(primary, accent);
// linear-gradient(in oklch, oklch(…), oklch(…))
```

## Non-goals

- Runtime multi-brand switching in production apps
- Third-party theme frameworks (daisyUI, Tokens Studio pipelines, Style Dictionary, Livery, twgen, …)
- Per-component token folders
- Hex as a second source of truth in `*.theme.rtds.json`

Fonts, icons, and radius authoring notes: [HOW-TO-THEME.md](./HOW-TO-THEME.md).
