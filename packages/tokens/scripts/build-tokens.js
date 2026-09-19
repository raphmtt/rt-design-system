/**
 * First-party theme generator.
 * Discovers packages/tokens/themes/*.theme.rtds.json and emits CSS.
 * No third-party theming frameworks.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertOklch, formatOklchCss, roundOklch } from './oklch.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(packageDir, '..', '..');
const themesDir = path.join(packageDir, 'themes');
const outputDir = path.join(packageDir, 'dist');
const primitivesPath = path.join(rootDir, 'design', 'tokens', 'primitive.json');

const DEFAULT_THEME = 'atlas';
const THEME_FILE_SUFFIX = '.theme.rtds.json';

const REQUIRED_COLOR_KEYS = [
  'background',
  'foreground',
  'card',
  'cardForeground',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'muted',
  'mutedForeground',
  'accent',
  'accentForeground',
  'destructive',
  'destructiveForeground',
  'border',
  'input',
  'ring',
  'success',
  'warning',
];

function fail(message) {
  console.error(`tokens build failed: ${message}`);
  process.exit(1);
}

function camelToKebab(name) {
  return name.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`);
}

function flattenTokens(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object' && 'value' in value) {
      result[newKey] = value.value;
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenTokens(value, newKey));
    }
  }
  return result;
}

function loadSharedVars() {
  const fallback = {
    'font-display': '"Instrument Serif"',
    'font-heading': '"Inter"',
    'font-body': '"Inter"',
    'font-mono': '"JetBrains Mono"',
    'space-section-y': '4rem',
  };

  if (!fs.existsSync(primitivesPath)) return fallback;

  const primitives = flattenTokens(JSON.parse(fs.readFileSync(primitivesPath, 'utf8')));
  return {
    'font-display': `"${primitives['font-family-instrument'] ?? 'Instrument Serif'}"`,
    'font-heading': `"${primitives['font-family-inter'] ?? 'Inter'}"`,
    'font-body': `"${primitives['font-family-inter'] ?? 'Inter'}"`,
    'font-mono': `"${primitives['font-family-jetbrains'] ?? 'JetBrains Mono'}"`,
    'space-section-y': primitives['space-16'] ?? '4rem',
  };
}

function discoverThemes() {
  if (!fs.existsSync(themesDir)) {
    fail(`no themes directory at ${themesDir}`);
  }

  const files = fs
    .readdirSync(themesDir)
    .filter((name) => name.endsWith(THEME_FILE_SUFFIX))
    .sort();

  if (files.length === 0) {
    fail(`no ${THEME_FILE_SUFFIX} files in ${themesDir}`);
  }

  return files.map((fileName) => {
    const filePath = path.join(themesDir, fileName);
    const stem = fileName.slice(0, -THEME_FILE_SUFFIX.length);
    let theme;
    try {
      theme = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      fail(`${fileName}: invalid JSON (${err.message})`);
    }
    return { fileName, filePath, stem, theme };
  });
}

function validateTheme({ fileName, stem, theme }) {
  if (!theme || typeof theme !== 'object') {
    fail(`${fileName}: root must be an object`);
  }
  if (theme.colorSpace !== 'oklch') {
    fail(`${fileName}: colorSpace must be "oklch"`);
  }
  if (typeof theme.name !== 'string' || theme.name.length === 0) {
    fail(`${fileName}: name is required`);
  }
  if (theme.name !== stem) {
    fail(`${fileName}: name "${theme.name}" must match filename stem "${stem}"`);
  }
  if (typeof theme.radius !== 'string' || theme.radius.length === 0) {
    fail(`${fileName}: radius is required (e.g. "0.5rem")`);
  }
  if (!theme.light || typeof theme.light !== 'object') {
    fail(`${fileName}: light map is required`);
  }
  if (!theme.dark || typeof theme.dark !== 'object') {
    fail(`${fileName}: dark map is required`);
  }

  const lightKeys = Object.keys(theme.light);
  const darkKeys = Object.keys(theme.dark);
  const lightSet = new Set(lightKeys);
  const darkSet = new Set(darkKeys);

  const missingInDark = lightKeys.filter((key) => !darkSet.has(key));
  const missingInLight = darkKeys.filter((key) => !lightSet.has(key));
  if (missingInDark.length || missingInLight.length) {
    fail(
      `${fileName}: light/dark key mismatch` +
        (missingInDark.length ? `; in light only: ${missingInDark.join(', ')}` : '') +
        (missingInLight.length ? `; in dark only: ${missingInLight.join(', ')}` : '')
    );
  }

  for (const key of REQUIRED_COLOR_KEYS) {
    if (!lightSet.has(key)) {
      fail(`${fileName}: missing required color "${key}"`);
    }
  }

  for (const mode of ['light', 'dark']) {
    for (const [key, value] of Object.entries(theme[mode])) {
      try {
        assertOklch(value, `${fileName} ${mode}.${key}`);
      } catch (err) {
        fail(err.message);
      }
    }
  }
}

function declarationsFor(colorMap, radius, sharedVars) {
  const lines = [];
  for (const [key, color] of Object.entries(colorMap)) {
    const cssName = camelToKebab(key);
    lines.push(`  --${cssName}: ${formatOklchCss(roundOklch(color))};`);
  }
  lines.push(`  --radius: ${radius};`);
  for (const [name, value] of Object.entries(sharedVars)) {
    lines.push(`  --${name}: ${value};`);
  }
  return lines.join('\n');
}

function emitProductCss(theme, sharedVars) {
  const light = declarationsFor(theme.light, theme.radius, sharedVars);
  const dark = declarationsFor(theme.dark, theme.radius, sharedVars);
  return [
    '/* generated — do not edit */',
    ':root {',
    light,
    '}',
    '.dark {',
    dark,
    '}',
    '',
  ].join('\n');
}

