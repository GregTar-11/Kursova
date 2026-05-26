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
import { formatPrice } from '@/helpers/formatPrice';

export default function AdminCampersPage() {
  const { campers, loading, refresh } = useCampers();
  const [selected, setSelected] = useState<Camper | null>(null);
  const [showForm, setShowForm] = useState(false);

  const openCreate = () => {
    setSelected(null);
    setShowForm(true);
  };
  const openEdit = (camper: Camper) => {
    setSelected(camper);
    setShowForm(true);
  };
  const closeForm = () => {
    setSelected(null);
    setShowForm(false);
  };

  const handleDelete = async (camper: Camper) => {
    if (!confirm(`Видалити «${camper.name}»?`)) return;
    await CamperService.delete(camper.id)
      .then(() => {
        notifier.success('Кемпер видалено');
        refresh();
      })
      .catch(() => notifier.error('Помилка видалення'));
  };

  const handleSuccess = () => {
    closeForm();
    refresh();
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_400px]">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-c-headline text-2xl font-bold">Кемпери</h1>
            <p className="text-c-muted text-sm">{campers.length} у каталозі</p>
          </div>
          <Button variant="primary" size="medium" onClick={openCreate}>
            + Додати
          </Button>
        </div>

        {loading ? (
          <p className="text-c-muted py-10 text-center text-sm">Завантаження...</p>
        ) : campers.length === 0 ? (
          <p className="text-c-muted py-10 text-center text-sm">Кемперів ще немає</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {campers.map((camper) => (
              <li
                key={camper.id}
                className={cn(
                  'bg-c-white flex items-center gap-4 rounded-lg border p-3 transition-colors',
                  selected?.id === camper.id ? 'border-c-accent' : 'border-c-border',
                )}
              >
                <div className="bg-c-border relative h-12 w-16 shrink-0 overflow-hidden rounded">
                  {camper.images && (
                    <Image src={camper.images[0]} alt={camper.name} fill className="object-cover" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-c-headline truncate text-sm font-semibold">{camper.name}</p>
                  <p className="text-c-muted text-xs">
                    {formatPrice(camper.price)} ₴/доба ·{' '}
                    <span
                      className={camper.status === 'available' ? 'text-c-success' : 'text-c-muted'}
                    >
                      {CAMPER_STATUS_LABELS[camper.status]}
                    </span>
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
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
        <div className="bg-c-white border-c-border sticky top-24 overflow-hidden rounded-lg border">
          <div className="border-c-border border-b px-6 pt-5 pb-2">
            <h2 className="text-c-headline font-bold">
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
