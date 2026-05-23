import Link from 'next/link';
import { ROUTES } from '@/constant/routes';

export default function Footer() {
  return (
    <footer className="bg-c-white border-t border-c-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href={ROUTES.HOME} className="text-lg font-bold text-c-accent">
          Ramblers
        </Link>

        <p className="text-sm text-c-muted text-center">
          © {new Date().getFullYear()} Ramblers. Все права защищены.
        </p>

        <nav className="flex items-center gap-4 text-sm text-c-muted">
          <Link href={ROUTES.HOME} className="hover:text-c-accent transition-colors">
            Главная
          </Link>
          <Link href={ROUTES.CATALOG} className="hover:text-c-accent transition-colors">
            Каталог
          </Link>
        </nav>
      </div>
    </footer>
  );
}
