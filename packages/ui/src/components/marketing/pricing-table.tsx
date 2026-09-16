import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Icon } from '../icon';
import { Container } from '../layout/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import { Button } from '../button';
import { Badge } from '../badge';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTierProps {
  name: string;
  description?: string;
  price: React.ReactNode;
  period?: string;
  features: PricingFeature[];
  cta: {
    label: string;
    href: string;
  };
  featured?: boolean;
}

const PricingTier = React.forwardRef<
  HTMLDivElement,
  PricingTierProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      name,
      description,
      price,
      period = '/month',
      features,
      cta,
      featured,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'relative flex flex-col',
          featured && 'border-primary shadow-lg',
          className
        )}
        {...props}
      >
        {featured && (
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
            Most Popular
          </Badge>
        )}
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-1">
          <div className="mb-6">
            <span className="font-heading text-4xl font-bold">{price}</span>
            <span className="text-muted-foreground">{period}</span>
          </div>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Icon
                  icon={Check}
                  className={cn(
                    feature.included
                      ? 'text-primary'
                      : 'text-muted-foreground/40'
                  )}
                />
                <span
                  className={cn(
                    'text-sm',
                    !feature.included && 'text-muted-foreground/60 line-through'
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant={featured ? 'default' : 'outline'}
            className="w-full"
            size="lg"
          >
            <a href={cta.href}>{cta.label}</a>
          </Button>
        </CardFooter>
      </Card>
    );
  }
);
PricingTier.displayName = 'PricingTier';

export interface PricingTableProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

const PricingTable = React.forwardRef<HTMLElement, PricingTableProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-20', className)}
        {...props}
      >
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {children}
          </div>
        </Container>
      </section>
    );
  }
);
PricingTable.displayName = 'PricingTable';

export { PricingTable, PricingTier };
