'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/helpers/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex w-full flex-col gap-2 relative">
      {label && (
        <label className={cn('text-[13px] font-medium', error ? 'text-c-error' : 'text-c-headline')}>
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        maxLength={1000}
        className={cn(
          'min-h-28 w-full rounded-md border px-3 py-2 outline-none text-[13px] resize-y',
          'border-c-border text-c-headline focus:border-c-accent',
          'placeholder:text-c-base',
          error && 'border-c-error focus:border-c-error',
          className,
        )}
        {...props}
      />

      {error && (
        <span className="text-c-error text-[12px]">{error}</span>
      )}
    </div>
  ),
);

Textarea.displayName = 'Textarea';
