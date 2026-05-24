"use client";

import { useFormContext } from "react-hook-form";
import { Camper } from "@/types";
import { CAMPER_STATUS_LABELS } from "@/constant/regular";
import { CamperService } from "@/services/camper.service";
import { notifier } from "@/lib/notifier";
import { camperSchema, ICamperData } from "@/schemas";
import { useFormCustom } from "@/hooks/useFormCustom";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { cn } from "@/helpers/cn";
import { InputFile } from "@/components/ui/InputFile";

interface CamperFormProps {
  camper?: Camper;
  onSuccess: () => void;
  onCancel?: () => void;
}

const STATUS_OPTIONS = Object.entries(CAMPER_STATUS_LABELS) as [
  string,
  string,
][];

function StatusSelect() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ICamperData>();
  const error = errors.status?.message;

  return (
    <div className="flex flex-col gap-2 text-[13px]">
      <label
        className={cn(
          "font-medium",
          error ? "text-c-error" : "text-c-headline",
        )}
      >
        Статус
      </label>
      <select
        {...register("status")}
        className={cn(
          "h-9 w-full rounded border px-3 text-[13px] outline-none transition-all bg-c-white",
          error
            ? "border-c-error text-c-error focus:ring-1 focus:ring-c-error"
            : "border-c-border text-c-headline focus:border-c-accent",
        )}
      >
        {STATUS_OPTIONS.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="text-c-error text-[12px]">{error}</span>}
    </div>
  );
}

const buildDefaults = (camper?: Camper): ICamperData => ({
  name: camper?.name ?? "",
  price: camper?.price ?? 0,
  description: camper?.description ?? "",
  imageUrl: camper?.imageUrl ?? "",
  status: camper?.status ?? "available",
  features: {
    engine: camper?.features.engine ?? "",
    beds: camper?.features.beds ?? 1,
    tankVolume: camper?.features.tankVolume ?? 50,
  },
});

export default function CamperForm({
  camper,
  onSuccess,
  onCancel,
}: CamperFormProps) {
  const isEdit = Boolean(camper);

  const { handleSubmit, methods, isSubmitting, isDirty } =
    useFormCustom<ICamperData>(
      async (data) => {
        if (isEdit && camper) {
          await CamperService.update(camper.id, data);
          notifier.success("Кемпер оновлено");
        } else {
          await CamperService.create(data);
          notifier.success("Кемпер додано");
        }
        onSuccess();
      },
      camperSchema,
      buildDefaults(camper),
    );

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      variant="full"
      className="gap-4"
    >
      <Input
        name="name"
        label="Назва кемпера"
        placeholder="Mercedes Sprinter 4x4"
      />
      <InputFile
        variant="field"
        onUploadSuccess={(url) =>
          methods.setValue("imageUrl", url?.[0], { shouldDirty: true })
        }
      />
      <Input
        name="price"
        label="Ціна (₴/доба)"
        type="number"
        placeholder="2000"
      />
      <Textarea
        label="Опис"
        placeholder="Опишіть кемпер..."
        error={methods.formState.errors.description?.message}
        {...methods.register("description")}
      />
      <div className="border-t border-c-border pt-4">
        <p className="text-[13px] font-semibold text-c-muted uppercase tracking-wide mb-3">
          Характеристики
        </p>
        <div className="flex flex-col gap-4">
          <Input
            name="features.engine"
            label="Тип двигуна"
            placeholder="2.2L дизель"
          />
          <Input
            name="features.beds"
            label="Спальних місць"
            type="number"
            placeholder="4"
          />
          <Input
            name="features.tankVolume"
            label="Об'єм баку (л)"
            type="number"
            placeholder="80"
          />
        </div>
      </div>
      <StatusSelect />
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="medium"
          disabled={!isDirty || isSubmitting}
          className="flex-1"
        >
          {isSubmitting
            ? "Збереження..."
            : isEdit
              ? "Зберегти зміни"
              : "Додати кемпер"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="medium"
            onClick={onCancel}
          >
            Скасувати
          </Button>
        )}
      </div>
    </Form>
  );
}
