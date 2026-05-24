import Link from 'next/link';
import { ROUTES } from '@/constant/routes';

export default function Footer() {
  return (
    <footer className="bg-c-white border-c-border mt-auto border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-8">
        <Link href={ROUTES.HOME} className="text-c-accent text-lg font-bold">
          Ramblers
        </Link>

        <p className="text-c-muted text-center text-sm">
          © {new Date().getFullYear()} Ramblers. Усі права захищені.
        </p>

        <nav className="text-c-muted flex items-center gap-4 text-sm">
          <Link href={ROUTES.HOME} className="hover:text-c-accent transition-colors">
            Головна
          </Link>
          <Link href={ROUTES.CATALOG} className="hover:text-c-accent transition-colors">
            Каталог
          </Link>
        </nav>
      </div>
    </footer>
  );
}
