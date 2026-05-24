interface OrdersTableHeadCellProps {
  label: string;
}

export default function OrdersTableHeadCell({ label }: OrdersTableHeadCellProps) {
  return (
    <th className="text-c-muted px-4 py-3 text-left font-semibold whitespace-nowrap">{label}</th>
  );
}
