import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const sectionVariants = cva('py-16 md:py-20 lg:py-24', {
  variants: {
    tone: {
      default: '',
      muted: 'bg-muted',
      inverse: 'bg-foreground text-background',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'article' | 'aside';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone, as: Comp = 'section', ...props }, ref) => {
    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(sectionVariants({ tone }), className)}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

export { Section, sectionVariants };
