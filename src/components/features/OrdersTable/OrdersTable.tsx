'use client';

import { useOrders } from '@/hooks/useOrders';
import OrdersTableLoading from './OrdersTableLoading';
import OrdersTableEmpty from './OrdersTableEmpty';
import OrdersTableHead from './OrdersTableHead';
import OrdersTableRow from './OrdersTableRow';

export default function OrdersTable() {
  const { orders, camperNames, loading } = useOrders();

  if (loading) return <OrdersTableLoading />;
  if (orders.length === 0) return <OrdersTableEmpty />;

  return (
    <div className="border-c-border overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <OrdersTableHead />
        <tbody className="bg-c-white divide-c-border divide-y">
          {orders.map((order) => (
            <OrdersTableRow key={order.id} order={order} camperNames={camperNames} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
