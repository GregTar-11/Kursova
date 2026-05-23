'use client';

import { useForm, FieldValues, DefaultValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { notifier } from '@/lib/notifier';

export const useFormCustom = <T extends FieldValues>(
  onSuccess: (data: T) => Promise<void>,
  schema: AnyObjectSchema,
  defaultValues?: DefaultValues<T>,
) => {
  const methods = useForm<T>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data: T) => {
    try {
      await onSuccess(data);
      reset(data);
    } catch (err) {
      notifier.error(err instanceof Error ? err.message : 'Помилка. Спробуйте ще раз');
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isSubmitting,
    isDirty,
    methods,
  };
};
