'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { AuthService } from '@/services/auth.service';
import { loginSchema, ILoginData } from '@/schemas';
import { useFormCustom } from '@/hooks/useFormCustom';
import { ROUTES } from '@/constant/routes';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { InputPassword } from '@/components/ui/InputPassword';
import { Button } from '@/components/ui/Button';
import PageLoader from '@/components/ui/PageLoader';

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role === 'admin') {
      router.replace(ROUTES.ADMIN);
    }
  }, [user, loading, router]);

  const { handleSubmit, methods, isSubmitting, isDirty } = useFormCustom<ILoginData>(
    async ({ email, password }) => {
      await AuthService.login(email, password);
      router.replace(ROUTES.ADMIN);
    },
    loginSchema,
    { email: '', password: '' },
  );

  if (loading) return <PageLoader message="Завантаження..." />;

  if (user?.role === 'admin') return <PageLoader message="Перенаправлення..." />;

  return (
    <div className="bg-c-bg flex h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-c-headline mb-1 text-2xl font-bold">Ramblers</h1>
          <p className="text-c-muted text-sm">Вхід до панелі адміністратора</p>
        </div>

        <div className="bg-c-white border-c-border overflow-hidden rounded-lg border">
          <Form methods={methods} onSubmit={handleSubmit} variant="full">
            <Input name="email" label="Email" type="email" placeholder="admin@ramblers.ua" />

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

        <p className="text-c-muted mt-4 text-center text-sm">
          Немає акаунту?{' '}
          <Link href={ROUTES.ADMIN_REGISTER} className="text-c-accent hover:underline">
            Зареєструватись
          </Link>
        </p>
      </div>
    </div>
  );
}
