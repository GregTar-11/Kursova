'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constant/routes';
import { cn } from '@/helpers/cn';

const NAV_LINKS = [
  { label: 'Главная', href: ROUTES.HOME },
  { label: 'Каталог', href: ROUTES.CATALOG },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-c-white border-b border-c-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href={ROUTES.HOME} className="text-xl font-bold text-c-accent tracking-tight">
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
      </div>
    </header>
  );
}
