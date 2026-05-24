export default function OrdersTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20">
      <p className="text-c-headline font-semibold">Замовлень поки немає</p>
      <p className="text-c-muted text-sm">Нові замовлення з'являться тут в реальному часі</p>
    </div>
  );
}
