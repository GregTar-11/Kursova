'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthService } from '@/services/auth.service';
import { ROUTES } from '@/constant/routes';
import { Button } from '@/components/ui/Button';
import { cn } from '@/helpers/cn';

const NAV_LINKS = [
  { label: 'Головна', href: ROUTES.HOME },
  { label: 'Каталог', href: ROUTES.CATALOG },
] as const;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await AuthService.logout();
    router.replace(ROUTES.HOME);
  };

  return (
    <header className="bg-c-white border-c-border sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <Link
          href={ROUTES.HOME}
          className="text-c-accent shrink-0 text-xl font-bold tracking-tight"
        >
          Ramblers
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm transition-colors',
                pathname === href
                  ? 'text-c-accent font-semibold'
                  : 'text-c-headline hover:text-c-accent',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth section */}
        {!loading && (
          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <span className="text-c-muted hidden max-w-[160px] truncate text-sm md:block">
                  {user.email}
                </span>
                <Button variant="ghost" size="small" onClick={handleLogout}>
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline" size="small">
                    Увійти
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button variant="primary" size="small">
                    Реєстрація
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
