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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Filters */}
      <div className="bg-c-white border border-c-border rounded-lg p-5 mb-8 flex flex-col md:flex-row md:items-end gap-5">
        <div className="flex-1">
          <p className="text-sm text-c-muted mb-2">Статус</p>
          <div className="flex gap-2 flex-wrap">
            {STATUS_TABS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatus(value)}
                className={cn(
                  'px-4 py-1.5 rounded-md text-sm font-medium border transition-colors cursor-pointer',
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
            <p className="text-sm text-c-muted mb-2">Ціна від, ₴</p>
            <input
              type="text"
              inputMode="numeric"
              value={filters.priceMin}
              onChange={(e) => setPrice('priceMin', e.target.value)}
              placeholder="0"
              className="w-28 h-9 rounded border border-c-border px-3 text-sm text-c-headline placeholder:text-c-base outline-none focus:border-c-accent transition-colors"
            />
          </div>
          <div>
            <p className="text-sm text-c-muted mb-2">до, ₴</p>
            <input
              type="text"
              inputMode="numeric"
              value={filters.priceMax}
              onChange={(e) => setPrice('priceMax', e.target.value)}
              placeholder="∞"
              className="w-28 h-9 rounded border border-c-border px-3 text-sm text-c-headline placeholder:text-c-base outline-none focus:border-c-accent transition-colors"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-c-muted hover:text-c-error transition-colors cursor-pointer whitespace-nowrap"
          >
            Скинути фільтри
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-c-muted mb-6">
        Знайдено: <span className="font-semibold text-c-headline">{filtered.length}</span> кемперів
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-c-muted text-lg mb-2">Кемперів не знайдено</p>
          <p className="text-sm text-c-base">Спробуйте змінити фільтри</p>
        </div>
      )}
    </div>
  );
}
