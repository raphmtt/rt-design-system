'use client';

import * as React from 'react';
import { type Brand, brands, migrateBrand } from '@rtds/tokens';

interface BrandContextValue {
  brand: Brand;
  setBrand: (brand: Brand) => void;
}

const BrandContext = React.createContext<BrandContextValue | undefined>(undefined);

const STORAGE_KEY = 'acme-brand';

export interface BrandProviderProps {
  children: React.ReactNode;
  defaultBrand?: Brand;
  storageKey?: string;
}

export function BrandProvider({
  children,
  defaultBrand = 'atlas',
  storageKey = STORAGE_KEY,
}: BrandProviderProps) {
  const [brand, setBrandState] = React.useState<Brand>(defaultBrand);

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const next = migrateBrand(stored);
    setBrandState(next);
    if (stored !== next) {
      localStorage.setItem(storageKey, next);
    }
  }, [storageKey]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
  }, [brand]);

  const setBrand = React.useCallback(
    (newBrand: Brand) => {
      setBrandState(newBrand);
      localStorage.setItem(storageKey, newBrand);
    },
    [storageKey]
  );

  const value = React.useMemo(() => ({ brand, setBrand }), [brand, setBrand]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const context = React.useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}

export { brands };
export type { Brand };
