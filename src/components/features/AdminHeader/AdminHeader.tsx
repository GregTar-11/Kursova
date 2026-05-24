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
    <header className="bg-c-white border-b border-c-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <span className="font-bold text-c-accent">Ramblers Admin</span>
          <Link
            href={ROUTES.ADMIN}
            className="text-sm text-c-headline hover:text-c-accent transition-colors"
          >
            Замовлення
          </Link>
          <Link
            href={ROUTES.ADMIN_CAMPERS}
            className="text-sm text-c-headline hover:text-c-accent transition-colors"
          >
            Кемпери
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-c-muted hidden md:block">{user?.email}</span>
          <Button variant="ghost" size="small" onClick={handleLogout}>
            Вийти
          </Button>
        </div>
      </div>
    </header>
  );
}
