import Image from 'next/image';
import Link from 'next/link';
import { Camper } from '@/types';
import { ROUTES } from '@/constant/routes';
import { Button } from '@/components/ui/Button';
import { cn } from '@/helpers/cn';

interface CamperCardProps {
  camper: Camper;
}

const STATUS_MAP = {
  available: { label: 'Доступен', className: 'bg-c-secondary text-c-white' },
  booked: { label: 'Забронирован', className: 'bg-c-border text-c-muted' },
} as const;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU').format(price);

export default function CamperCard({ camper }: CamperCardProps) {
  const { id, name, price, features, imageUrl, status } = camper;
  const statusInfo = STATUS_MAP[status];

  return (
    <article className="flex flex-col bg-c-white border border-c-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageUrl || '/placeholder-camper.jpg'}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        <span
          className={cn(
            'absolute top-3 left-3 px-2 py-0.5 rounded-sm text-xs font-medium',
            statusInfo.className,
          )}
        >
          {statusInfo.label}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-bold text-c-headline text-base leading-snug">{name}</h3>

        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-c-muted">
          <li>{features.engine}</li>
          <li className="before:content-['·'] before:mr-3">{features.beds} кровати</li>
          <li className="before:content-['·'] before:mr-3">{features.tankVolume} л бак</li>
        </ul>

        <p className="text-c-headline font-semibold mt-auto">
          {formatPrice(price)}{' '}
          <span className="text-sm font-normal text-c-muted">₽ / сутки</span>
        </p>

        <Link href={ROUTES.CAMPER(id)} className="w-full">
          <Button variant="outline" size="medium" className="w-full">
            Подробнее →
          </Button>
        </Link>
      </div>
    </article>
  );
}
