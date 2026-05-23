'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { AuthService } from '@/services/auth.service';
import { registerSchema, IRegisterData } from '@/schemas';
import { useFormCustom } from '@/hooks/useFormCustom';
import { ROUTES } from '@/constant/routes';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { InputPassword } from '@/components/ui/InputPassword';
import { Button } from '@/components/ui/Button';

export default function AdminRegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role === 'admin') {
      router.replace(ROUTES.ADMIN);
    }
  }, [user, loading, router]);

  const { handleSubmit, methods, isSubmitting, isDirty } = useFormCustom<IRegisterData>(
    async ({ email, password }) => {
      await AuthService.registerAdmin(email, password);
      router.replace(ROUTES.ADMIN);
    },
    registerSchema,
    { email: '', password: '' },
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-c-bg flex items-center justify-center">
        <p className="text-c-muted text-sm">Завантаження...</p>
      </div>
    );
  }

  if (user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-c-bg flex items-center justify-center">
        <p className="text-c-muted text-sm">Перенаправлення...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-c-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-c-headline mb-1">Ramblers</h1>
          <p className="text-sm text-c-muted">Реєстрація адміністратора</p>
        </div>

        <div className="bg-c-white border border-c-border rounded-lg overflow-hidden">
          <Form methods={methods} onSubmit={handleSubmit} variant="full">
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="admin@ramblers.ua"
            />

            <InputPassword
              name="password"
              label="Пароль"
              placeholder="••••••••"
            />

            <InputPassword
              name="confirmPassword"
              label="Підтвердіть пароль"
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              size="big"
              disabled={!isDirty || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Реєстрація...' : 'Зареєструватись'}
            </Button>
          </Form>
        </div>

        <p className="text-center text-sm text-c-muted mt-4">
          Вже є акаунт?{' '}
          <Link href={ROUTES.ADMIN_LOGIN} className="text-c-accent hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}
