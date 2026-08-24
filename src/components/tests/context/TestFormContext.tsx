import { createContext, useContext } from 'react';
import type { UseFormRegister, Control, FieldErrors, SubmitHandler } from 'react-hook-form';
import type { TestFormValues } from '@/lib/validation';

export interface TestFormContextValue {
  register: UseFormRegister<TestFormValues>;
  control: Control<TestFormValues>;
  errors: FieldErrors<TestFormValues>;
  values: TestFormValues;
  totalQuestions: number;
  activeQuestion: number;
  onQuestionChange: (index: number) => void;
  onEdit: () => void;
  isQuestionsStep: boolean;
  onPrevious: () => void;
  onCancel: () => void;
  onNext: () => void;
  onAddQuestion: () => void;
  onDeleteQuestion: (index: number) => void;
  onSaveDraft: SubmitHandler<TestFormValues>;
  handleSubmit: (callback: SubmitHandler<TestFormValues>) => (e?: React.BaseSyntheticEvent) => Promise<unknown>;
  setFocus: (name: keyof TestFormValues) => void;
  watch: <TFieldName extends keyof TestFormValues | string>(name: TFieldName) => unknown;
  isEditing: boolean;
}

export const TestFormContext = createContext<TestFormContextValue | null>(null);

export function useTestForm() {
  const context = useContext(TestFormContext);
  if (!context) {
    throw new Error('useTestForm must be used within TestFormProvider');
  }
  return context;
}
