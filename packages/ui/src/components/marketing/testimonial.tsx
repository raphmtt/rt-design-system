import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import { Card, CardContent } from '../card';

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: React.ReactNode;
  author: {
    name: string;
    title?: string;
    company?: string;
    image?: string;
  };
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  ({ className, quote, author, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('', className)} {...props}>
        <CardContent className="pt-6">
          <blockquote className="text-lg text-foreground mb-6">
            "{quote}"
          </blockquote>
          <div className="flex items-center gap-4">
            <Avatar>
              {author.image && <AvatarImage src={author.image} alt={author.name} />}
              <AvatarFallback>
                {author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-foreground">{author.name}</div>
              {(author.title || author.company) && (
                <div className="text-sm text-muted-foreground">
                  {author.title}
                  {author.title && author.company && ', '}
                  {author.company}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
Testimonial.displayName = 'Testimonial';

export interface TestimonialGridProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

const TestimonialGrid = React.forwardRef<HTMLElement, TestimonialGridProps>(
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
          </div>
        </Container>
      </section>
    );
  }
);
TestimonialGrid.displayName = 'TestimonialGrid';

export { Testimonial, TestimonialGrid };
