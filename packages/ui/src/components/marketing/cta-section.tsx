import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';

const ctaSectionVariants = cva('py-16 md:py-20', {
  variants: {
    tone: {
      default: '',
      muted: 'bg-muted',
      primary: 'bg-primary text-primary-foreground',
    },
  },
  defaultVariants: {
    tone: 'muted',
  },
});

export interface CTASectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof ctaSectionVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const CTASection = React.forwardRef<HTMLElement, CTASectionProps>(
  ({ className, tone, title, description, actions, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(ctaSectionVariants({ tone }), className)}
        {...props}
      >
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className={cn(
                'font-heading text-3xl font-bold tracking-tight sm:text-4xl',
                tone === 'primary' && 'text-primary-foreground'
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  'mt-4 text-lg',
                  tone === 'primary'
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                )}
              >
                {description}
              </p>
            )}
            {actions && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                {actions}
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }
);
CTASection.displayName = 'CTASection';

export { CTASection, ctaSectionVariants };
