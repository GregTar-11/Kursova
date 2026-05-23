import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { cn } from '@/helpers/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'outline' | 'ghost' | 'error';
  size?: 'small' | 'medium' | 'big';
}

export const Button = ({
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50',
      {
        primary: 'bg-c-accent text-c-white hover:bg-c-accent-dark',
        outline: 'border border-c-accent text-c-accent hover:bg-c-accent/10',
        ghost: 'text-c-headline bg-transparent hover:opacity-70',
        error: 'bg-c-error text-c-white hover:bg-c-error/80',
      }[variant],
      {
        small: 'px-3 py-1.5 text-[13px]',
        medium: 'px-5 py-2.5 text-[13px]',
        big: 'px-7 py-3 text-[15px]',
      }[size],
      className,
    )}
    onClick={onClick}
    disabled={disabled}
    {...props}
  />
);
