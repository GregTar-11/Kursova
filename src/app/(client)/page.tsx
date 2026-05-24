import Link from 'next/link';
import { CamperService } from '@/services/camper.service';
import { ROUTES } from '@/constant/routes';
import { Button } from '@/components/ui/Button';
import CamperCard from '@/components/features/CamperCard/CamperCard';
import OrderForm from '@/components/features/OrderForm/OrderForm';

export default async function HomePage() {
  const topCampers = await CamperService.getTopAvailable().catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-c-secondary py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <h1 className="text-c-white mb-6 text-4xl leading-tight font-bold md:text-5xl">
            Мандруй у своєму темпі
          </h1>
          <p className="text-c-white/80 mx-auto mb-10 max-w-xl text-lg leading-relaxed">
            Орендуй будинок на колесах і відкрий Україну без обмежень. Зручно, комфортно,
            незабутньо.
          </p>
          <Link href={ROUTES.CATALOG}>
            <Button variant="primary" size="big">
              Переглянути каталог
            </Button>
          </Link>
        </div>
      </section>

      {/* Top campers */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="text-c-headline mb-2 text-2xl font-bold md:text-3xl">Топ пропозиції</h2>
          <p className="text-c-muted mb-8">Найпопулярніші кемпери, доступні прямо зараз</p>

          {topCampers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {topCampers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>
          ) : (
            <p className="text-c-muted py-12 text-center">
              Кемпери незабаром з&apos;являться в каталозі.
            </p>
          )}

          {topCampers.length > 0 && (
            <div className="mt-10 text-center">
              <Link href={ROUTES.CATALOG}>
                <Button variant="outline" size="medium">
                  Весь каталог →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick order */}
      <section className="bg-c-white border-c-border border-t py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-lg">
            <div className="mb-8 text-center">
              <h2 className="text-c-headline mb-3 text-2xl font-bold md:text-3xl">
                Швидке замовлення
              </h2>
              <p className="text-c-muted">Залиште заявку і ми підберемо кемпер для вас</p>
            </div>
            <OrderForm />
          </div>
        </div>
      </section>
    </>
  );
}
