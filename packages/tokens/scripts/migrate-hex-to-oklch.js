/**
 * One-shot / ingest converter: approved hex palettes → `*.theme.rtds.json`.
 *
 * Penpot (and other design tools) may still speak hex. After this script runs,
 * repo source of truth is OKLCH in packages/tokens/themes/.
 *
 * Usage:
 *   node scripts/migrate-hex-to-oklch.js
 *
 * Reads live `design/tokens/themes/{name}-{light|dark}.json` when present
 * (legacy hex files). Otherwise uses the frozen snapshot below.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hexToOklch, serializeThemeJson } from './oklch.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(packageDir, '..', '..');
const themesOutDir = path.join(packageDir, 'themes');
const legacyThemesDir = path.join(rootDir, 'design', 'tokens', 'themes');

/** Frozen Rafael-approved hex palettes (pre-OKLCH). Not runtime SoT. */
const HEX_SNAPSHOT = {
  atlas: {
    radius: '0.5rem',
    light: {
      background: '#FAFAFA',
      foreground: '#18181B',
      card: '#FAFAFA',
      cardForeground: '#18181B',
      primary: '#18181B',
      primaryForeground: '#FAFAFA',
      secondary: '#F4F4F5',
      secondaryForeground: '#18181B',
      muted: '#F4F4F5',
      mutedForeground: '#71717A',
      accent: '#EEF2FF',
      accentForeground: '#3730A3',
      destructive: '#DC2626',
      destructiveForeground: '#FFFFFF',
      border: '#E4E4E7',
      input: '#E4E4E7',
      ring: '#4F46E5',
      success: '#15803D',
      successForeground: '#FFFFFF',
      warning: '#B45309',
      warningForeground: '#FFFFFF',
    },
    dark: {
      background: '#09090B',
      foreground: '#FAFAFA',
      card: '#09090B',
      cardForeground: '#FAFAFA',
      primary: '#FAFAFA',
      primaryForeground: '#18181B',
      secondary: '#27272A',
      secondaryForeground: '#FAFAFA',
      muted: '#27272A',
      mutedForeground: '#A1A1AA',
      accent: '#1E1B4B',
      accentForeground: '#C7D2FE',
      destructive: '#F87171',
      destructiveForeground: '#450A0A',
      border: '#27272A',
      input: '#27272A',
      ring: '#818CF8',
      success: '#4ADE80',
      successForeground: '#09090B',
      warning: '#FBBF24',
      warningForeground: '#09090B',
    },
  },
  folio: {
    radius: '0.375rem',
    light: {
      background: '#F7F3EE',
      foreground: '#1C1917',
      card: '#F7F3EE',
      cardForeground: '#1C1917',
      primary: '#9A3412',
      primaryForeground: '#FFF7ED',
      secondary: '#EDE6DC',
      secondaryForeground: '#1C1917',
      muted: '#EDE6DC',
      mutedForeground: '#57534E',
      accent: '#FEF3C7',
      accentForeground: '#92400E',
      destructive: '#B91C1C',
      destructiveForeground: '#FFFFFF',
      border: '#E7E0D5',
      input: '#E7E0D5',
      ring: '#9A3412',
      success: '#166534',
      successForeground: '#FFFFFF',
      warning: '#A16207',
      warningForeground: '#FFFFFF',
    },
    dark: {
      background: '#1C1917',
      foreground: '#FAF7F2',
      card: '#1C1917',
      cardForeground: '#FAF7F2',
      primary: '#E7B08A',
      primaryForeground: '#1C1917',
      secondary: '#292524',
      secondaryForeground: '#FAF7F2',
      muted: '#292524',
      mutedForeground: '#A8A29E',
      accent: '#44403C',
      accentForeground: '#FDE68A',
      destructive: '#F87171',
      destructiveForeground: '#450A0A',
      border: '#3F3A36',
      input: '#3F3A36',
      ring: '#E7B08A',
      success: '#86EFAC',
      successForeground: '#1C1917',
      warning: '#FCD34D',
      warningForeground: '#1C1917',
    },
  },
  maison: {
    radius: '0.75rem',
    light: {
      background: '#FBFAF7',
      foreground: '#1A2E24',
      card: '#FBFAF7',
      cardForeground: '#1A2E24',
      primary: '#3F6F5A',
      primaryForeground: '#F7FBF8',
      secondary: '#F0EBE3',
      secondaryForeground: '#1A2E24',
      muted: '#F0EBE3',
      mutedForeground: '#5C6B62',
      accent: '#E8F0EB',
      accentForeground: '#2D4A3E',
      destructive: '#C2410C',
      destructiveForeground: '#FFFFFF',
      border: '#E5DFD5',
      input: '#E5DFD5',
      ring: '#3F6F5A',
      success: '#2F6F4E',
      successForeground: '#FFFFFF',
      warning: '#B45309',
      warningForeground: '#FFFFFF',
    },
    dark: {
      background: '#121A16',
      foreground: '#EEF4F0',
      card: '#121A16',
      cardForeground: '#EEF4F0',
      primary: '#8FBC9F',
      primaryForeground: '#121A16',
      secondary: '#1E2A24',
      secondaryForeground: '#EEF4F0',
      muted: '#1E2A24',
      mutedForeground: '#9BB0A4',
      accent: '#24332C',
      accentForeground: '#C5E0D0',
      destructive: '#FB923C',
      destructiveForeground: '#431407',
      border: '#2A3830',
      input: '#2A3830',
      ring: '#8FBC9F',
      success: '#86EFAC',
      successForeground: '#121A16',
      warning: '#FBBF24',
      warningForeground: '#121A16',
    },
  },
};

function loadLegacyHex(name, mode) {
  const file = path.join(legacyThemesDir, `${name}-${mode}.json`);
  if (!fs.existsSync(file)) return null;
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  const colors = {};
  for (const [key, token] of Object.entries(json.semantic ?? {})) {
    if (token?.value) colors[key] = token.value;
  }
  return {
    colors,
    radius: json.component?.radius?.value,
  };
}

function toOklchMap(hexMap) {
  const out = {};
  for (const [key, hex] of Object.entries(hexMap)) {
    out[key] = hexToOklch(hex);
  }
  return out;
}

fs.mkdirSync(themesOutDir, { recursive: true });

for (const [name, snapshot] of Object.entries(HEX_SNAPSHOT)) {
  const lightLegacy = loadLegacyHex(name, 'light');
  const darkLegacy = loadLegacyHex(name, 'dark');
  const source = lightLegacy || darkLegacy ? 'legacy hex JSON' : 'frozen hex snapshot';

  const lightHex = lightLegacy?.colors ?? snapshot.light;
  const darkHex = darkLegacy?.colors ?? snapshot.dark;
  const radius = lightLegacy?.radius ?? darkLegacy?.radius ?? snapshot.radius;

  const theme = {
    $schema: '../theme.rtds.schema.json',
    name,
    colorSpace: 'oklch',
    light: toOklchMap(lightHex),
    dark: toOklchMap(darkHex),
    radius,
  };

  const outFile = path.join(themesOutDir, `${name}.theme.rtds.json`);
  fs.writeFileSync(outFile, serializeThemeJson(theme));
  console.log(`Wrote ${path.relative(rootDir, outFile)} from ${source}`);
}

console.log('Hex → OKLCH migration complete. Theme JSON is now the color SoT.');
