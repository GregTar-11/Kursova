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
      <div className="bg-c-white border-b border-c-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-c-headline mb-2">Каталог кемперів</h1>
          <p className="text-c-muted">Знайдіть ідеальний будинок на колесах для вашої подорожі</p>
        </div>
      </div>

      <CatalogContent campers={campers} />
    </>
  );
}
