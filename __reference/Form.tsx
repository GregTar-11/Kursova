'use client';

import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';

import { cn } from '@/helpers/cn';

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  methods: UseFormReturn<T>;
  variant: 'big' | 'small'|'full';
  className?: string;
}

export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  methods,
  variant,
  className,
}: FormProps<T>) => (
  <FormProvider {...methods}>
    <form
      onSubmit={onSubmit}
      className={cn(
        'flex w-full flex-col justify-between text-left',
        'bg-c-white gap-7.5 rounded-[20px] transition-all',

        {
          big: 'max-w-120 p-10',
          small: 'max-w-101.5 p-6',
          full:' p-6'
        }[variant],

        className,
      )}
    >
      {children}
    </form>
  </FormProvider>
);
