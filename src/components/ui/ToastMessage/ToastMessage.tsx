import { Toast, toast } from 'react-hot-toast';
import { ReactNode } from 'react';
import { cn } from '@/helpers/cn';
import { Button } from '../Button';

export enum ToastType {
  success,
  error,
  warning,
}

interface ToastMessageProps {
  t: Toast;
  message: ReactNode;
  type: ToastType;
}

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ICONS: Record<ToastType, ReactNode> = {
  [ToastType.success]: <CheckIcon />,
  [ToastType.warning]: <WarningIcon />,
  [ToastType.error]: <ErrorIcon />,
};

const TYPE_STYLES: Record<ToastType, string> = {
  [ToastType.success]: 'bg-c-success/20 border-c-success text-c-success',
  [ToastType.warning]: 'bg-yellow-50 border-yellow-400 text-yellow-700',
  [ToastType.error]: 'bg-c-error/10 border-c-error text-c-error',
};

export const ToastMessage = ({ t, message, type }: ToastMessageProps) => {
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.dismiss(t.id);
  };

  return (
    <div
      className={cn(
        'flex w-full max-w-xs items-center gap-3 rounded-lg border-2 px-4 py-3 text-sm shadow-md transition-all duration-300',
        t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
        TYPE_STYLES[type],
      )}
      onClick={() => toast.dismiss(t.id)}
    >
      {ICONS[type]}

      <div className="grow leading-normal font-medium">{message}</div>

      <Button variant="ghost" onClick={handleDismiss} className="h-auto p-0 shrink-0">
        <CloseIcon />
      </Button>
    </div>
  );
};
