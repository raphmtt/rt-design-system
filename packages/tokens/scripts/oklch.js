/**
 * sRGB hex → OKLCH using Björn Ottosson's OKLab.
 * @see https://bottosson.github.io/posts/oklab/
 *
 * Used at ingest (Penpot/Figma hex handoff → theme JSON). After migration,
 * `*.theme.rtds.json` is the source of truth — not hex.
 */

export function hexToOklch(hex) {
  const { r, g, b } = hexToSrgb(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bLab = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const C = Math.hypot(a, bLab);
  let h = Math.atan2(bLab, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return roundOklch({ l: L, c: C, h });
}

export function roundOklch(color) {
  const l = roundTo(color.l, 4);
  const c = roundTo(color.c, 4);
  const h = c === 0 ? 0 : ((roundTo(color.h, 2) % 360) + 360) % 360;
  const result = { l, c, h };
  if (color.a !== undefined && color.a !== 1) {
    result.a = roundTo(color.a, 4);
  }
  return result;
}

export function formatOklchCss(color) {
  const l = formatNumber(color.l, 4);
  const c = formatNumber(color.c, 4);
  const h = formatNumber(color.h, 2);
  if (color.a !== undefined && color.a < 1) {
    return `oklch(${l} ${c} ${h} / ${formatNumber(color.a, 4)})`;
  }
  return `oklch(${l} ${c} ${h})`;
}

export function assertOklch(color, path) {
  if (!color || typeof color !== 'object' || Array.isArray(color)) {
    throw new Error(`${path}: expected an OKLCH object { l, c, h }`);
  }

  const keys = Object.keys(color);
  for (const key of keys) {
    if (key !== 'l' && key !== 'c' && key !== 'h' && key !== 'a') {
      throw new Error(
        `${path}: unknown field "${key}". Color SoT is OKLCH channels only (no hex/rgb/hsl).`
      );
    }
  }

  assertChannel(color.l, path, 'l', 0, 1);
  assertChannel(color.c, path, 'c', 0, Infinity);
  assertChannel(color.h, path, 'h', 0, 360);
  if (color.a !== undefined) {
    assertChannel(color.a, path, 'a', 0, 1);
  }
}

function assertChannel(value, path, name, min, max) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${path}.${name}: expected a finite number`);
  }
  if (value < min || value > max) {
    throw new Error(`${path}.${name}: ${value} is outside [${min}, ${max}]`);
  }
}

function hexToSrgb(hex) {
  const raw = hex.trim().replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(raw) && !/^[0-9a-fA-F]{3}$/.test(raw)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : raw;
  return {
    r: parseInt(full.slice(0, 2), 16) / 255,
    g: parseInt(full.slice(2, 4), 16) / 255,
    b: parseInt(full.slice(4, 6), 16) / 255,
  };
}

function srgbToLinear(channel) {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function roundTo(n, decimals) {
  return Number(n.toFixed(decimals));
}

function formatNumber(n, decimals) {
  return trimZeros(n.toFixed(decimals));
}

/** Decimal string without IEEE-754 residue — safe to embed in JSON. */
export function jsonNumber(n, decimals) {
  return trimZeros(n.toFixed(decimals));
}

function trimZeros(s) {
  if (!s.includes('.')) return s === '-0' ? '0' : s;
  const trimmed = s.replace(/\.?0+$/, '');
  return trimmed === '-0' ? '0' : trimmed;
}

export function serializeThemeJson(theme) {
  const color = (c) => {
    const parts = [
      `"l": ${jsonNumber(c.l, 4)}`,
      `"c": ${jsonNumber(c.c, 4)}`,
      `"h": ${jsonNumber(c.h, 2)}`,
    ];
    if (c.a !== undefined && c.a < 1) {
      parts.push(`"a": ${jsonNumber(c.a, 4)}`);
    }
    return `{ ${parts.join(', ')} }`;
  };

  const map = (obj) => {
    const lines = Object.entries(obj).map(
      ([key, value]) => `    "${key}": ${color(value)}`
    );
    return `{\n${lines.join(',\n')}\n  }`;
  };

  return [
    '{',
    `  "$schema": ${JSON.stringify(theme.$schema)},`,
    `  "name": ${JSON.stringify(theme.name)},`,
    `  "colorSpace": ${JSON.stringify(theme.colorSpace)},`,
    `  "light": ${map(theme.light)},`,
    `  "dark": ${map(theme.dark)},`,
    `  "radius": ${JSON.stringify(theme.radius)}`,
    '}',
    '',
  ].join('\n');
}
