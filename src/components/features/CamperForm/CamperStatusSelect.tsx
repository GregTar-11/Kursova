'use client';

import { useFormContext } from 'react-hook-form';
import { CAMPER_STATUS_LABELS } from '@/constant/regular';
import { ICamperData } from '@/schemas';
import { cn } from '@/helpers/cn';

const STATUS_OPTIONS = Object.entries(CAMPER_STATUS_LABELS);

export default function CamperStatusSelect() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ICamperData>();
  const error = errors.status?.message;

  return (
    <div className="flex flex-col gap-2 text-[13px]">
      <label className={cn('font-medium', error ? 'text-c-error' : 'text-c-headline')}>
        Статус
      </label>
      <select
        {...register('status')}
        className={cn(
          'bg-c-white h-9 w-full rounded border px-3 text-[13px] transition-all outline-none',
          error
            ? 'border-c-error text-c-error focus:ring-c-error focus:ring-1'
            : 'border-c-border text-c-headline focus:border-c-accent',
        )}
      >
        {STATUS_OPTIONS.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="text-c-error text-[12px]">{error}</span>}
    </div>
  );
}
