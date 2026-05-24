import { Input } from '@/components/ui/Input';

export default function CamperFeaturesFields() {
  return (
    <div className="border-c-border border-t pt-4">
      <p className="text-c-muted mb-3 text-[13px] font-semibold tracking-wide uppercase">
        Характеристики
      </p>
      <div className="flex flex-col gap-4">
        <Input name="features.engine" label="Тип двигуна" placeholder="2.2L дизель" />
        <Input name="features.beds" label="Спальних місць" type="number" placeholder="4" />
        <Input name="features.tankVolume" label="Об'єм баку (л)" type="number" placeholder="80" />
      </div>
    </div>
  );
}
