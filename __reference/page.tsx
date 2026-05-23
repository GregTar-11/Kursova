'use client';
import { Button } from '@/components/UI/Button';
import { Form } from '@/components/UI/Form';
import { Input } from '@/components/UI/Input/Input';

import { InputPassword } from '@/components/UI/Input/InputPassword';
import { Text } from '@/components/UI/Text';
import { useFormCustom } from '@/hooks/useFormCustom';
import { AuthService } from '@/services/firebase/auth.service';
import { Link, useRouter } from '@/services/lib/navigate';
import { ILoginData, loginSchema } from '@/validation/schema';
import { useTranslations } from 'next-intl';
import Googl from '@/assets/svg/google-icon-logo-svgrepo-com.svg';
import { PAGE } from '@/constant/namespaces';
import { ROUTES } from '@/constant/routes';
import { I18N_CONSTRAINTS } from '@/constant/i18Container';
import { useAppNotifier } from '@/hooks/useAppNotifier';

const LoginPage = () => {
  const t = useTranslations(PAGE.LOGIN);
  // const t = useTranslations('auth.login');
  const { showError, showSuccess } = useAppNotifier();

  const router = useRouter();

  const handleLoginSubmit = async (data: ILoginData) => {
    AuthService.login(data)
      .then(() => {
        showSuccess('success.login');
        router.replace(PAGE.BOARDS);
      })
      .catch(showError);
  };

  const signInWithGoogle = async () => {
    AuthService.signInWithGoogle().catch(showError);
  };

  const { handleSubmit, methods, isSubmitting, isDirty } =
    useFormCustom<ILoginData>(handleLoginSubmit, loginSchema);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Form onSubmit={handleSubmit} methods={methods} variant="big">
        <Text variant="h1">{t('title')}</Text>

        <div className="flex flex-col gap-4.75">
          <Input
            label={t('email_label')}
            name="email"
            type="email"
            placeholder={t('email_placeholder')}
          />

          <InputPassword
            label={t('password_label')}
            name="password"
            placeholder={t('password_placeholder')}
            count={I18N_CONSTRAINTS.PASSWORD}
          />
        </div>

        <div className="flex flex-col items-center gap-5">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            disabled={isSubmitting || !isDirty}
            className="w-full"
          >
            {t('submit_button')}
          </Button>
          <div className="flex w-full flex-1 items-center">
            <div className="bg-c-headline/20 h-px grow"></div>

            <span className="text-c-base text-[13px] font-medium">
              {t('divider')}
            </span>

            <div className="bg-c-headline/20 h-px grow"></div>
          </div>

          <Button
            onClick={signInWithGoogle}
            type="button"
            variant="ghost"
            size="medium"
            className="hover:bg-c-divider max-w-80 rounded-full"
          >
            <Googl className="mr-2 h-5 w-5" />
            {t('facebook_button')}
          </Button>
        </div>
      </Form>
      <p className="text-c-headline mt-4 block h-auto text-[13px] leading-5 font-medium tracking-[0px]">
        {t('footer_text')}{' '}
        <Link href={ROUTES.SIGNUP} className="text-c-accent ml-0.5">
          {t('link_text')}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
