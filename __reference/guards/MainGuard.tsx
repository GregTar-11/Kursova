'use client';

import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Loading } from '@/components/UI/Loading';
import { useRouter } from '@/services/lib/navigate';
import { ROUTES } from '@/constant/routes';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(ROUTES.LOGIN);
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;

  return user ? <>{children}</> : null;
};
