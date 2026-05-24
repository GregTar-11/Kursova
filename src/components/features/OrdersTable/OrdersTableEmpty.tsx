export default function OrdersTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-2">
      <p className="text-c-headline font-semibold">Замовлень поки немає</p>
      <p className="text-sm text-c-muted">Нові замовлення з'являться тут в реальному часі</p>
    </div>
  );
}
