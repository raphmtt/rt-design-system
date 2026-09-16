import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {}

const Bleed = React.forwardRef<HTMLDivElement, BleedProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative mx-[calc(-50vw+50%)] w-screen',
          className
        )}
        {...props}
      />
    );
  }
);
Bleed.displayName = 'Bleed';

export { Bleed };
