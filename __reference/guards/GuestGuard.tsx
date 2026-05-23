'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { Loading } from '@/components/UI/Loading';
import { useRouter } from '@/services/lib/navigate';
import { useLocale } from 'next-intl';

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  // const { user, loading } = useAuth();
  // const router = useRouter();
  // const locale = useLocale();

  // const prevLocaleRef = useRef(locale);
  // const isLocaleChanging = prevLocaleRef.current !== locale;

  // useEffect(() => {
  //   if (!loading && user) {
  //     router.replace('/boards');
  //   }
  //   prevLocaleRef.current = locale;
  // }, [user, loading, router, locale]);

  // if ((loading || user ) && isLocaleChanging) {
  //   return <Loading />;
  // }

  return <>{children}</>;
};
