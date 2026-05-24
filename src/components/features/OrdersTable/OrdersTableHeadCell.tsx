interface OrdersTableHeadCellProps {
  label: string;
}

export default function OrdersTableHeadCell({ label }: OrdersTableHeadCellProps) {
  return (
    <th className="text-left px-4 py-3 font-semibold text-c-muted whitespace-nowrap">
      {label}
    </th>
  );
}
