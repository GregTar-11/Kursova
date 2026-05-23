'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { cn } from '@/helpers/cn';

interface InputPasswordProps {
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const InputPassword = ({
  label,
  name,
  placeholder,
  disabled,
}: InputPasswordProps) => {
  const [isShowPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
            'placeholder:text-[13px] placeholder:text-c-base',
            'disabled:cursor-not-allowed disabled:opacity-60',
            fieldError
              ? 'border-c-error text-c-error focus:ring-1 focus:ring-c-error'
              : 'border-c-border text-c-headline focus:border-c-accent',
          )}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-c-muted absolute top-0 right-0 flex h-9 items-center justify-center px-3 transition-opacity hover:opacity-70"
        >
          {isShowPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>

        {fieldError && (
          <ErrorMessage className="top-10">
            {fieldError.message as string}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
};
