'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { Button } from '../button';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Label } from '../label';

export interface ContactFormProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'onSubmit'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
  submitLabel?: string;
}

const ContactForm = React.forwardRef<HTMLElement, ContactFormProps>(
  (
    {
      className,
      title = 'Contact Us',
      description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      onSubmit,
      submitLabel = 'Send Message',
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(formData);
    };

    return (
      <section
        ref={ref}
        className={cn('py-16 md:py-20', className)}
        {...props}
      >
        <Container>
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help?"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  {submitLabel}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </section>
    );
  }
);
ContactForm.displayName = 'ContactForm';

export { ContactForm };
