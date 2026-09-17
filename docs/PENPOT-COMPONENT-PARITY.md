# Penpot ↔ Code Component Parity

Component-by-component status between the Penpot library (`rt-design-system`) and the React exports in `packages/ui`.

## Status legend

| Status | Meaning |
|--------|---------|
| `ok` | Present in the Penpot file **and** exported from `packages/ui` with a matching name |
| `missing-in-code` | In the Penpot file but **not** in `packages/ui` — listed as a gap, not implemented in this PR |
| `missing-in-penpot` | In `packages/ui` but absent from the Penpot file |

This table is the current snapshot for the shared inventory. Gaps are **intentional** — the codebase is the API SoT; missing React components are tracked here, not built silently.

---

## Primitives

| Component | In Penpot | In packages/ui | Status |
|-----------|-----------|----------------|--------|
| Button | `Button` | `Button`, `buttonVariants`, `ButtonProps` | `ok` |
| Badge | `Badge` | `Badge`, `badgeVariants`, `BadgeProps` | `ok` |
| Avatar/Image | `Avatar/Image` | `AvatarImage` (inside `avatar.tsx`) | `ok` |
| Avatar/Fallback | `Avatar/Fallback` | `AvatarFallback` (inside `avatar.tsx`) | `ok` |
| Separator | `Separator` | `Separator` | `ok` |
| Skeleton | `Skeleton` | `Skeleton` | `ok` |
| TextLink | `TextLink` | `TextLink`, `TextLinkProps` | `ok` |

## Forms

| Component | In Penpot | In packages/ui | Status |
|-----------|-----------|----------------|--------|
| Label | `Label` | `Label` | `ok` |
| Input | `Input` | `Input`, `InputProps` | `ok` |
| Textarea | `Textarea` | `Textarea`, `TextareaProps` | `ok` |
| Checkbox | `Checkbox` | `Checkbox` | `ok` |
| Switch | `Switch` | `Switch` | `ok` |
| Select/Trigger | `Select/Trigger` | `SelectTrigger` | `ok` |
| Select/Content | `Select/Content` | `SelectContent` | `ok` |
| Select/Item | `Select/Item` | `SelectItem` | `ok` |
| FormField | `FormField` | `FormField` | `ok` |

## Feedback

| Component | In Penpot | In packages/ui | Status |
|-----------|-----------|----------------|--------|
| Alert | `Alert` | `Alert`, `AlertTitle`, `AlertDescription` | `ok` |
| Dialog (+ anatomy) | `Dialog` + anatomy | `Dialog`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogTrigger` | `ok` |
| Sheet | `Sheet` | `Sheet` + anatomy (`SheetContent`, `SheetHeader`, `SheetTitle`, ...) | `ok` |
| Tooltip | `Tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | `ok` |
| Accordion | `Accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | `ok` |
| Tabs/* | `Tabs/*` anatomy | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `ok` |
| EmptyState | `EmptyState` | `EmptyState` | `ok` |
| ErrorState | `ErrorState` | `ErrorState` | `ok` |

## Navigation / Layout

| Component | In Penpot | In packages/ui | Status |
|-----------|-----------|----------------|--------|
| AnnouncementBar | `AnnouncementBar` | `AnnouncementBar` | `ok` |
| SiteHeader | `SiteHeader` | `SiteHeader` | `ok` |
| SiteFooter | `SiteFooter` | `SiteFooter` | `ok` |
| Container | `Container` | `Container` | `ok` |
| Section | `Section` | `Section` | `ok` |
| Stack | `Stack` | `Stack` | `ok` |
| Grid | `Grid` | `Grid` | `ok` |
| Bleed | `Bleed` | `Bleed` | `ok` |
| SiteShell | `SiteShell` | `SiteShell` | `ok` |

## Marketing

| Component | In Penpot | In packages/ui | Status |
|-----------|-----------|----------------|--------|
| Hero | `Hero` | `Hero` | `ok` |
| LogoCloud | `LogoCloud` | `LogoCloud` | `ok` |
| FeatureGrid | `FeatureGrid` | `FeatureGrid` | `ok` |
| FeatureGridItem | `FeatureGridItem` | `FeatureGridItem` | `ok` |
| FeatureSplit | `FeatureSplit` | `FeatureSplit` | `ok` |
| StatsRow | `StatsRow` | `StatsRow` | `ok` |
| StatItem | `StatItem` | `StatItem` | `ok` |
| PricingTable | `PricingTable` | `PricingTable` | `ok` |
| PricingTier | `PricingTier` | `PricingTier` | `ok` |
| Testimonial | `Testimonial` | `Testimonial` | `ok` |
| TestimonialGrid | `TestimonialGrid` | `TestimonialGrid` | `ok` |
| FAQ | `FAQ` | `FAQ` | `ok` |
| CTASection | `CTASection` | `CTASection` | `ok` |
| ContactForm | `ContactForm` | `ContactForm` | `ok` |
| NewsletterForm | `NewsletterForm` | `NewsletterForm` | `ok` |
| Card (+ anatomy) | `Card` + anatomy | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent` | `ok` |

---

## Notes

- **All 40 shared rows are currently `ok`** — no `missing-in-code` or `missing-in-penpot` gaps in the shared inventory.
- **Demo-only chrome is excluded:** `BrandSelect`, `ModeToggle`, and `ModeSelect` belong in `apps/demo`, not in the Penpot↔shared-UI parity surface.
- Names must match **exactly** (PascalCase, `Select/Trigger` → `SelectTrigger`, `Avatar/Image` → `AvatarImage`). Keep this table updated when components are added/renamed on either side.