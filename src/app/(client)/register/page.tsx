'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { notifier } from '@/lib/notifier';
import { registerSchema, IRegisterData } from '@/schemas';
import { useFormCustom } from '@/hooks/useFormCustom';
import { ROUTES } from '@/constant/routes';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { InputPassword } from '@/components/ui/InputPassword';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();

  const { handleSubmit, methods, isSubmitting, isDirty } = useFormCustom<IRegisterData>(
    async ({ email, password }) => {
      await AuthService.register(email, password);
      notifier.success('Акаунт створено! Ласкаво просимо до Ramblers.');
      router.replace(ROUTES.HOME);
    },
    registerSchema,
    { email: '', password: '', confirmPassword: '' },
  );

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-c-headline mb-1">Реєстрація</h1>
          <p className="text-sm text-c-muted">Створіть обліковий запис безкоштовно</p>
        </div>

        <div className="bg-c-white border border-c-border rounded-lg overflow-hidden">
          <Form methods={methods} onSubmit={handleSubmit} variant="full">
            <Input name="email" label="Email" type="email" placeholder="your@email.com" />
            <InputPassword name="password" label="Пароль" placeholder="••••••••" />
            <InputPassword name="confirmPassword" label="Підтвердіть пароль" placeholder="••••••••" />

            <Button
              type="submit"
              variant="primary"
              size="big"
              disabled={!isDirty || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Створення...' : 'Зареєструватися'}
            </Button>
          </Form>
        </div>

        <p className="text-center text-sm text-c-muted mt-6">
          Вже є акаунт?{' '}
          <Link href={ROUTES.LOGIN} className="text-c-accent hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}
