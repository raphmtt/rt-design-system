# Human Quickstart Guide

Build a landing page in 15 minutes without an AI agent.

---

## Prerequisites

- Node.js 20.19+
- pnpm 9+

---

## Option 1: Use the Create CLI (Recommended)

```bash
# Scaffold a new landing page project
pnpm create @rtds landing my-site

# Install and run
cd my-site
pnpm install
pnpm dev
```

Open http://localhost:3000 to see your landing page.

---

## Developing in the Monorepo

If you're working in this monorepo, the demo resolves packages from TypeScript source directly (no build step needed):

```bash
pnpm install
pnpm tokens:build  # Required once for CSS variables
pnpm --filter demo dev
```

> Vite uses the `development` export condition to resolve `@rtds/*` packages from source. This enables HMR across package boundaries.

---

## Option 2: Add to Existing Project

### 1. Install Packages

```bash
pnpm add @rtds/ui @rtds/tokens @rtds/tw-preset
```

### 2. Import Styles

In your main CSS file:

```css
@import "@rtds/tw-preset/styles.css";
```

### 3. Add Providers

Wrap your app with theme providers:

```tsx
import { ThemeProvider, BrandProvider } from '@rtds/ui';

function App() {
  return (
    <BrandProvider defaultBrand="atlas">
      <ThemeProvider defaultMode="system">
        {/* Your app */}
      </ThemeProvider>
    </BrandProvider>
  );
}
```

---

## Build a Landing Page

### 1. Start with Layout

```tsx
import { SiteShell, SiteHeader, SiteFooter, Container } from '@rtds/ui';

function LandingPage() {
  return (
    <SiteShell>
      <SiteHeader
        logo={<Logo />}
        navItems={[
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
        ]}
        cta={{ label: 'Get Started', href: '/signup' }}
      />
      
      <main>
        {/* Sections go here */}
      </main>
      
      <SiteFooter />
    </SiteShell>
  );
}
```

### 2. Add Hero Section

```tsx
import { Hero, Button } from '@rtds/ui';

<Hero
  eyebrow="New in 2024"
  title="Build beautiful landing pages"
  description="A design system that makes it easy to create stunning, responsive landing pages."
  actions={
    <>
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </>
  }
/>
```

### 3. Add Features

```tsx
import { Section, FeatureGrid, FeatureGridItem, Icon, ICON_SIZE_FEATURE } from '@rtds/ui';
import { Zap, Shield, Palette } from 'lucide-react';

<Section id="features" tone="muted">
  <FeatureGrid
    title="Everything you need"
    description="Built with modern best practices"
  >
    <FeatureGridItem
      icon={<Icon icon={Zap} size={ICON_SIZE_FEATURE} />}
      title="Lightning Fast"
      description="Optimized for performance with minimal JavaScript."
    />
    <FeatureGridItem
      icon={<Icon icon={Shield} size={ICON_SIZE_FEATURE} />}
      title="Accessible"
      description="WCAG 2.2 AA compliant out of the box."
    />
    <FeatureGridItem
      icon={<Icon icon={Palette} size={ICON_SIZE_FEATURE} />}
      title="Themeable"
      description="Change niches and modes without touching code."
    />
  </FeatureGrid>
</Section>
```

### 4. Add CTA Section

```tsx
import { CTASection, Button } from '@rtds/ui';

<CTASection
  title="Ready to get started?"
  description="Join thousands of teams building better landing pages."
  actions={
    <>
      <Button size="lg">Start Free Trial</Button>
      <Button size="lg" variant="ghost">Contact Sales</Button>
    </>
  }
/>
```

---

## Theming

### Change Brand

Set `data-brand` on `<html>`:

```html
<html data-brand="folio">
```

Or use the BrandProvider:

```tsx
<BrandProvider defaultBrand="folio">
```

Niches: `atlas` (default), `folio`, `maison`. Stored `aurora` / `editorial` ids migrate to `atlas`.

### Change Mode

Toggle `.dark` class on `<html>`:

```html
<html class="dark">
```

Or use the ThemeProvider:

```tsx
<ThemeProvider defaultMode="dark">
```

### Add Theme Controls

```tsx
import { ModeToggle, BrandSelect } from '@rtds/ui';

// In your header or settings
<ModeToggle />
<BrandSelect />
```

---

## Customize Tokens

Override CSS variables in your CSS:

```css
:root {
  --primary: #1e3a5f; /* Custom primary color */
  --radius: 1rem; /* Rounder corners */
}
```

---

## Responsive Design

All components are responsive by default:

- Mobile: 375px (default)
- Tablet: 768px (`md:`)
- Desktop: 1024px (`lg:`)
- Wide: 1440px (`xl:`)

Test at these breakpoints before shipping.

---

## Pre-ship Checklist

Before launching, complete the checklist in `PERF-A11Y-CHECKLIST.md`:

- [ ] Landmark regions (header, main, footer, nav)
- [ ] Skip to content link works
- [ ] Focus visible on all interactive elements
- [ ] Hit targets ≥ 44×44px
- [ ] Text contrast passes (both themes)
- [ ] Keyboard navigation works
- [ ] Reduced motion respected

---

## Resources

- **Storybook:** See all components and their variants
- **DESIGN.md:** Visual principles and token rules
- **HOW-TO-THEME.md:** Change colors, fonts, and icons
- **FIGMA-CODE-SYNC.md:** For designers working with the Figma kit
