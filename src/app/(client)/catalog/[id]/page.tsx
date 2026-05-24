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

const formatPrice = (price: number) => new Intl.NumberFormat('uk-UA').format(price);

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
      <div className="bg-c-border relative aspect-[16/6] w-full">
        <Image
          src={imageUrl || '/placeholder-camper.jpg'}
          alt={name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Back link */}
        <Link
          href={ROUTES.CATALOG}
          className="text-c-muted hover:text-c-accent mb-6 inline-flex items-center gap-1 text-sm transition-colors"
        >
          ← Назад до каталогу
        </Link>

        {/* Title row */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h1 className="text-c-headline text-3xl font-bold md:text-4xl">{name}</h1>
          <span
            className={cn(
              'rounded-sm px-3 py-1 text-sm font-medium',
              status === 'available' ? 'bg-c-secondary text-c-white' : 'bg-c-border text-c-muted',
            )}
          >
            {CAMPER_STATUS_LABELS[status]}
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
          {/* Left: details */}
          <div className="flex flex-col gap-8">
            {/* Price */}
            <div>
              <p className="text-c-muted mb-1 text-sm">Вартість оренди</p>
              <p className="text-c-headline text-3xl font-bold">
                {formatPrice(price)}{' '}
                <span className="text-c-muted text-lg font-normal">₴ / доба</span>
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-c-headline mb-4 text-xl font-bold">Характеристики</h2>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-c-white border-c-border rounded-lg border p-4">
                  <dt className="text-c-muted mb-1 text-xs tracking-wide uppercase">Двигун</dt>
                  <dd className="text-c-headline font-semibold">{features.engine}</dd>
                </div>
                <div className="bg-c-white border-c-border rounded-lg border p-4">
                  <dt className="text-c-muted mb-1 text-xs tracking-wide uppercase">
                    Спальних місць
                  </dt>
                  <dd className="text-c-headline font-semibold">{features.beds}</dd>
                </div>
                <div className="bg-c-white border-c-border rounded-lg border p-4">
                  <dt className="text-c-muted mb-1 text-xs tracking-wide uppercase">Об'єм баку</dt>
                  <dd className="text-c-headline font-semibold">{features.tankVolume} л</dd>
                </div>
              </dl>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-c-headline mb-3 text-xl font-bold">Опис</h2>
              <p className="text-c-headline leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          </div>

          {/* Right: order form */}
          <div>
            <div className="bg-c-white border-c-border sticky top-24 overflow-hidden rounded-lg border">
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-c-headline mb-1 text-xl font-bold">Замовити цей кемпер</h2>
                <p className="text-c-muted text-sm">Залиште заявку — ми зв'яжемося з вами</p>
              </div>
              <OrderForm camperId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
