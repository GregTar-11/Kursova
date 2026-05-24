'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { cn } from '@/helpers/cn';
import EyeOpenIcon from '@/assets/svg/akar-icons_eye-open.svg';
import EyeClosedIcon from '@/assets/svg/akar-icons_eye-slashed.svg';

interface InputPasswordProps {
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export const InputPassword = ({ label, name, placeholder, disabled }: InputPasswordProps) => {
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
            'placeholder:text-c-base placeholder:text-[13px]',
            'disabled:cursor-not-allowed disabled:opacity-60',
            fieldError
              ? 'border-c-error text-c-error focus:ring-c-error focus:ring-1'
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

        {typeof fieldError?.message === 'string' && (
          <ErrorMessage className="top-10">{fieldError.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
};
