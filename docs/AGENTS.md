# Agent Instructions

Instructions for AI agents working with this design system.

---

## Before Making Changes

1. Read `docs/DESIGN.md` for visual principles and token rules
2. Check component inventory in the technical design
3. Review existing Storybook stories for patterns

---

## After UI Edits

**Always run these commands:**

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Fix all errors before committing.

---

## Key Rules

### Tokens

- ✓ Use semantic tokens (`bg-background`, `text-foreground`, `border-border`)
- ✗ Never use raw color values (`bg-zinc-100`, `text-gray-500`)
- ✗ Never use arbitrary values (`w-[437px]`, `text-[13px]`)

### Components

- ✓ Use component variants from props (`variant="outline"`, `size="lg"`)
- ✓ Use `cn()` utility for class merging
- ✗ Don't override component internal styles in consumer code
- ✗ Don't modify components in `apps/demo` — only use exports from `@acme/ui`

### Dark Mode

- ✓ Every component must work in dark mode
- ✓ Test with `.dark` class on `<html>`
- ✓ Use semantic tokens that auto-switch

### Accessibility

- ✓ Interactive elements need focus-visible styles
- ✓ Buttons/links need ≥ 44×44px hit area
- ✓ Forms need proper labels and error states
- ✓ Respect `prefers-reduced-motion`

### Responsive

- ✓ Mobile-first approach
- ✓ Test at 375px and 1440px
- ✓ Use Tailwind breakpoint prefixes (`md:`, `lg:`)

---

## Creating New Components

### 1. Create Component File

```tsx
// packages/ui/src/components/my-component.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const myComponentVariants = cva(
  'base-classes-here',
  {
    variants: {
      variant: {
        default: 'default-variant-classes',
        // ...
      },
      size: {
        sm: 'size-sm-classes',
        md: 'size-md-classes',
        lg: 'size-lg-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export function MyComponent({
  className,
  variant,
  size,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### 2. Export from Index

```tsx
// packages/ui/src/index.ts
export * from './components/my-component';
```

### 3. Create Story

```tsx
// apps/storybook/stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '@acme/ui';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {},
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <MyComponent variant="default">Default</MyComponent>
      {/* ... */}
    </div>
  ),
};
```

### 4. Verify

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter storybook dev  # Check in Storybook
```

---

## File Locations

| What | Where |
|------|-------|
| Components | `packages/ui/src/components/` |
| Utils | `packages/ui/src/lib/` |
| Providers | `packages/ui/src/providers/` |
| Tokens (source) | `design/tokens/` |
| Tokens (built) | `packages/tokens/dist/` |
| Stories | `apps/storybook/stories/` |
| Demo app | `apps/demo/src/` |

---

## Common Patterns

### Container with Section

```tsx
<Section tone="muted">
  <Container>
    <h2>Section Title</h2>
    {/* content */}
  </Container>
</Section>
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Theme-Aware Styles

```tsx
// These automatically switch between light/dark:
<div className="bg-background text-foreground border-border" />

// For theme-specific overrides:
<div className="bg-white dark:bg-zinc-900" />
```

---

## Troubleshooting

### Lint errors about raw colors

Use semantic tokens instead:
- `bg-red-500` → `bg-destructive`
- `text-gray-500` → `text-muted-foreground`
- `border-gray-200` → `border-border`

### TypeScript errors after adding component

1. Check exports in `packages/ui/src/index.ts`
2. Run `pnpm build` in packages/ui
3. Check import paths in consumer

### Styles not applying

1. Verify `@acme/tw-preset/styles.css` is imported
2. Check class names use semantic tokens
3. Run `pnpm tokens:build` to regenerate CSS
