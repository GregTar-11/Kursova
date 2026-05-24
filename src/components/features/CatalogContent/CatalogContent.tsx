'use client';

import { Camper } from '@/types';
import { CAMPER_STATUS_LABELS } from '@/constant/regular';
import { useCatalogFilters, CatalogFilters } from '@/hooks/useCatalogFilters';
import CamperCard from '@/components/features/CamperCard/CamperCard';
import { cn } from '@/helpers/cn';

const STATUS_TABS: { value: CatalogFilters['status']; label: string }[] = [
  { value: 'all', label: 'Усі' },
  { value: 'available', label: CAMPER_STATUS_LABELS.available },
  { value: 'booked', label: CAMPER_STATUS_LABELS.booked },
];

interface CatalogContentProps {
  campers: Camper[];
}

export default function CatalogContent({ campers }: CatalogContentProps) {
  const { filters, filtered, setStatus, setPrice, resetFilters, hasActiveFilters } =
    useCatalogFilters(campers);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      {/* Filters */}
      <div className="bg-c-white border-c-border mb-8 flex flex-col gap-5 rounded-lg border p-5 md:flex-row md:items-end">
        <div className="flex-1">
          <p className="text-c-muted mb-2 text-sm">Статус</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatus(value)}
                className={cn(
                  'cursor-pointer rounded-md border px-4 py-1.5 text-sm font-medium transition-colors',
                  filters.status === value
                    ? 'bg-c-accent border-c-accent text-c-white'
                    : 'border-c-border text-c-headline hover:border-c-accent hover:text-c-accent',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-3">
          <div>
            <p className="text-c-muted mb-2 text-sm">Ціна від, ₴</p>
            <input
              type="text"
              inputMode="numeric"
              value={filters.priceMin}
              onChange={(e) => setPrice('priceMin', e.target.value)}
              placeholder="0"
              className="border-c-border text-c-headline placeholder:text-c-base focus:border-c-accent h-9 w-28 rounded border px-3 text-sm transition-colors outline-none"
            />
          </div>
          <div>
            <p className="text-c-muted mb-2 text-sm">до, ₴</p>
            <input
              type="text"
              inputMode="numeric"
              value={filters.priceMax}
              onChange={(e) => setPrice('priceMax', e.target.value)}
              placeholder="∞"
              className="border-c-border text-c-headline placeholder:text-c-base focus:border-c-accent h-9 w-28 rounded border px-3 text-sm transition-colors outline-none"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-c-muted hover:text-c-error cursor-pointer text-sm whitespace-nowrap transition-colors"
          >
            Скинути фільтри
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-c-muted mb-6 text-sm">
        Знайдено: <span className="text-c-headline font-semibold">{filtered.length}</span> кемперів
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-c-muted mb-2 text-lg">Кемперів не знайдено</p>
          <p className="text-c-base text-sm">Спробуйте змінити фільтри</p>
        </div>
      )}
    </div>
  );
}
