import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';

export interface StatsRowProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const StatsRow = React.forwardRef<HTMLElement, StatsRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-12 md:py-16 border-y', className)}
        {...props}
      >
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {children}
          </div>
        </Container>
      </section>
    );
  }
);
StatsRow.displayName = 'StatsRow';

export interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: React.ReactNode;
}

const StatItem = React.forwardRef<HTMLDivElement, StatItemProps>(
  ({ className, value, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-center', className)}
        {...props}
      >
        <div className="font-heading text-4xl font-bold text-foreground">
          {value}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{label}</div>
      </div>
    );
  }
);
StatItem.displayName = 'StatItem';

export { StatsRow, StatItem };
