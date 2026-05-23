'use client';

import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { loginSchema, ILoginData } from '@/schemas';
import { useFormCustom } from '@/hooks/useFormCustom';
import { ROUTES } from '@/constant/routes';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { InputPassword } from '@/components/ui/InputPassword';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();

  const { handleSubmit, methods, isSubmitting, isDirty } = useFormCustom<ILoginData>(
    async ({ email, password }) => {
      await AuthService.login(email, password);
      router.replace(ROUTES.ADMIN);
    },
    loginSchema,
    { email: '', password: '' },
  );

  return (
    <div className="min-h-screen bg-c-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-c-headline mb-1">Ramblers</h1>
          <p className="text-sm text-c-muted">Вхід до панелі адміністратора</p>
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
      </div>
    </div>
  );
}
