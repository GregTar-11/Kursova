import type { Metadata } from 'next';
import OrdersTable from '@/components/features/OrdersTable/OrdersTable';

export const metadata: Metadata = {
  title: 'Замовлення — Ramblers Admin',
};

export default function AdminPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-c-headline mb-1">Замовлення</h1>
        <p className="text-sm text-c-muted">Оновлення в реальному часі</p>
      </div>

      <OrdersTable />
    </>
  );
}
