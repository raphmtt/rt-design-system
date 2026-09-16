import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';

const heroVariants = cva('py-16 md:py-24 lg:py-32', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

export interface HeroProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof heroVariants> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    { className, align, eyebrow, title, description, actions, media, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(heroVariants({ align }), className)}
        {...props}
      >
        <Container>
          <div
            className={cn(
              'flex flex-col gap-8',
              align === 'center' && 'items-center'
            )}
          >
            <div
              className={cn(
                'flex flex-col gap-4 max-w-3xl',
                align === 'center' && 'items-center'
              )}
            >
              {eyebrow && (
                <div className="text-sm font-medium text-primary uppercase tracking-wider">
                  {eyebrow}
                </div>
              )}
              <h1 className="font-display text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl">
                  {description}
                </p>
              )}
            </div>

            {actions && (
              <div
                className={cn(
                  'flex flex-col sm:flex-row gap-4',
                  align === 'center' && 'justify-center'
                )}
              >
                {actions}
              </div>
            )}

            {media && <div className="mt-8 w-full max-w-5xl">{media}</div>}
          </div>
        </Container>
      </section>
    );
  }
);
Hero.displayName = 'Hero';

export { Hero, heroVariants };
