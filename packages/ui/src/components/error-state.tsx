import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';
import { Icon, ICON_SIZE_FEATURE } from './icon';

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      title = 'Something went wrong',
      description = 'An error occurred. Please try again.',
      onRetry,
      retryLabel = 'Try again',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center py-12 px-4',
          className
        )}
        {...props}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
          <Icon icon={AlertTriangle} size={ICON_SIZE_FEATURE} />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
        {onRetry && (
          <Button onClick={onRetry} className="mt-6">
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }
);
ErrorState.displayName = 'ErrorState';

export { ErrorState };
