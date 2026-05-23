import { DefaultToastOptions } from 'react-hot-toast';
import { ReactNode } from 'react';
import { renderCustomToast} from '@/components/UI/ToastMessage/renderCustomToast';
import { ToastType } from '@/components/UI/ToastMessage/ToastMessage';

class Notifier {
  private defaultOptions: DefaultToastOptions = {
    duration: 4000,
    position: 'top-right',
  };

  success(message: ReactNode) {
    renderCustomToast(message, ToastType.success, this.defaultOptions);
  }

  error(message: ReactNode, id: string = 'api-error') {
    renderCustomToast(message, ToastType.error, { ...this.defaultOptions, id });
  }


  warning(message: ReactNode) {
    renderCustomToast(message, ToastType.warning, this.defaultOptions);
  }
}

export const notifier = new Notifier();