import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: FAQItem[];
}

const FAQ = React.forwardRef<HTMLElement, FAQProps>(
  ({ className, title, description, items, ...props }, ref) => {
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
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
    );
  }
);
FAQ.displayName = 'FAQ';

export { FAQ };
