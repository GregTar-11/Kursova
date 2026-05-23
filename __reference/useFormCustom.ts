import { useForm, FieldValues, DefaultValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

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
    onSuccess(data)
      .then(() => {
        reset(data);
      })
      .catch(() => {
        reset(data);
      });
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
