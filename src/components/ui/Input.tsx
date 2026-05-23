'use client';

import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { cn } from '@/helpers/cn';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({ label, type = 'text', name, placeholder, disabled }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  return (
    <div className="text-[13px] leading-normal">
      <label
        htmlFor={name}
        className={cn(
          'mb-2 block h-5 transition-colors',
          fieldError ? 'text-c-error' : 'text-c-headline',
        )}
      >
        {label}
      </label>

      <div className="relative flex flex-col justify-between">
        <input
          disabled={disabled}
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            'relative h-9 w-full rounded border px-3 py-2 transition-all outline-none',
            'placeholder:text-[13px] placeholder:text-c-base',
            'disabled:cursor-not-allowed disabled:opacity-60',
            fieldError
              ? 'border-c-error text-c-error focus:ring-1 focus:ring-c-error'
              : 'border-c-border text-c-headline focus:border-c-accent',
          )}
        />

        {fieldError && (
          <ErrorMessage className="top-10">
            {fieldError.message as string}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};
