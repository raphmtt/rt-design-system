'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../providers/theme-provider';
import { Button } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export function ModeToggle() {
  const { mode, setMode, resolvedMode } = useTheme();

  const cycleMode = () => {
    const modes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]!);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleMode}
      aria-label={`Current mode: ${mode}. Click to change.`}
    >
      {resolvedMode === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      {mode === 'system' && (
        <Monitor className="h-3 w-3 absolute bottom-1 right-1" />
      )}
    </Button>
  );
}

export function ModeSelect() {
  const { mode, setMode } = useTheme();

  return (
    <Select value={mode} onValueChange={(value) => setMode(value as 'light' | 'dark' | 'system')}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <span className="flex items-center gap-2">
            <Sun className="h-4 w-4" /> Light
          </span>
        </SelectItem>
        <SelectItem value="dark">
          <span className="flex items-center gap-2">
            <Moon className="h-4 w-4" /> Dark
          </span>
        </SelectItem>
        <SelectItem value="system">
          <span className="flex items-center gap-2">
            <Monitor className="h-4 w-4" /> System
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
