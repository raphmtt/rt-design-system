import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';
import { Grid } from '../layout/grid';

export interface FeatureGridProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  columns?: 2 | 3 | 4;
  children: React.ReactNode;
}

const FeatureGrid = React.forwardRef<HTMLElement, FeatureGridProps>(
  ({ className, title, description, columns = 3, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn('py-16 md:py-20', className)} {...props}>
        <Container>
          {(title || description) && (
            <div className="text-center max-w-2xl mx-auto mb-12">
              {title && (
                <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 text-lg text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
          <Grid cols={columns} gap={8}>
            {children}
          </Grid>
        </Container>
      </section>
    );
  }
);
FeatureGrid.displayName = 'FeatureGrid';

export interface FeatureGridItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

const FeatureGridItem = React.forwardRef<HTMLDivElement, FeatureGridItemProps>(
  ({ className, icon, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-4', className)}
        {...props}
      >
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    );
  }
);
FeatureGridItem.displayName = 'FeatureGridItem';

export { FeatureGrid, FeatureGridItem };
