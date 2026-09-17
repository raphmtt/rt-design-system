# Penpot Design Library — `rt-design-system`

Design layout lives in the **Penpot** file named **`rt-design-system`** (Penpot SaaS, not Figma).

- Open Penpot SaaS and search for `rt-design-system`.
- The file covers layout composition for the shared components and pages.
- Colors, radius, and component APIs still follow code (see `docs/PENPOT-CODE-SYNC.md`).

---

## Niches & modes

The Penpot file mirrors the repo's theme matrix — **3 niches × 2 modes**:

| Niche | data-brand | Radius (from tokens) |
|-------|------------|----------------------|
| Atlas | `atlas` | `0.5rem` |
| Folio | `folio` | `0.375rem` |
| Maison | `maison` | `0.75rem` |

Light is the default; dark is `.dark` on `<html>`. Color style names in Penpot should use the 6 `{niche}-{mode}` names: `atlas-light`, `atlas-dark`, `folio-light`, `folio-dark`, `maison-light`, `maison-dark`.

The brand radius table wins over any Penpot radius scale.

---

## Optional: `design/penpot/token-snapshot.json`

A **snapshot of the Penpot color tokens**, dropped into this folder, lets CI prove the design file hasn't drifted from the approved code hex.

### How to drop/update it

1. In the `rt-design-system` Penpot file, export the color token styles for the 6 `{niche}-{mode}` themes.
2. Save it as `design/penpot/token-snapshot.json` with this shape:

```json
{
  "atlas-light": {
    "background": "#FAFAFA",
    "primary": "#18181B"
  },
  "atlas-dark": {
    "background": "#09090B",
    "primary": "#FAFAFA"
  }
}
```

   - Keys are `{niche}-{mode}` → camelCase semantic names.
   - A flat `"atlas-light.background": "#FAFAFA"` shape also works.
   - Hex may be any case (`#fafafa` is fine) — the check normalizes to uppercase `#RRGGBB`.
   - A partial snapshot is treated as drift (missing canonical colors fail).

3. Run:

```bash
pnpm tokens:check-design
```

   Without the snapshot the check is structural only. With it, CI fails on any color drift between Penpot and the approved hex. No authenticated Penpot API is involved.

---

## Related docs

- `docs/PENPOT-CODE-SYNC.md` — SoT rules, change processes, release checklist.
- `docs/PENPOT-COMPONENT-PARITY.md` — component-by-component parity across Penpot and `packages/ui`.