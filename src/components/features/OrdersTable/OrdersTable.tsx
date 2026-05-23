'use client';

import { Order } from '@/types';
import { ORDER_STATUS, ORDER_STATUS_LABELS } from '@/constant/regular';
import { OrderService } from '@/services/order.service';
import { notifier } from '@/lib/notifier';
import { formatDate } from '@/helpers/formatDate';
import { useOrders } from '@/hooks/useOrders';
import { cn } from '@/helpers/cn';

const STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS) as [Order['status'], string][];

const STATUS_BADGE: Record<Order['status'], string> = {
  new: 'bg-c-accent/10 text-c-accent',
  'in-progress': 'bg-c-warning/10 text-c-warning',
  completed: 'bg-c-success/10 text-c-success',
};

const handleStatusChange = async (id: string, status: Order['status']) => {
  await OrderService.updateStatus(id, status)
    .then(() => notifier.success('Статус оновлено'))
    .catch(() => notifier.error('Помилка оновлення статусу'));
};

export default function OrdersTable() {
  const { orders, camperNames, loading } = useOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-c-muted text-sm">Завантаження замовлень...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2">
        <p className="text-c-headline font-semibold">Замовлень поки немає</p>
        <p className="text-sm text-c-muted">Нові замовлення з'являться тут в реальному часі</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-c-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-c-bg border-b border-c-border">
            <th className="text-left px-4 py-3 font-semibold text-c-muted whitespace-nowrap">Дата</th>
            <th className="text-left px-4 py-3 font-semibold text-c-muted whitespace-nowrap">Клієнт</th>
            <th className="text-left px-4 py-3 font-semibold text-c-muted whitespace-nowrap">Телефон</th>
            <th className="text-left px-4 py-3 font-semibold text-c-muted whitespace-nowrap">Кемпер</th>
            <th className="text-left px-4 py-3 font-semibold text-c-muted whitespace-nowrap">Статус</th>
          </tr>
        </thead>
        <tbody className="bg-c-white divide-y divide-c-border">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-c-bg transition-colors">
              <td className="px-4 py-3 text-c-muted whitespace-nowrap">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-4 py-3 text-c-headline font-medium whitespace-nowrap">
                {order.clientName}
              </td>
              <td className="px-4 py-3 text-c-muted whitespace-nowrap">
                {order.clientPhone}
              </td>
              <td className="px-4 py-3 text-c-headline whitespace-nowrap">
                {camperNames[order.camperId] || (
                  <span className="text-c-base italic">Загальна заявка</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={cn('px-2 py-0.5 rounded-sm text-xs font-medium whitespace-nowrap', STATUS_BADGE[order.status])}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                  <select
                    defaultValue={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="text-xs border border-c-border rounded px-2 py-1 text-c-headline outline-none focus:border-c-accent transition-colors cursor-pointer bg-c-white"
                  >
                    {STATUS_OPTIONS.map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
