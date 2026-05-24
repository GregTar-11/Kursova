import { Button } from '@/components/ui/Button';

interface CamperFormActionsProps {
  isEdit: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  onCancel?: () => void;
}

export default function CamperFormActions({
  isEdit,
  isSubmitting,
  isDirty,
  onCancel,
}: CamperFormActionsProps) {
  return (
    <div className="flex gap-3 pt-2">
      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={!isDirty || isSubmitting}
        className="flex-1"
      >
        {isSubmitting ? 'Збереження...' : isEdit ? 'Зберегти зміни' : 'Додати кемпер'}
      </Button>
      {onCancel && (
        <Button type="button" variant="ghost" size="medium" onClick={onCancel}>
          Скасувати
        </Button>
      )}
    </div>
  );
}
