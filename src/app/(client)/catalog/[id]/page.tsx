import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CamperService } from '@/services/camper.service';
import { CAMPER_STATUS_LABELS } from '@/constant/regular';
import { ROUTES } from '@/constant/routes';
import { cn } from '@/helpers/cn';
import OrderForm from '@/components/features/OrderForm/OrderForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('uk-UA').format(price);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const camper = await CamperService.getById(id).catch(() => null);
  if (!camper) return { title: 'Кемпер не знайдено — Ramblers' };
  return {
    title: `${camper.name} — Ramblers`,
    description: camper.description.slice(0, 160),
  };
}

export default async function CamperPage({ params }: PageProps) {
  const { id } = await params;
  const camper = await CamperService.getById(id).catch(() => null);

  if (!camper) notFound();

  const { name, price, description, features, imageUrl, status } = camper;

  return (
    <>
      {/* Hero image */}
      <div className="relative w-full aspect-[16/6] bg-c-border">
        <Image
          src={imageUrl || '/placeholder-camper.jpg'}
          alt={name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Back link */}
        <Link
          href={ROUTES.CATALOG}
          className="inline-flex items-center gap-1 text-sm text-c-muted hover:text-c-accent transition-colors mb-6"
        >
          ← Назад до каталогу
        </Link>

        {/* Title row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-c-headline">{name}</h1>
          <span
            className={cn(
              'px-3 py-1 rounded-sm text-sm font-medium',
              status === 'available'
                ? 'bg-c-secondary text-c-white'
                : 'bg-c-border text-c-muted',
            )}
          >
            {CAMPER_STATUS_LABELS[status]}
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          {/* Left: details */}
          <div className="flex flex-col gap-8">
            {/* Price */}
            <div>
              <p className="text-sm text-c-muted mb-1">Вартість оренди</p>
              <p className="text-3xl font-bold text-c-headline">
                {formatPrice(price)}{' '}
                <span className="text-lg font-normal text-c-muted">₴ / доба</span>
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-bold text-c-headline mb-4">Характеристики</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-c-white border border-c-border rounded-lg p-4">
                  <dt className="text-xs text-c-muted uppercase tracking-wide mb-1">Двигун</dt>
                  <dd className="font-semibold text-c-headline">{features.engine}</dd>
                </div>
                <div className="bg-c-white border border-c-border rounded-lg p-4">
                  <dt className="text-xs text-c-muted uppercase tracking-wide mb-1">Спальних місць</dt>
                  <dd className="font-semibold text-c-headline">{features.beds}</dd>
                </div>
                <div className="bg-c-white border border-c-border rounded-lg p-4">
                  <dt className="text-xs text-c-muted uppercase tracking-wide mb-1">Об'єм баку</dt>
                  <dd className="font-semibold text-c-headline">{features.tankVolume} л</dd>
                </div>
              </dl>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-c-headline mb-3">Опис</h2>
              <p className="text-c-headline leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          </div>

          {/* Right: order form */}
          <div>
            <div className="sticky top-24 bg-c-white border border-c-border rounded-lg overflow-hidden">
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-xl font-bold text-c-headline mb-1">Замовити цей кемпер</h2>
                <p className="text-sm text-c-muted">Залиште заявку — ми зв'яжемося з вами</p>
              </div>
              <OrderForm camperId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
