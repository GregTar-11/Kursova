'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthService } from '@/services/auth.service';
import { ROUTES } from '@/constant/routes';
import { Button } from '@/components/ui/Button';

export default function AdminHeader() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await AuthService.logout();
    router.replace(ROUTES.ADMIN_LOGIN);
  };

  return (
    <header className="bg-c-white border-c-border border-b">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
        <nav className="flex items-center gap-6">
          <span className="text-c-accent font-bold">Ramblers Admin</span>
          <Link
            href={ROUTES.ADMIN}
            className="text-c-headline hover:text-c-accent text-sm transition-colors"
          >
            Замовлення
          </Link>
          <Link
            href={ROUTES.ADMIN_CAMPERS}
            className="text-c-headline hover:text-c-accent text-sm transition-colors"
          >
            Кемпери
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-c-muted hidden text-sm md:block">{user?.email}</span>
          <Button variant="ghost" size="small" onClick={handleLogout}>
            Вийти
          </Button>
        </div>
      </div>
    </header>
  );
}
