# Penpot / design-tool color handoff

Design may still speak **hex**. After ingest, repo source of truth is **OKLCH** in:

```
packages/tokens/themes/*.theme.rtds.json
```

Do not keep parallel hex fields in those files.

## Ingest

1. Export hex semantic colors per niche × mode from Penpot (or Figma).
2. Put them in the frozen snapshot (or restore legacy `design/tokens/themes/{name}-{light|dark}.json`) inside `packages/tokens/scripts/migrate-hex-to-oklch.js`.
3. Run:

```bash
pnpm --filter @rtds/tokens migrate:hex
pnpm tokens:build
```

Conversion is Ottosson OKLab (`packages/tokens/scripts/oklch.js`). JSON after this step is the only color SoT.

## Product vs playground

- **Product apps:** one theme CSS + `.dark`. No `data-brand` / runtime multi-brand.
- **Demo / Storybook:** several theme JSON files (atlas, folio, maison) as a playground.

See [docs/THEMING.md](../../docs/THEMING.md).
