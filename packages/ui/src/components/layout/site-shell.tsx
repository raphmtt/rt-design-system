import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SiteShellProps extends React.HTMLAttributes<HTMLDivElement> {
  skipLinkHref?: string;
}

const SiteShell = React.forwardRef<HTMLDivElement, SiteShellProps>(
  ({ className, skipLinkHref = '#main-content', children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative min-h-screen', className)} {...props}>
        <a
          href={skipLinkHref}
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        {children}
      </div>
    );
  }
);
SiteShell.displayName = 'SiteShell';

export { SiteShell };
