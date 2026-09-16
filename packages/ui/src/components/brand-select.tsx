'use client';

import { Palette } from 'lucide-react';
import { useBrand } from '../providers/brand-provider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export function BrandSelect() {
  const { brand, setBrand } = useBrand();

  return (
    <Select value={brand} onValueChange={(value) => setBrand(value as 'aurora' | 'editorial')}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select brand" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aurora">
          <span className="flex items-center gap-2">
            <Palette className="h-4 w-4" /> Aurora
          </span>
        </SelectItem>
        <SelectItem value="editorial">
          <span className="flex items-center gap-2">
            <Palette className="h-4 w-4" /> Editorial
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
