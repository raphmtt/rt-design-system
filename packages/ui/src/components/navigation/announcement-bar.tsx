'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Icon } from '../icon';

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  dismissible?: boolean;
  storageKey?: string;
  action?: {
    label: string;
    href: string;
  };
}

const AnnouncementBar = React.forwardRef<HTMLDivElement, AnnouncementBarProps>(
  (
    {
      className,
      message,
      dismissible = true,
      storageKey = 'rtds-announcement-dismissed',
      action,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    React.useEffect(() => {
      if (typeof window !== 'undefined' && dismissible) {
        const isDismissed = localStorage.getItem(storageKey);
        if (isDismissed === 'true') {
          setDismissed(true);
        }
      }
    }, [dismissible, storageKey]);

    const handleDismiss = () => {
      setDismissed(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, 'true');
      }
    };

    if (dismissed) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-primary text-primary-foreground py-2 px-4 text-center text-sm',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center gap-4">
          <span>{message}</span>
          {action && (
            <a
              href={action.href}
              className="font-medium underline underline-offset-4 hover:no-underline"
            >
              {action.label}
            </a>
          )}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
          >
            <Icon icon={X} size={16} />
          </Button>
        )}
      </div>
    );
  }
);
AnnouncementBar.displayName = 'AnnouncementBar';

export { AnnouncementBar };