function emitPlaygroundCss(themes, sharedVars) {
  const chunks = [
    '/* generated — do not edit */',
    '/* Demo playground only. Product apps import a single theme CSS file. */',
    '',
  ];

  for (const { theme } of themes) {
    const light = declarationsFor(theme.light, theme.radius, sharedVars);
    const dark = declarationsFor(theme.dark, theme.radius, sharedVars);
    const isDefault = theme.name === DEFAULT_THEME;

    const lightSelector = isDefault
      ? `:root, [data-theme="${theme.name}"]`
      : `[data-theme="${theme.name}"]`;
    const darkSelector = isDefault
      ? `.dark, [data-theme="${theme.name}"].dark, .dark[data-theme="${theme.name}"]`
      : `[data-theme="${theme.name}"].dark, .dark[data-theme="${theme.name}"]`;

    chunks.push(`${lightSelector} {`, light, '}', '');
    chunks.push(`${darkSelector} {`, dark, '}', '');
  }

  return chunks.join('\n');
}

function cleanGeneratedCss() {
  fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(outputDir)) return;
  for (const name of fs.readdirSync(outputDir)) {
    if (name.endsWith('.css')) {
      fs.unlinkSync(path.join(outputDir, name));
    }
  }
}

const entries = discoverThemes();
for (const entry of entries) {
  validateTheme(entry);
}

const sharedVars = loadSharedVars();
cleanGeneratedCss();

const defaultEntry = entries.find((entry) => entry.stem === DEFAULT_THEME) ?? entries[0];

for (const entry of entries) {
  const css = emitProductCss(entry.theme, sharedVars);
  const outFile = path.join(outputDir, `${entry.stem}.css`);
  fs.writeFileSync(outFile, css);
  console.log(`Generated: dist/${entry.stem}.css`);
}

const playground = emitPlaygroundCss(entries, sharedVars);
fs.writeFileSync(path.join(outputDir, 'playground.css'), playground);
console.log('Generated: dist/playground.css');

const defaultCss = fs.readFileSync(path.join(outputDir, `${defaultEntry.stem}.css`), 'utf8');
fs.mkdirSync(path.join(outputDir, 'css'), { recursive: true });
fs.writeFileSync(path.join(outputDir, 'css', 'variables.css'), defaultCss);
console.log(`Generated: dist/css/variables.css (alias of ${defaultEntry.stem}.css)`);

console.log(`Token build complete (${entries.length} theme${entries.length === 1 ? '' : 's'}).`);
