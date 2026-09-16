// Token type definitions - will be populated by Style Dictionary build
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

export type Brand = 'aurora' | 'editorial';
export type Mode = 'light' | 'dark';

export const brands: Brand[] = ['aurora', 'editorial'];
export const modes: Mode[] = ['light', 'dark'];
