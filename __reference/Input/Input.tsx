'use client';

import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { cn } from '@/helpers/cn';
import { TranslationValues, useTranslations } from 'next-intl';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  step?: string;
  count?:TranslationValues
}

export const  Input=({
  label,
  type,
  name,
  placeholder,
  disabled,
  step,
  count
}: InputProps) =>{
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

    const t = useTranslations();


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
          step={step}
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            'relative h-9 w-full rounded border px-3 py-2 transition-all outline-none',
            'placeholder:text-[13px] placeholder:leading-normal',
            'disabled:cursor-not-allowed',

            fieldError
              ? 'border-c-error text-c-error focus:ring-error focus:ring-1'
              : 'border-c-border focus:border-c-bg',
          )}
        />

        {fieldError && (
          <ErrorMessage className="top-10">
            {t(fieldError.message as string ,count)}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
}
