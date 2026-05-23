'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import IconEyeOpen from '@/assets/svg/akar-icons_eye-open.svg';
import IconEyeClosed from '@/assets/svg/akar-icons_eye-slashed.svg';
import { cn } from '@/helpers/cn';
import { TranslationValues, useTranslations } from 'next-intl';

interface InputPasswordProps {
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  count?: TranslationValues;
}

export const InputPassword = ({
  label,
  name,
  placeholder,
  disabled,
  count,
}: InputPasswordProps) => {
  const [isShowPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const t = useTranslations();
  const fieldError = errors[name];

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
          type={isShowPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            'relative h-9 w-full rounded border py-2 pr-10 pl-3 transition-all outline-none',
            'placeholder:text-[13px] placeholder:leading-normal',
            'disabled:cursor-not-allowed',
            fieldError
              ? 'border-c-error text-c-error focus:ring-error focus:ring-1'
              : 'border-c-border focus:border-c-bg',
          )}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-c-headline absolute top-0 right-0 flex h-9 items-center justify-center px-3 transition-opacity hover:opacity-70"
        >
          {isShowPassword ? (
            <IconEyeOpen className="h-4 w-4" />
          ) : (
            <IconEyeClosed className="h-4 w-4" />
          )}
        </button>

        {fieldError && (
          <ErrorMessage className="top-10">
            {t(fieldError.message as string, count)}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};
