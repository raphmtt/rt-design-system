# Figma Kit

This folder documents the Figma design kit. **Color SoT in git is OKLCH**, not Tokens Studio hex.

## Color tokens

Author and commit `packages/tokens/themes/*.theme.rtds.json`. If Figma still exports hex, convert at ingest:

```bash
pnpm --filter @rtds/tokens migrate:hex
pnpm tokens:build
```

See `docs/THEMING.md` and `design/penpot/README.md`.

## Non-color primitives

Spacing and type families in `design/tokens/primitive.json` can still sync via Tokens Studio if you use it for those layers only.

## Component Naming Parity

Component names in Figma should match code exactly:

| Figma | Code |
|-------|------|
| Button | Button |
| Input | Input |
| Card | Card |
| Hero | Hero |
| FeatureGrid | FeatureGrid |
| ... | ... |

See `docs/FIGMA-CODE-SYNC.md` for the full checklist.
