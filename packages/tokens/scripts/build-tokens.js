import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..', '..');
const tokensDir = path.resolve(rootDir, 'design', 'tokens');
const outputDir = path.resolve(__dirname, '..', 'dist');

fs.mkdirSync(path.join(outputDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(outputDir, 'js'), { recursive: true });

const primitiveTokens = JSON.parse(
  fs.readFileSync(path.join(tokensDir, 'primitive.json'), 'utf-8')
);

const themes = [
  'atlas-light',
  'atlas-dark',
  'folio-light',
  'folio-dark',
  'maison-light',
  'maison-dark',
];

const selectors = {
  'atlas-light': ':root, [data-brand="atlas"]',
  'atlas-dark': '.dark, [data-brand="atlas"].dark, .dark[data-brand="atlas"]',
  'folio-light': '[data-brand="folio"]',
  'folio-dark': '[data-brand="folio"].dark, .dark[data-brand="folio"]',
  'maison-light': '[data-brand="maison"]',
  'maison-dark': '[data-brand="maison"].dark, .dark[data-brand="maison"]',
};

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

function resolveReferences(value, primitives) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    const key = ref.replace(/\./g, '-');
    return primitives[key] || value;
  });
}

function generateCSS() {
  const primitives = flattenTokens(primitiveTokens);
  let css = '/* Acme Design System - Generated Tokens */\n\n';

  for (const themeName of themes) {
    const themeTokens = JSON.parse(
      fs.readFileSync(path.join(tokensDir, 'themes', `${themeName}.json`), 'utf-8')
    );

    const selector = selectors[themeName];
    const semantic = themeTokens.semantic || {};
    const component = themeTokens.component || {};

    css += `${selector} {\n`;

    const tokenMap = {
      background: semantic.background,
      foreground: semantic.foreground,
      card: semantic.card,
      'card-foreground': semantic.cardForeground,
      primary: semantic.primary,
      'primary-foreground': semantic.primaryForeground,
      secondary: semantic.secondary,
      'secondary-foreground': semantic.secondaryForeground,
      muted: semantic.muted,
      'muted-foreground': semantic.mutedForeground,
      accent: semantic.accent,
      'accent-foreground': semantic.accentForeground,
      destructive: semantic.destructive,
      'destructive-foreground': semantic.destructiveForeground,
      border: semantic.border,
      input: semantic.input,
      ring: semantic.ring,
    };

    for (const [name, token] of Object.entries(tokenMap)) {
      if (token?.value) {
        const resolved = resolveReferences(token.value, primitives);
        css += `  --${name}: ${resolved};\n`;
      }
    }

    if (component.radius?.value) {
      css += `  --radius: ${component.radius.value};\n`;
    }

    const fontTokens = [
      ['font-display', component.fontDisplay],
      ['font-heading', component.fontHeading],
      ['font-body', component.fontBody],
      ['font-mono', component.fontMono],
    ];

    for (const [name, token] of fontTokens) {
      if (token?.value) {
        const resolved = resolveReferences(token.value, primitives);
        css += `  --${name}: "${resolved}";\n`;
      }
    }

    if (component.spaceSectionY?.value) {
      const resolved = resolveReferences(component.spaceSectionY.value, primitives);
      css += `  --space-section-y: ${resolved};\n`;
    }

    css += '}\n\n';
  }

  fs.writeFileSync(path.join(outputDir, 'css', 'variables.css'), css);
  console.log('Generated: dist/css/variables.css');
}

function generateJS() {
  const js = `// Acme Design System - Generated Token Types
export const brands = ['atlas', 'folio', 'maison'];
export const modes = ['light', 'dark'];
export const brandLabels = {
  atlas: 'Atlas',
  folio: 'Folio',
  maison: 'Maison',
};

const LEGACY_BRANDS = { aurora: 'atlas', editorial: 'atlas' };

export function isBrand(value) {
  return value === 'atlas' || value === 'folio' || value === 'maison';
}

export function migrateBrand(value) {
  if (isBrand(value)) return value;
  if (value && value in LEGACY_BRANDS) return LEGACY_BRANDS[value];
  return 'atlas';
}

export const tokenNames = [
  'background', 'foreground', 'card', 'card-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
  'muted', 'muted-foreground', 'accent', 'accent-foreground',
  'destructive', 'destructive-foreground', 'border', 'input', 'ring',
  'radius', 'font-display', 'font-heading', 'font-body', 'font-mono', 'space-section-y'
];
`;

  const dts = `export declare const brands: readonly ["atlas", "folio", "maison"];
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
`;

  fs.writeFileSync(path.join(outputDir, 'js', 'index.js'), js);
  fs.writeFileSync(path.join(outputDir, 'js', 'index.d.ts'), dts);
  console.log('Generated: dist/js/index.js');
}

generateCSS();
generateJS();

console.log('Token build complete!');
