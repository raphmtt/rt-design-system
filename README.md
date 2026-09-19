# RTDS Design System

A versioned, installable landing/sites design system built with React, Tailwind CSS v4, BaseUI and CSS variable tokens.

## Features

- 🎨 **Multi-niche theming** — Switch between `atlas`, `folio`, and `maison`
- 🌙 **Dark mode** — Mandatory on all components
- 📱 **Responsive** — Mobile-first, tested at 375px and 1440px
- ♿ **Accessible** — WCAG 2.2 AA compliant
- 🎯 **Token-based** — CSS variables for easy customization
- 📦 **Installable packages** — Use via npm or scaffold with CLI

## Quick Start

### Option 1: Create CLI

```bash
pnpm create @rtds landing my-site
cd my-site
pnpm install
pnpm dev
```

### Option 2: Install Packages

```bash
pnpm add @rtds/ui @rtds/tokens @rtds/tw-preset
```

Import styles in your CSS:

```css
@import "@rtds/tw-preset/styles.css";
```

## Packages

| Package | Description |
|---------|-------------|
| `@rtds/tokens` | Design tokens (CSS variables + JS types) |
| `@rtds/tw-preset` | Tailwind CSS preset and styles |
| `@rtds/ui` | React components |
| `@rtds/eslint-config` | ESLint configuration |
| `@rtds/create` | CLI scaffolding tool |

## Development

```bash
# Install dependencies
pnpm install

# Build tokens (required once)
pnpm tokens:build

# Run demo site (resolves @rtds/* packages from source in dev)
pnpm --filter demo dev

# Run Storybook
pnpm --filter storybook dev

# Build all packages (for production or CI)
pnpm build

# Lint and typecheck
pnpm lint
pnpm typecheck
```

> **Note:** In development mode, Vite resolves workspace packages directly from TypeScript source via the `development` export condition. No manual package build is needed before running the demo.

## Theming

### Niches

Set `data-brand` on `<html>`:

```html
<html data-brand="atlas">  <!-- or "folio" | "maison" -->
```

### Modes

Toggle `.dark` class on `<html>`:

```html
<html class="dark">
```

## Documentation

- [HUMAN-QUICKSTART.md](./docs/HUMAN-QUICKSTART.md) — Build a landing page in 15 minutes
- [HOW-TO-THEME.md](./docs/HOW-TO-THEME.md) — Change colors, fonts, and icons
- [DESIGN.md](./docs/DESIGN.md) — Visual principles and token rules
- [PERF-A11Y-CHECKLIST.md](./docs/PERF-A11Y-CHECKLIST.md) — Pre-ship checklist
- [FIGMA-CODE-SYNC.md](./docs/FIGMA-CODE-SYNC.md) — Figma ↔ code sync guide
- [ADR-001-base-ui-wrappers.md](./docs/ADR-001-base-ui-wrappers.md) — FINAL: 1:1 Base UI wrappers (Button PoC)
- [AGENTS.md](./docs/AGENTS.md) — Instructions for AI agents

## Tech Stack

- React 19 + TypeScript strict
- Tailwind CSS v4
- Base UI (`@base-ui/react`) — 1:1 wrappers; Button is the PoC ([ADR-001](./docs/ADR-001-base-ui-wrappers.md))
- Remaining inventory still on Radix until rolled out the same way
- Storybook 8+
- Vite
- pnpm workspaces + Turborepo

## License

MIT
