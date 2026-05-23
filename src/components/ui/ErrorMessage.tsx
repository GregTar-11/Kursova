import { cn } from '@/helpers/cn';

interface ErrorMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export const ErrorMessage = ({ children, className }: ErrorMessageProps) => (
  <p className={cn('absolute text-c-error text-[12px]', className)}>{children}</p>
);
