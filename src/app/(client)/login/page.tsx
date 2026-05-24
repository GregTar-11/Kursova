'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { notifier } from '@/lib/notifier';
import { loginSchema, ILoginData } from '@/schemas';
import { useFormCustom } from '@/hooks/useFormCustom';
import { ROUTES } from '@/constant/routes';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { InputPassword } from '@/components/ui/InputPassword';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();

  const { handleSubmit, methods, isSubmitting, isDirty } = useFormCustom<ILoginData>(
    async ({ email, password }) => {
      await AuthService.loginClient(email, password);
      notifier.success('Ласкаво просимо!');
      router.replace(ROUTES.HOME);
    },
    loginSchema,
    { email: '', password: '' },
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-c-headline mb-1 text-2xl font-bold">Вхід</h1>
          <p className="text-c-muted text-sm">Увійдіть до свого облікового запису</p>
        </div>

        <div className="bg-c-white border-c-border overflow-hidden rounded-lg border">
          <Form methods={methods} onSubmit={handleSubmit} variant="full">
            <Input name="email" label="Email" type="email" placeholder="your@email.com" />
            <InputPassword name="password" label="Пароль" placeholder="••••••••" />

            <Button
              type="submit"
              variant="primary"
              size="big"
              disabled={!isDirty || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Вхід...' : 'Увійти'}
            </Button>
          </Form>
        </div>

        <p className="text-c-muted mt-6 text-center text-sm">
          Немає акаунту?{' '}
          <Link href={ROUTES.REGISTER} className="text-c-accent hover:underline">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}
