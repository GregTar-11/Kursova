import { ISignupData, signupSchema } from '@/validation/schema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export type SafeData = Omit<ISignupData, 'passwordAgain'>;

interface IUseSignupForm {
  onSuccess: (credentials: SafeData) => Promise<void>;
}

export const useSignupForm = ({ onSuccess }: IUseSignupForm) => {
  const methods = useForm<ISignupData>({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  const onSubmit: SubmitHandler<ISignupData> = async (data) => {
    const { passwordAgain, ...credentials } = data;

    onSuccess(credentials)
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
