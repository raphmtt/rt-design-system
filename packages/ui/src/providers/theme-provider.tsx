'use client';

import * as React from 'react';

type Mode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: Mode;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: Mode) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'rtds-mode';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: Mode;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [mode, setModeState] = React.useState<Mode>(defaultMode);
  const [resolvedMode, setResolvedMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Mode | null;
    if (stored) {
      setModeState(stored);
    }
  }, [storageKey]);

  React.useEffect(() => {
    const resolved = mode === 'system' ? getSystemTheme() : mode;
    setResolvedMode(resolved);

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
  }, [mode]);

  React.useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => setResolvedMode(getSystemTheme());
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [mode]);

  const setMode = React.useCallback(
    (newMode: Mode) => {
      setModeState(newMode);
      localStorage.setItem(storageKey, newMode);
    },
    [storageKey]
  );

  const value = React.useMemo(
    () => ({ mode, resolvedMode, setMode }),
    [mode, resolvedMode, setMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
