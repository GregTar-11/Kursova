'use client';

import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';
import { cn } from '@/helpers/cn';

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  methods: UseFormReturn<T>;
  variant?: 'big' | 'small' | 'full';
  className?: string;
}

export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  methods,
  variant = 'full',
  className,
}: FormProps<T>) => (
  <FormProvider {...methods}>
    <form
      onSubmit={onSubmit}
      className={cn(
        'bg-c-white flex w-full flex-col gap-6 rounded-xl text-left transition-all',
        {
          big: 'max-w-120 p-10',
          small: 'max-w-101 p-6',
          full: 'p-6',
        }[variant],
        className,
      )}
    >
      {children}
    </form>
  </FormProvider>
);
