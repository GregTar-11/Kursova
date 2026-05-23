import { cn } from '@/helpers/cn';
import { useTranslations } from 'next-intl';
import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const t = useTranslations();
    return (
      <div className="flex w-full flex-col gap-2 relative">
        <label className="text-c-headline text-[13px] font-medium ">
          {t('Boards.form.description')}
        </label>

        <textarea
          ref={ref}
          maxLength={500}
          className={cn(
            'min-h-29 w-full rounded-md border px-3 py-1.75  outline-none text-[13px] font-poppins',
            'border-c-border focus:border-c-accent',
            'placeholder:text-c-base text-c-headline resize-y',
            error && 'border-c-error focus:border-c-error',
            className,
          )}
          placeholder={t('Boards.form.descriptionPlaceholder')}
          {...props}
        />
        {error && <span className="text-c-error text-[13px] absolute bottom-5">{t(error)}</span>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
