export declare const brands: readonly ["atlas", "folio", "maison"];
export declare const modes: readonly ["light", "dark"];
export declare const brandLabels: Record<"atlas" | "folio" | "maison", string>;
export type Brand = (typeof brands)[number];
export type Mode = (typeof modes)[number];
export declare function isBrand(value: string | null | undefined): value is Brand;
export declare function migrateBrand(value: string | null | undefined): Brand;
export declare const tokenNames: readonly [
  "background", "foreground", "card", "card-foreground",
  "primary", "primary-foreground", "secondary", "secondary-foreground",
  "muted", "muted-foreground", "accent", "accent-foreground",
  "destructive", "destructive-foreground", "border", "input", "ring",
  "radius", "font-display", "font-heading", "font-body", "font-mono", "space-section-y"
];
export type TokenName = (typeof tokenNames)[number];
