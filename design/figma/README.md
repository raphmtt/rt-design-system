# Figma Kit

This folder contains links and documentation for the Figma design kit.

## Tokens Studio Integration

The `design/tokens` folder is the source of truth for design tokens. It is synced with Figma via Tokens Studio.

### Setup

1. Install Tokens Studio plugin in Figma
2. Connect to this repository
3. Set sync folder to `design/tokens`
4. Pull tokens to Figma

### Workflow

1. Designer updates tokens in Figma via Tokens Studio
2. Tokens Studio pushes JSON to `design/tokens`
3. CI runs `pnpm tokens:build` to generate CSS
4. Generated CSS is committed to `packages/tokens/dist`

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
