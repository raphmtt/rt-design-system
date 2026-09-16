import * as React from 'react';
import { cn } from '../lib/utils';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, actions, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center py-12 px-4',
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
            {icon}
          </div>
        )}
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
        {actions && <div className="mt-6">{actions}</div>}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
