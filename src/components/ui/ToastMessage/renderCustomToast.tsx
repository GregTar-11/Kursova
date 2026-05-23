import { toast, DefaultToastOptions } from 'react-hot-toast';
import { ReactNode } from 'react';
import { ToastMessage, ToastType } from './ToastMessage';

export const renderCustomToast = (
  message: ReactNode,
  type: ToastType,
  options?: DefaultToastOptions,
) =>
  toast.custom(
    (t) => <ToastMessage t={t} message={message} type={type} />,
    options,
  );
