'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constant/routes';
import AdminHeader from '@/components/features/AdminHeader/AdminHeader';
import PageLoader from '@/components/ui/PageLoader';

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace(ROUTES.ADMIN_LOGIN);
    }
  }, [user, loading, router]);

  if (loading) return <PageLoader message="Завантаження..." />;

  if (!user || user.role !== 'admin') return <PageLoader message="Перенаправлення..." />;

  return (
    <div className="bg-c-bg flex h-screen flex-col">
      <AdminHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
