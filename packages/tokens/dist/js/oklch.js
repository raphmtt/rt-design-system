function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}
function roundTo(n, decimals) {
    return Number(n.toFixed(decimals));
}
function formatNumber(n, decimals) {
    return String(Number(n.toFixed(decimals)));
}
export function formatOklch(color) {
    const l = formatNumber(color.l, 4);
    const c = formatNumber(color.c, 4);
    const h = formatNumber(color.h, 2);
    if (color.a !== undefined && color.a < 1) {
        return `oklch(${l} ${c} ${h} / ${formatNumber(color.a, 4)})`;
    }
    return `oklch(${l} ${c} ${h})`;
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
/** Shortest-path hue interpolation (degrees). */
function mixHue(h1, h2, t) {
    const delta = ((h2 - h1 + 540) % 360) - 180;
    return (h1 + delta * t + 360) % 360;
}
/**
 * Linear mix in OKLCH. Prefer CSS `linear-gradient(in oklch, …)` for
 * gradients in apps — this helper is for tooling / fallbacks.
 */
export function oklchMix(a, b, t) {
    const x = clamp(t, 0, 1);
    const mixed = {
        l: roundTo(lerp(a.l, b.l, x), 4),
        c: roundTo(lerp(a.c, b.c, x), 4),
        h: roundTo(mixHue(a.h, b.h, x), 2),
    };
    if (a.a !== undefined || b.a !== undefined) {
        const alpha = roundTo(lerp(a.a ?? 1, b.a ?? 1, x), 4);
        if (alpha < 1)
            mixed.a = alpha;
    }
    if (mixed.c === 0)
        mixed.h = 0;
    return mixed;
}
/** CSS gradient between two OKLCH colors, interpolating in oklch. */
export function gradientStop(a, b) {
    return `linear-gradient(in oklch, ${formatOklch(a)}, ${formatOklch(b)})`;
}
