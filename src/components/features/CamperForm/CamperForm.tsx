"use client";

import { Camper } from "@/types";
import { CamperService } from "@/services/camper.service";
import { notifier } from "@/lib/notifier";
import { camperSchema, ICamperData } from "@/schemas";
import { useFormCustom } from "@/hooks/useFormCustom";
import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { InputFile } from "@/components/ui/InputFile";
import { buildDefaults } from "./buildDefaults";
import CamperStatusSelect from "./CamperStatusSelect";
import CamperFeaturesFields from "./CamperFeaturesFields";
import CamperFormActions from "./CamperFormActions";

interface CamperFormProps {
  camper?: Camper;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function CamperForm({ camper, onSuccess, onCancel }: CamperFormProps) {
  const isEdit = Boolean(camper);

  const { handleSubmit, methods, isSubmitting, isDirty } = useFormCustom<ICamperData>(
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
    <Form methods={methods} onSubmit={handleSubmit} variant="full" className="gap-4">
      <Input name="name" label="Назва кемпера" placeholder="Mercedes Sprinter 4x4" />
      <InputFile
        variant="dropzone"
        onUploadSuccess={(url) => methods.setValue("imageUrl", url?.[0], { shouldDirty: true })}
      />
      <Input name="price" label="Ціна (₴/доба)" type="number" placeholder="2000" />
      <Textarea
        label="Опис"
        placeholder="Опишіть кемпер..."
        error={methods.formState.errors.description?.message}
        {...methods.register("description")}
      />
      <CamperFeaturesFields />
      <CamperStatusSelect />
      <CamperFormActions
        isEdit={isEdit}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
        onCancel={onCancel}
      />
    </Form>
  );
}
