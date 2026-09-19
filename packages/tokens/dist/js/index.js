// RTDS Design System - Generated Token Types
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
  'success', 'success-foreground', 'warning', 'warning-foreground',
  'radius', 'font-display', 'font-heading', 'font-body', 'font-mono', 'space-section-y'
];
