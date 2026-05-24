import type { Metadata } from 'next';
import { CamperService } from '@/services/camper.service';
import CatalogContent from '@/components/features/CatalogContent/CatalogContent';

export const metadata: Metadata = {
  title: 'Каталог кемперів — Ramblers',
  description: 'Оберіть кемпер для вашої подорожі. Фільтрація за статусом та ціною.',
};

export default async function CatalogPage() {
  const campers = await CamperService.getAll().catch(() => []);

  return (
    <>
      <div className="bg-c-white border-c-border border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <h1 className="text-c-headline mb-2 text-3xl font-bold md:text-4xl">Каталог кемперів</h1>
          <p className="text-c-muted">Знайдіть ідеальний будинок на колесах для вашої подорожі</p>
        </div>
      </div>

      <CatalogContent campers={campers} />
    </>
  );
}
