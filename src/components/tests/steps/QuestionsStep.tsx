import { useTestForm } from '../context/TestFormContext';
import { Button } from '@/components/ui';
import { APP_LABELS } from '@/constants/app';
import { QuestionForm } from '../../questions/QuestionForm';
import { QuestionList } from '../../questions/QuestionList';
import { ChapterwiseSummary } from './ChapterwiseSummary';

export function QuestionsStep() {
  const { activeQuestion, onNext, onAddQuestion, handleSubmit, onSaveDraft, isEditing } = useTestForm();

  const handleSaveAndContinue = async () => {
    await handleSubmit(onSaveDraft)();
    onNext();
  };

  return (
    <div className="flex flex-col gap-6">
      <ChapterwiseSummary />

      <QuestionList />

      <div className="border-t border-gray-200 pt-6">
        <div className="mt-4">
          <QuestionForm
            questionIndex={activeQuestion}
            showAddAnotherQuestion={false}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-b border-gray-200 pb-4">
        <Button type="button" variant="ghost" onClick={onAddQuestion}>
          {APP_LABELS.testCreation.addAnotherQuestion}
        </Button>
        <Button type="button" onClick={handleSaveAndContinue}>
          {isEditing ? APP_LABELS.common.update : APP_LABELS.common.saveAndContinue}
        </Button>
      </div>
    </div>
  );
}
