'use client';

import { Compass, BookOpen, Home } from 'lucide-react';
import type { Brand } from '@acme/tokens';
import { brandLabels, brands } from '@acme/tokens';
import { useBrand } from '../providers/brand-provider';
import { Icon } from './icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const brandIcons = {
  atlas: Compass,
  folio: BookOpen,
  maison: Home,
} as const;

export function BrandSelect() {
  const { brand, setBrand } = useBrand();

  return (
    <Select value={brand} onValueChange={(value) => setBrand(value as Brand)}>
      <SelectTrigger className="w-[160px]" aria-label="Select niche">
        <SelectValue placeholder="Select niche" />
      </SelectTrigger>
      <SelectContent>
        {brands.map((id) => (
          <SelectItem key={id} value={id}>
            <span className="flex items-center gap-2">
              <Icon icon={brandIcons[id]} />
              {brandLabels[id]}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
