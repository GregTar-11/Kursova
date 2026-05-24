import Image from 'next/image';
import Link from 'next/link';
import { Camper } from '@/types';
import { ROUTES } from '@/constant/routes';
import { CAMPER_STATUS_LABELS } from '@/constant/regular';
import { Button } from '@/components/ui/Button';
import { cn } from '@/helpers/cn';
import { formatPrice } from '@/helpers/formatPrice';

interface CamperCardProps {
  camper: Camper;
}

const STATUS_STYLE: Record<string, string> = {
  available: 'bg-c-secondary text-c-white',
  booked: 'bg-c-border text-c-muted',
};

export default function CamperCard({ camper }: CamperCardProps) {
  const { id, name, price, features, imageUrl, status } = camper;

  return (
    <article className="bg-c-white border-c-border flex flex-col overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
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
            'absolute top-3 left-3 rounded-sm px-2 py-0.5 text-xs font-medium',
            STATUS_STYLE[status],
          )}
        >
          {CAMPER_STATUS_LABELS[status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-c-headline text-base leading-snug font-bold">{name}</h3>

        <ul className="text-c-muted flex flex-wrap gap-x-3 gap-y-1 text-sm">
          <li>{features.engine}</li>
          <li className="before:mr-3 before:content-['·']">{features.beds} ліжка</li>
          <li className="before:mr-3 before:content-['·']">{features.tankVolume} л бак</li>
        </ul>

        <p className="text-c-headline mt-auto font-semibold">
          {formatPrice(price)} <span className="text-c-muted text-sm font-normal">₴ / доба</span>
        </p>

        <Link href={ROUTES.CAMPER(id)} className="w-full">
          <Button variant="outline" size="medium" className="w-full">
            Детальніше →
          </Button>
        </Link>
      </div>
    </article>
  );
}
