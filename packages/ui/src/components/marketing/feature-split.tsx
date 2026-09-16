import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';

export interface FeatureSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  media: React.ReactNode;
  actions?: React.ReactNode;
  reverse?: boolean;
}

const FeatureSplit = React.forwardRef<HTMLElement, FeatureSplitProps>(
  (
    { className, eyebrow, title, description, media, actions, reverse, ...props },
    ref
  ) => {
    return (
      <section ref={ref} className={cn('py-16 md:py-20', className)} {...props}>
        <Container>
          <div
            className={cn(
              'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
              reverse && 'lg:[&>*:first-child]:order-2'
            )}
          >
            <div className="flex flex-col gap-6">
              {eyebrow && (
                <div className="text-sm font-medium text-primary uppercase tracking-wider">
                  {eyebrow}
                </div>
              )}
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
              {description && (
                <p className="text-lg text-muted-foreground">{description}</p>
              )}
              {actions && (
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {actions}
                </div>
              )}
            </div>
            <div className="relative">{media}</div>
          </div>
        </Container>
      </section>
    );
  }
);
FeatureSplit.displayName = 'FeatureSplit';

export { FeatureSplit };
