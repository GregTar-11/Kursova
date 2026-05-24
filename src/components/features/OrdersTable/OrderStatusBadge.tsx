import { Order } from '@/types';
import { ORDER_STATUS_LABELS } from '@/constant/regular';
import { cn } from '@/helpers/cn';

const STATUS_BADGE: Record<Order['status'], string> = {
  new: 'bg-c-accent/10 text-c-accent',
  'in-progress': 'bg-c-warning/10 text-c-warning',
  completed: 'bg-c-success/10 text-c-success',
};

interface OrderStatusBadgeProps {
  status: Order['status'];
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className={cn('px-2 py-0.5 rounded-sm text-xs font-medium whitespace-nowrap', STATUS_BADGE[status])}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
