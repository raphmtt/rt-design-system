import * as React from 'react';
import { cn } from '../lib/utils';
import { Label } from './label';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { className, label, htmlFor, hint, error, required, children, ...props },
    ref
  ) => {
    const errorId = error ? `${htmlFor}-error` : undefined;
    const hintId = hint ? `${htmlFor}-hint` : undefined;

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label htmlFor={htmlFor}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {children}
        {hint && !error && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export { FormField };
