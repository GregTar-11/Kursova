import OrdersTableHeadCell from './OrdersTableHeadCell';

const COLUMNS = ['Дата', 'Клієнт', 'Телефон', 'Кемпер', 'Статус'];

export default function OrdersTableHead() {
  return (
    <thead>
      <tr className="bg-c-bg border-c-border border-b">
        {COLUMNS.map((col) => (
          <OrdersTableHeadCell key={col} label={col} />
        ))}
      </tr>
    </thead>
  );
}
