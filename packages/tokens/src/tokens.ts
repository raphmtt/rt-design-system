export interface ColorTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface SpacingTokens {
  sectionY: string;
  containerPx: string;
}

export interface RadiusTokens {
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

/** Playground theme id. Product apps ship exactly one theme CSS file. */
export type Brand = 'atlas' | 'folio' | 'maison';
export type Mode = 'light' | 'dark';

export const brands: Brand[] = ['atlas', 'folio', 'maison'];
export const modes: Mode[] = ['light', 'dark'];

export const DEFAULT_THEME: Brand = 'atlas';

export const brandLabels: Record<Brand, string> = {
  atlas: 'Atlas',
  folio: 'Folio',
  maison: 'Maison',
};

const LEGACY_BRANDS: Record<string, Brand> = {
  aurora: 'atlas',
  editorial: 'atlas',
};

export function isBrand(value: string | null | undefined): value is Brand {
  return value === 'atlas' || value === 'folio' || value === 'maison';
}

/** Map stored ids (including DEV-4 aurora/editorial) to a current niche. */
export function migrateBrand(value: string | null | undefined): Brand {
  if (isBrand(value)) return value;
  if (value && value in LEGACY_BRANDS) return LEGACY_BRANDS[value]!;
  return 'atlas';
}

export const tokenNames = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'radius',
  'font-display',
  'font-heading',
  'font-body',
  'font-mono',
  'space-section-y',
] as const;

export type TokenName = (typeof tokenNames)[number];
