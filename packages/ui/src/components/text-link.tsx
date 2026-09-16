import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/utils';

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        ref={ref}
        className={cn(
          'text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
          className
        )}
        {...props}
      />
    );
  }
);
TextLink.displayName = 'TextLink';

export { TextLink };
