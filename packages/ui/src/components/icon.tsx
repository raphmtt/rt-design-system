import * as React from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '../lib/utils';

/** Default UI chrome size (header, controls, lists). */
export const ICON_SIZE_UI = 20;
/** Feature / marketing highlight size. */
export const ICON_SIZE_FEATURE = 24;
export const ICON_STROKE_WIDTH = 1.5;

export interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: IconComp,
      size = ICON_SIZE_UI,
      strokeWidth = ICON_STROKE_WIDTH,
      color = 'currentColor',
      className,
      'aria-hidden': ariaHidden = true,
      ...props
    },
    ref
  ) => {
    return (
      <IconComp
        ref={ref}
        size={size}
        strokeWidth={strokeWidth}
        color={color}
        className={cn('shrink-0', className)}
        aria-hidden={ariaHidden}
        {...props}
      />
    );
  }
);
Icon.displayName = 'Icon';

export { Icon };
