'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camper } from '@/types';
import { CAMPER_STATUS_LABELS } from '@/constant/regular';
import { CamperService } from '@/services/camper.service';
import { notifier } from '@/lib/notifier';
import { useCampers } from '@/hooks/useCampers';
import CamperForm from '@/components/features/CamperForm/CamperForm';
import { Button } from '@/components/ui/Button';
import { cn } from '@/helpers/cn';

const formatPrice = (price: number) => new Intl.NumberFormat('uk-UA').format(price);

export default function AdminCampersPage() {
  const { campers, loading, refresh } = useCampers();
  const [selected, setSelected] = useState<Camper | null>(null);
  const [showForm, setShowForm] = useState(false);

  const openCreate = () => { setSelected(null); setShowForm(true); };
  const openEdit = (camper: Camper) => { setSelected(camper); setShowForm(true); };
  const closeForm = () => { setSelected(null); setShowForm(false); };

  const handleDelete = async (camper: Camper) => {
    if (!confirm(`Видалити «${camper.name}»?`)) return;
    await CamperService.delete(camper.id)
      .then(() => { notifier.success('Кемпер видалено'); refresh(); })
      .catch(() => notifier.error('Помилка видалення'));
  };

  const handleSuccess = () => { closeForm(); refresh(); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-c-headline">Кемпери</h1>
            <p className="text-sm text-c-muted">{campers.length} у каталозі</p>
          </div>
          <Button variant="primary" size="medium" onClick={openCreate}>
            + Додати
          </Button>
        </div>

        {loading ? (
          <p className="text-c-muted text-sm py-10 text-center">Завантаження...</p>
        ) : campers.length === 0 ? (
          <p className="text-c-muted text-sm py-10 text-center">Кемперів ще немає</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {campers.map((camper) => (
              <li
                key={camper.id}
                className={cn(
                  'flex items-center gap-4 bg-c-white border rounded-lg p-3 transition-colors',
                  selected?.id === camper.id ? 'border-c-accent' : 'border-c-border',
                )}
              >
                <div className="relative w-16 h-12 rounded overflow-hidden shrink-0 bg-c-border">
                  {camper.imageUrl && (
                    <Image src={camper.imageUrl} alt={camper.name} fill className="object-cover" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-c-headline text-sm truncate">{camper.name}</p>
                  <p className="text-xs text-c-muted">
                    {formatPrice(camper.price)} ₴/доба ·{' '}
                    <span className={camper.status === 'available' ? 'text-c-success' : 'text-c-muted'}>
                      {CAMPER_STATUS_LABELS[camper.status]}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="small" onClick={() => openEdit(camper)}>
                    Ред.
                  </Button>
                  <Button variant="error" size="small" onClick={() => handleDelete(camper)}>
                    Вид.
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showForm && (
        <div className="bg-c-white border border-c-border rounded-lg overflow-hidden sticky top-24">
          <div className="px-6 pt-5 pb-2 border-b border-c-border">
            <h2 className="font-bold text-c-headline">
              {selected ? `Редагувати: ${selected.name}` : 'Новий кемпер'}
            </h2>
          </div>
          <CamperForm
            key={selected?.id ?? 'new'}
            camper={selected ?? undefined}
            onSuccess={handleSuccess}
            onCancel={closeForm}
          />
        </div>
      )}
    </div>
  );
}
