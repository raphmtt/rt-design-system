# ADR-001: 1:1 wrappers over Base UI

- **Status:** Accepted (FINAL)
- **Date:** 2026-09-18
- **Package:** `@rtds/ui`
- **Primitive:** `@base-ui/react` (^1.8)

This decision is **final**. Do not reopen Base UI vs shadcn vs a new kit.

---

## Context

`@rtds/ui` today mixes Radix primitives, Radix `Slot`, and CVA-styled components. That path looks like a shadcn clone: headless parts leak as public compound APIs (`DialogTrigger`, `AccordionContent`, …), and consumers assemble kits instead of using a designed surface.

We need a locked architecture that:

1. Keeps **behavior/accessibility** in a maintained headless library.
2. Keeps **look** in our CSS tokens (`--primary`, `--ring`, `--radius`, …) and existing niches (`atlas` | `folio` | `maison` × light/dark).
3. Gives product apps **one public component per primitive**, not a tree of Base UI parts.
4. Stays a **design system**, not a product (no BarberPoint or other app coupling).

Base UI (`@base-ui/react`) is unstyled and already used as the headless layer. This ADR records that choice and the wrapper rule. The Button rewrite in this change is the proof, not a full inventory migration.

---

## Decision

**The `@rtds/ui` component library is 1:1 wrappers over Base UI.**

| Rule | Meaning |
| --- | --- |
| 1:1 | One Base UI component → exactly one public export from `@rtds/ui`. |
| Parts only via props | Base UI compound parts (`Root`, `Trigger`, `Portal`, …) are swallowed inside our wrapper. Consumers do not import them. |
| CSS/tokens on top | Base UI stays unstyled. Variants and visuals use existing semantic CSS variables and Tailwind token classes. No new hex. |
| Native Base UI API | Prefer Base UI’s own composition (`render`, `nativeButton`) over Radix `Slot` / `asChild` when they conflict. |

Do **not** re-export `Button.Root` or any other Base UI namespace from `@rtds/ui`.

```txt
Product app
    │  import { Button } from '@rtds/ui'
    ▼
@rtds/ui Button          ← single public export
    │  className from CVA + tokens (--primary, --ring, …)
    ▼
@base-ui/react/button    ← headless behavior / a11y
```

Theming remains one generated theme CSS file + `.dark` on `<html>`. Switching mode remaps CSS variables; wrappers do not branch on brand. Runtime multi-brand switching is demo-only.

---

## PoC scope (this change)

**Button only.**

- Import `Button` from `@base-ui/react/button`.
- Public exports stay `Button` and `buttonVariants` (the CVA helper for token classes — not a Base UI leak).
- Remaining inventory (Accordion, Dialog, Select, …) stays on Radix until a later rollout. Each future component follows this same 1:1 rule.

---

## Public API (Button)

Kept (stable where practical):

- `variant`: `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link`
- `size`: `default` \| `sm` \| `lg` \| `icon`
- `fullWidth`, `loading`, `disabled`, `className`, standard button attributes
- `buttonVariants()` for token-backed classes (including link-styled `<a>`)

Adopted from Base UI (replaces Radix Slot):

- `render` — polymorphic element replacement
- `nativeButton` — set `false` when `render` is not a native `<button>` (e.g. `<div>`)
- `focusableWhenDisabled` — defaults to `true` while `loading` so focus is not dumped

### Breaking changes

| Before | After |
| --- | --- |
| `asChild` (Radix `Slot`) | **Removed.** Use `render` for non-link polymorphism. |
| `<Button asChild><a href={…}>…</a></Button>` | **Do not** route links through `Button`. Base UI Button always applies button semantics (`role="button"`). Style the `<a>` with `buttonVariants()`. |
| Unspecified `type` on a native `<button>` (HTML default `submit`) | Base UI requires **`type="submit"`** explicitly for form submit buttons. |
| `ref` typed as `HTMLButtonElement` | `ref` is `HTMLElement` (polymorphic `render`). |

Internal DS call sites that used `asChild` for CTAs (`SiteHeader`, `PricingTier`) now apply `buttonVariants()` to the anchor.

---

## Consequences

**Positive**

- One headless vendor, one public component per primitive.
- Visual system stays in tokens; brand × mode works without component edits.
- Compound-part sprawl is a future-wrapper problem, not a consumer API.

**Negative / follow-up**

- `asChild` consumers must migrate (small, documented).
- Other components still use Radix until wrapped the same way.
- Link-looking controls are `<a className={buttonVariants()}>`, not `<Button>`.

**Constraints**

- No shadcn kit clone, no new component kit, no visual redesign.
- No BarberPoint / product-app imports in `@rtds/ui`.
- Do not publish this PoC as a new npm major beyond normal package versioning.

---

## Non-goals

- Migrating Accordion, Dialog, Sheet, Select, Tabs, Tooltip, or other Radix components in this change
- Cloning shadcn’s file structure, CLI, or compound public API
- Redesigning color, type, radius, or inventing hex
- Penpot / Figma sync work
- Debating Base UI vs shadcn vs another kit
- Publishing to the npm registry

---

## Rollout (later)

1. For each remaining primitive: wrap the Base UI component (or compound tree) behind **one** `@rtds/ui` export.
2. Swallow parts; expose behavior through props / slots we own.
3. Keep CVA + semantic tokens for visuals.
4. Update Storybook + demo per component. Do not couple wrappers to a product app.
