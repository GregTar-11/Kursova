import toast, { Toast } from 'react-hot-toast';

import ErrorIcon from '@/assets/svg/bx_bx-error.svg';
import CheckIcon from '@/assets/svg/bx_bx-check.svg';
import BlockIcon from '@/assets/svg/bx_bx-block.svg';
import CloseIcon from '@/assets/svg/mdi_close.svg';
import { Button } from '../Button';
import { ReactNode } from 'react';
import { cn } from '@/helpers/cn';

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

export const ToastMessage = ({ t, message, type }: ToastMessageProps) => {
  const Icons: Record<ToastType, ReactNode> = {
    [ToastType.success]: <CheckIcon className="h-6 w-6 shrink-0" />,
    [ToastType.warning]: <ErrorIcon className="h-6 w-6 shrink-0" />,
    [ToastType.error]: <BlockIcon className="h-6 w-6 shrink-0" />,
  };

  const typeStyles: Record<ToastType, string> = {
    [ToastType.success]: 'bg-c-success/80 border-c-success',
    [ToastType.warning]: 'bg-c-warning/80 border-c-warning',
    [ToastType.error]: 'bg-c-danger/80 border-c-danger',
  };
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.dismiss(t.id);
  };

  return (
    <div
      className={cn(
        'flex h-13.5 w-full max-w-77.25 items-center gap-3 rounded-[3px] border-2 p-3.75 text-white transition-all duration-300',

        t.visible ? 'animate-toast-enter' : 'animate-toast-exit',

        typeStyles[type],
      )}
      onClick={() => toast.dismiss(t.id)}
    >
      {Icons[type]}

      <div className="grow text-[14px] leading-normal font-normal">
        {message}
      </div>

      <Button variant="ghost" onClick={handleDismiss} className="h-auto p-0">
        <CloseIcon className="cursor-pointer text-white" />
      </Button>
    </div>
  );
};
