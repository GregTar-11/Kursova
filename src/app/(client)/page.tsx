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
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-c-white mb-6 leading-tight">
            Мандруй у своєму темпі
          </h1>
          <p className="text-lg text-c-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Орендуй будинок на колесах і відкрий Україну без обмежень.
            Зручно, комфортно, незабутньо.
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
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-c-headline mb-2">
            Топ пропозиції
          </h2>
          <p className="text-c-muted mb-8">Найпопулярніші кемпери, доступні прямо зараз</p>

          {topCampers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      <section className="py-12 md:py-20 bg-c-white border-t border-c-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-c-headline mb-3">
                Швидке замовлення
              </h2>
              <p className="text-c-muted">
                Залиште заявку і ми підберемо кемпер для вас
              </p>
            </div>
            <OrderForm />
          </div>
        </div>
      </section>
    </>
  );
}
