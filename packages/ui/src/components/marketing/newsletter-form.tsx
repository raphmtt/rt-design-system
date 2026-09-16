'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Input } from '../input';

export interface NewsletterFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (email: string) => void;
  placeholder?: string;
  submitLabel?: string;
}

const NewsletterForm = React.forwardRef<HTMLFormElement, NewsletterFormProps>(
  (
    {
      className,
      onSubmit,
      placeholder = 'Enter your email',
      submitLabel = 'Subscribe',
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(email);
      setEmail('');
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn('flex flex-col sm:flex-row gap-3', className)}
        {...props}
      >
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit">{submitLabel}</Button>
      </form>
    );
  }
);
NewsletterForm.displayName = 'NewsletterForm';

export { NewsletterForm };
