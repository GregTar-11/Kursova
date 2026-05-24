import { Order } from '@/types';
import { formatDate } from '@/helpers/formatDate';
import OrderStatusBadge from './OrderStatusBadge';
import OrderStatusSelect from './OrderStatusSelect';

interface OrdersTableRowProps {
  order: Order;
  camperNames: Record<string, string>;
}

export default function OrdersTableRow({ order, camperNames }: OrdersTableRowProps) {
  return (
    <tr className="hover:bg-c-bg transition-colors">
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
          <OrderStatusBadge status={order.status} />
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>
      </td>
    </tr>
  );
}
