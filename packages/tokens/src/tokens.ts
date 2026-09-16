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

export type Brand = 'atlas' | 'folio' | 'maison';
export type Mode = 'light' | 'dark';

export const brands: Brand[] = ['atlas', 'folio', 'maison'];
export const modes: Mode[] = ['light', 'dark'];

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
