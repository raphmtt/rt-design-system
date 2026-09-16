'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../providers/theme-provider';
import { Button } from './button';
import { Icon } from './icon';
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
        <Icon icon={Moon} />
      ) : (
        <Icon icon={Sun} />
      )}
      {mode === 'system' && (
        <Icon icon={Monitor} size={12} className="absolute bottom-1 right-1" />
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
            <Icon icon={Sun} /> Light
          </span>
        </SelectItem>
        <SelectItem value="dark">
          <span className="flex items-center gap-2">
            <Icon icon={Moon} /> Dark
          </span>
        </SelectItem>
        <SelectItem value="system">
          <span className="flex items-center gap-2">
            <Icon icon={Monitor} /> System
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
