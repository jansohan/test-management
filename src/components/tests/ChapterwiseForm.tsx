import { useTestForm } from './context/TestFormContext';
import { TestFormFields } from './TestFormFields';

interface ChapterwiseFormProps {
  step: 'details' | 'questions';
}

export function ChapterwiseForm({ step }: ChapterwiseFormProps) {
  const { register, control, errors, watch } = useTestForm();

  if (step === 'questions') {
    return null;
  }

  return (
    <TestFormFields
      register={register}
      control={control}
      errors={errors}
      watch={watch}
    />
  );
}