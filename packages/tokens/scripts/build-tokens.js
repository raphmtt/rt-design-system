import StyleDictionary from 'style-dictionary';
import { register, transformDimension } from '@tokens-studio/sd-transforms';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..', '..');
const tokensDir = path.resolve(rootDir, 'design', 'tokens');
const outputDir = path.resolve(__dirname, '..', 'dist');

register(StyleDictionary);

fs.mkdirSync(path.join(outputDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(outputDir, 'js'), { recursive: true });

const primitiveTokens = JSON.parse(
  fs.readFileSync(path.join(tokensDir, 'primitive.json'), 'utf-8')
);

const themes = ['aurora-light', 'aurora-dark', 'editorial-light', 'editorial-dark'];

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
    const [brand, mode] = themeName.split('-');
    const themeTokens = JSON.parse(
      fs.readFileSync(path.join(tokensDir, 'themes', `${themeName}.json`), 'utf-8')
    );

    let selector;
    if (brand === 'aurora' && mode === 'light') {
      selector = ':root, [data-brand="aurora"]';
    } else if (brand === 'aurora' && mode === 'dark') {
      selector = '.dark, [data-brand="aurora"].dark';
    } else if (brand === 'editorial' && mode === 'light') {
      selector = '[data-brand="editorial"]';
    } else {
      selector = '[data-brand="editorial"].dark';
    }

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
    if (component.fontHeading?.value) {
      const resolved = resolveReferences(component.fontHeading.value, primitives);
      css += `  --font-heading: "${resolved}";\n`;
    }
    if (component.fontBody?.value) {
      const resolved = resolveReferences(component.fontBody.value, primitives);
      css += `  --font-body: "${resolved}";\n`;
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
  const primitives = flattenTokens(primitiveTokens);
  
  const js = `// Acme Design System - Generated Token Types
export const brands = ['aurora', 'editorial'] as const;
export const modes = ['light', 'dark'] as const;

export type Brand = typeof brands[number];
export type Mode = typeof modes[number];

export const tokenNames = [
  'background', 'foreground', 'card', 'card-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
  'muted', 'muted-foreground', 'accent', 'accent-foreground',
  'destructive', 'destructive-foreground', 'border', 'input', 'ring',
  'radius', 'font-heading', 'font-body', 'space-section-y'
] as const;

export type TokenName = typeof tokenNames[number];
`;

  fs.writeFileSync(path.join(outputDir, 'js', 'index.js'), js);
  fs.writeFileSync(path.join(outputDir, 'js', 'index.d.ts'), js.replace('export ', 'declare '));
  console.log('Generated: dist/js/index.js');
}

generateCSS();
generateJS();

console.log('Token build complete!');
