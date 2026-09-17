# Penpot ↔ Code Sync Guide

This document is the operating manual for keeping the **Penpot** design library and this monorepo in lockstep.

> **No Figma.** This design system uses Penpot (file: `rt-design-system` in Penpot SaaS) as the layout source of truth. Figma, Tokens Studio, and authenticated Penpot APIs are **not** part of the workflow.

---

## Source of Truth (SoT) Rules

| Concern | Source of Truth | Direction |
|---------|-----------------|-----------|
| Page/layout composition | **Penpot** file `rt-design-system` | Penpot mirrors code; layout tweaks don't need code |
| Color / radius values | **Code tokens** — `packages/tokens/approved-semantic-hex.json` (canonical) + `design/tokens/themes/*.json` (build source) | **Code wins.** Design mirrors the same hex into Penpot afterwards |
| Component API & names | **Code** — React exports in `packages/ui` | Code first; Penpot component names must match |
| Themes | `atlas` \| `folio` \| `maison` × light/dark via `data-brand` + `.dark` on `<html>` | No other niche names |

### Rules of thumb

1. **Code wins for colors and radius.** Any approved hex change happens in the repo first, then gets mirrored into the Penpot file. Never change a hex only in Penpot.
2. **Penpot wins for layout.** Moving a CTA, resizing a block, spacing tweaks — no new token and no API change, so **no code change is required**. Record the change in this doc's process notes so both sides stay honest.
3. **Code is the only API.** Penpot component names, when a `packages/ui` component exists, must match the export (see `docs/PENPOT-COMPONENT-PARITY.md`).
4. **Brand radius wins.** atlas `0.5rem`, folio `0.375rem`, maison `0.75rem` come from tokens and override any Penpot radius scale drift.

---

## Canonical Colors

The approved semantic hex lives in `packages/tokens/approved-semantic-hex.json` — 6 theme keys (`atlas-light`, `atlas-dark`, `folio-light`, `folio-dark`, `maison-light`, `maison-dark`) × 19 semantic colors each.

- JSON keys are **camelCase** (`primaryForeground`).
- CSS variables are **kebab-case** (`primaryForeground` → `--primary-foreground`).
- Hex is always **`#` + 6 uppercase characters** (`#9A3412`, never `#9a3412`, never `#93a`). GitHub/Penpot pickers both normalize; the repo does not.

The theme JSONs in `design/tokens/themes/*.json` are the build source and must agree with the canonical file — `pnpm tokens:check-design` enforces this.

---

## Validation

```bash
pnpm tokens:check-design
```

Behavior:

- Always: validates the canonical JSON has the 6 niche × mode keys and the 19 expected semantic color keys, each a valid uppercase `#RRGGBB`, and that `design/tokens/themes/*.json` match the canonical colors.
- When `design/penpot/token-snapshot.json` is present: normalizes every snapshot hex to uppercase `#RRGGBB` and **fails on any drift** from the canonical file. The snapshot is an optional export dropped into the repo from Penpot (see `design/penpot/README.md`).
- No authenticated Penpot API is used in CI.

Also run the existing build/check gates:

```bash
pnpm tokens:build      # regenerate CSS vars
pnpm tokens:check      # fail if generated dist is stale
```

---

## Color-Change Process (approved hex only)

1. **Edit code tokens:**
   - Update `packages/tokens/approved-semantic-hex.json` (canonical).
   - Update the matching key(s) in `design/tokens/themes/{niche}-{mode}.json` (`semantic.*.value`).
2. **Rebuild:**

   ```bash
   pnpm tokens:build
   pnpm tokens:check-design
   ```

3. **Commit** the JSON + regenerated `packages/tokens/dist` (dist is always committed).
4. **Mirror into Penpot:** set the same uppercase hex on the same `{niche}-{mode}` color styles in the `rt-design-system` file.
5. **Drop/refresh the snapshot** (optional but recommended): export the Penpot color tokens to `design/penpot/token-snapshot.json` and re-run `pnpm tokens:check-design` so CI proves both sides agree.

> Radius changes work the same way but only touch `design/tokens/themes/*.json` (`component.radius`). Brand radius wins over the Penpot radius scale.

## Component-Change Process

1. **Code first:** implement/change the component in `packages/ui` and export it from `packages/ui/src/index.ts`.
2. **Name it exactly** as the Penpot counterpart when one exists (see parity table). If a Penpot component has no code equivalent yet, the name gap is `missing-in-code` — see `docs/PENPOT-COMPONENT-PARITY.md`.
3. **Document:** add/update a Storybook story.
4. **Mirror into Penpot:** update the component and its anatomy/variants in the `rt-design-system` file.
5. **Layout-only changes** (spacing, arrangement, copy) in Penpot need **no code change** — just note them in the PR/release.

## Release Checklist

- [ ] `pnpm tokens:build` and `pnpm tokens:check` are green (generated CSS committed)
- [ ] `pnpm tokens:check-design` is green
- [ ] `design/penpot/token-snapshot.json` (if present) shows zero drift
- [ ] Parity table in `docs/PENPOT-COMPONENT-PARITY.md` is current for the shipped components
- [ ] Penpot component names match `packages/ui` exports
- [ ] All hex in tokens is uppercase `#RRGGBB`
- [ ] No Figma/Tokens Studio references remain in docs
- [ ] `rg BarberPoint packages apps` finds nothing
- [ ] Demo-only chrome (`BrandSelect`, `ModeToggle`) is not part of the shared parity surface

---

## Out of Scope

- Rebuilding the Penpot library.
- Redesigning colors, type, icons, or layouts.
- Tokens Studio or authenticated Penpot API automation.
- Any BarberPoint coupling in `packages/` or `apps/`.