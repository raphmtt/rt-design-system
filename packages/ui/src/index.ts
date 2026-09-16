// Acme UI Component Library

// Utils
export { cn } from './lib/utils';

// Providers
export { ThemeProvider, useTheme } from './providers/theme-provider';
export { BrandProvider, useBrand } from './providers/brand-provider';

// Foundations
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { Textarea } from './components/textarea';
export type { TextareaProps } from './components/textarea';

export { Label } from './components/label';

export { Checkbox } from './components/checkbox';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './components/select';

export { Switch } from './components/switch';

export { Badge, badgeVariants } from './components/badge';
export type { BadgeProps } from './components/badge';

export { Avatar, AvatarImage, AvatarFallback } from './components/avatar';

export { Separator } from './components/separator';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './components/sheet';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/accordion';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/tooltip';

export { Skeleton } from './components/skeleton';

export { Alert, AlertTitle, AlertDescription } from './components/alert';

export { TextLink } from './components/text-link';
export type { TextLinkProps } from './components/text-link';

export { ModeToggle, ModeSelect } from './components/mode-toggle';
export { BrandSelect } from './components/brand-select';
export { Icon, ICON_SIZE_UI, ICON_SIZE_FEATURE, ICON_STROKE_WIDTH } from './components/icon';
export type { IconProps } from './components/icon';

// Layout (Phase 3)
export { Container } from './components/layout/container';
export { Section } from './components/layout/section';
export { Stack } from './components/layout/stack';
export { Grid } from './components/layout/grid';
export { Bleed } from './components/layout/bleed';
export { SiteShell } from './components/layout/site-shell';

// Navigation (Phase 3)
export { SiteHeader } from './components/navigation/site-header';
export { SiteFooter } from './components/navigation/site-footer';
export { AnnouncementBar } from './components/navigation/announcement-bar';

// Marketing (Phase 3)
export { Hero } from './components/marketing/hero';
export { LogoCloud } from './components/marketing/logo-cloud';
export { FeatureGrid, FeatureGridItem } from './components/marketing/feature-grid';
export { FeatureSplit } from './components/marketing/feature-split';
export { StatsRow, StatItem } from './components/marketing/stats-row';
export { PricingTable, PricingTier } from './components/marketing/pricing-table';
export { Testimonial, TestimonialGrid } from './components/marketing/testimonial';
export { FAQ } from './components/marketing/faq';
export { CTASection } from './components/marketing/cta-section';
export { ContactForm } from './components/marketing/contact-form';
export { NewsletterForm } from './components/marketing/newsletter-form';

// Feedback
export { FormField } from './components/form-field';
export { EmptyState } from './components/empty-state';
export { ErrorState } from './components/error-state';
