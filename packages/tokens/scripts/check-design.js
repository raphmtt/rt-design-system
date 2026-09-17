import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..', '..');

const canonicalPath = path.join(__dirname, '..', 'approved-semantic-hex.json');
const themesDir = path.join(rootDir, 'design', 'tokens', 'themes');
const snapshotPath = path.join(rootDir, 'design', 'penpot', 'token-snapshot.json');

const THEMES = [
  'atlas-light',
  'atlas-dark',
  'folio-light',
  'folio-dark',
  'maison-light',
  'maison-dark',
];

const EXPECTED_SEMANTIC_KEYS = [
  'background',
  'foreground',
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
  'card',
  'cardForeground',
];

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function normalizeHex(input) {
  let hex = String(input).trim();
  if (hex.startsWith('#')) hex = hex.slice(1);
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return `#${hex.toUpperCase()}`;
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function validateCanonical(canonical) {
  const actualThemes = Object.keys(canonical || {});
  for (const theme of THEMES) {
    if (!(theme in canonical)) {
      fail(
        `canonical JSON is missing theme "${theme}" (found: ${actualThemes.join(', ') || 'none'})`
      );
    }
  }
  for (const [theme, colors] of Object.entries(canonical || {})) {
    if (!THEMES.includes(theme)) {
      warnings.push(`canonical JSON has unexpected theme "${theme}"`);
      continue;
    }
    if (!colors || typeof colors !== 'object' || Array.isArray(colors)) {
      fail(`canonical theme "${theme}" must be an object of semantic color keys`);
      continue;
    }
    for (const key of EXPECTED_SEMANTIC_KEYS) {
      if (!(key in colors)) {
        fail(`canonical theme "${theme}" is missing expected semantic key "${key}"`);
      }
    }
    for (const [name, hex] of Object.entries(colors)) {
      const normalized = normalizeHex(hex);
      if (!normalized) {
        fail(`canonical "${theme}.${name}" is not a hex color: "${hex}"`);
      } else if (hex !== normalized) {
        fail(`canonical "${theme}.${name}" must be uppercase #RRGGBB, got "${hex}"`);
      }
    }
  }
}

function validateThemeFiles(canonical) {
  for (const theme of THEMES) {
    const filePath = path.join(themesDir, `${theme}.json`);
    if (!fs.existsSync(filePath)) {
      fail(`theme token file missing: design/tokens/themes/${theme}.json`);
      continue;
    }
    const themeJson = readJson(filePath);
    const semantic = themeJson?.semantic || {};
    for (const [name, hex] of Object.entries(canonical[theme] || {})) {
      const token = semantic[name];
      if (!token) {
        fail(`design/tokens/themes/${theme}.json is missing semantic key "${name}"`);
        continue;
      }
      const normalized = normalizeHex(token.value);
      if (normalized !== hex) {
        fail(
          `drift ${theme}.${name}: design/tokens/themes/${theme}.json has ${token.value}, canonical expects ${hex}`
        );
      }
    }
  }
}

function flattenSnapshot(snapshot) {
  const flat = {};
  const walk = (obj, prefix) => {
    for (const [key, value] of Object.entries(obj)) {
      const dotPath = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        walk(value, dotPath);
      } else {
        flat[dotPath] = value;
      }
    }
  };
  walk(snapshot, '');
  return flat;
}

function validateSnapshot(canonical, snapshot) {
  const flat = flattenSnapshot(snapshot);
  let found = 0;
  for (const [theme, colors] of Object.entries(canonical)) {
    for (const [name, expectedHex] of Object.entries(colors)) {
      const canonicalKey = `${theme}.${name}`;
      const rawValue = flat[canonicalKey] ?? flat[`${theme}.${name}.value`];
      if (rawValue === undefined) {
        fail(`snapshot is missing canonical color "${canonicalKey}"`);
        continue;
      }
      const normalized = normalizeHex(rawValue);
      if (!normalized) {
        fail(`snapshot "${canonicalKey}" is not a hex color: "${rawValue}"`);
        continue;
      }
      if (normalized !== expectedHex) {
        fail(`snapshot drift ${canonicalKey}: snapshot ${normalized}, canonical ${expectedHex}`);
        continue;
      }
      found++;
    }
  }
  const expectedCount = Object.values(canonical).reduce(
    (sum, colors) => sum + Object.keys(colors || {}).length,
    0
  );
  warnings.push(
    `snapshot matched ${found} of ${expectedCount} canonical color values`
  );
}

const canonical = readJson(canonicalPath);
if (!canonical) {
  console.error('✗ Missing canonical token file: packages/tokens/approved-semantic-hex.json');
  process.exit(1);
}

validateCanonical(canonical);
validateThemeFiles(canonical);

const hasSnapshot = fs.existsSync(snapshotPath);
if (hasSnapshot) {
  const snapshot = readJson(snapshotPath);
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) {
    fail('design/penpot/token-snapshot.json must contain a JSON object of color tokens');
  } else {
    validateSnapshot(canonical, snapshot);
  }
}

for (const warning of warnings) {
  console.log(`  ⚠ ${warning}`);
}

if (errors.length > 0) {
  console.error(
    `✗ design sync check failed (${errors.length} error${errors.length === 1 ? '' : 's'}):`
  );
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  const hint = hasSnapshot
    ? 'Fix the snapshot to match packages/tokens/approved-semantic-hex.json, or fix the approved JSON if colors truly changed.'
    : 'Fix design/tokens/themes/*.json and/or packages/tokens/approved-semantic-hex.json so they agree.';
  console.error(`  ${hint}`);
  process.exit(1);
}

console.log(
  '✓ canonical JSON: 6 themes (atlas/folio/maison × light/dark) with valid uppercase #RRGGBB semantic colors'
);
console.log('✓ theme token files match canonical colors');
if (hasSnapshot) {
  console.log('✓ Penpot token-snapshot.json matches canonical colors (uppercase #RRGGBB, no drift)');
} else {
  console.log('· no design/penpot/token-snapshot.json present — structural check only');
}
console.log('Design sync check passed.');