export interface OklchColor {
    /** Lightness 0–1 */
    l: number;
    /** Chroma ≥ 0 */
    c: number;
    /** Hue 0–360 */
    h: number;
    /** Optional alpha 0–1 */
    a?: number;
}
export declare function formatOklch(color: OklchColor): string;
/**
 * Linear mix in OKLCH. Prefer CSS `linear-gradient(in oklch, …)` for
 * gradients in apps — this helper is for tooling / fallbacks.
 */
export declare function oklchMix(a: OklchColor, b: OklchColor, t: number): OklchColor;
/** CSS gradient between two OKLCH colors, interpolating in oklch. */
export declare function gradientStop(a: OklchColor, b: OklchColor): string;
