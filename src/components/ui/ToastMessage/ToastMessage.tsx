import { Toast, toast } from 'react-hot-toast';
import { ReactNode } from 'react';
import { cn } from '@/helpers/cn';
import { Button } from '../Button';
import CheckIcon from '@/assets/svg/bx_bx-check.svg';
import ErrorIcon from '@/assets/svg/bx_bx-error.svg';
import WarningIcon from '@/assets/svg/bx_bx-block.svg';
import CloseIcon from '@/assets/svg/mdi_close.svg';

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

const ICONS: Record<ToastType, ReactNode> = {
  [ToastType.success]: <CheckIcon width={20} height={20} className="shrink-0" />,
  [ToastType.warning]: <WarningIcon width={20} height={20} className="shrink-0" />,
  [ToastType.error]: <ErrorIcon width={20} height={20} className="shrink-0" />,
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
        t.visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
        TYPE_STYLES[type],
      )}
      onClick={() => toast.dismiss(t.id)}
    >
      {ICONS[type]}

      <div className="grow leading-normal font-medium">{message}</div>

      <Button variant="ghost" onClick={handleDismiss} className="h-auto shrink-0 p-0">
        <CloseIcon width={16} height={16} />
      </Button>
    </div>
  );
};
