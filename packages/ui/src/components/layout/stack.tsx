import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const stackVariants = cva('flex flex-col', {
  variants: {
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    gap: 4,
    align: 'stretch',
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap, align, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stackVariants({ gap, align }), className)}
        {...props}
      />
    );
  }
);
Stack.displayName = 'Stack';

export { Stack, stackVariants };
