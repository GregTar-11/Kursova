import { Order } from '@/types';
import { ORDER_STATUS_LABELS } from '@/constant/regular';
import { OrderService } from '@/services/order.service';
import { notifier } from '@/lib/notifier';

const STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS);

const isOrderStatus = (value: string): value is Order['status'] =>
  value === 'new' || value === 'in-progress' || value === 'completed';

const handleStatusChange = async (id: string, status: Order['status']) => {
  await OrderService.updateStatus(id, status)
    .then(() => notifier.success('Статус оновлено'))
    .catch(() => notifier.error('Помилка оновлення статусу'));
};

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: Order['status'];
}

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  return (
    <select
      defaultValue={currentStatus}
      onChange={(e) => {
        if (isOrderStatus(e.target.value)) handleStatusChange(orderId, e.target.value);
      }}
      className="border-c-border text-c-headline focus:border-c-accent bg-c-white cursor-pointer rounded border px-2 py-1 text-xs transition-colors outline-none"
    >
      {STATUS_OPTIONS.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
