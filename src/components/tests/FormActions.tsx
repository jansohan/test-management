import { APP_LABELS } from '@/constants/app';
import { Button } from '@/components/ui';
import { useTestForm } from './context/TestFormContext';

export function FormActions() {
  const { isQuestionsStep, onCancel, onNext, onSaveDraft, handleSubmit, isEditing } = useTestForm();

  return (
    <div className="flex gap-2 justify-between">
      <Button type="button" variant="danger" onClick={onCancel}>
        {isEditing ? APP_LABELS.common.back : APP_LABELS.common.cancel}
      </Button>
      <div className="flex gap-2">
        {isQuestionsStep ? (
          <>
            <Button type="button" variant="ghost" onClick={handleSubmit(onSaveDraft)}>
              {isEditing ? APP_LABELS.common.update : APP_LABELS.common.saveAsDraft}
            </Button>
            <Button type="submit">{isEditing ? APP_LABELS.common.update : APP_LABELS.common.submit}</Button>
          </>
        ) : (
          <Button type="button" onClick={onNext}>
            {APP_LABELS.testCreation.next}
          </Button>
        )}
      </div>
    </div>
  );
}
