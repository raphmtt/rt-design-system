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
export declare const brands: Brand[];
export declare const modes: Mode[];
export declare const DEFAULT_THEME: Brand;
export declare const brandLabels: Record<Brand, string>;
export declare function isBrand(value: string | null | undefined): value is Brand;
/** Map stored ids (including DEV-4 aurora/editorial) to a current niche. */
export declare function migrateBrand(value: string | null | undefined): Brand;
export declare const tokenNames: readonly ["background", "foreground", "card", "card-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "border", "input", "ring", "success", "success-foreground", "warning", "warning-foreground", "radius", "font-display", "font-heading", "font-body", "font-mono", "space-section-y"];
export type TokenName = (typeof tokenNames)[number];
