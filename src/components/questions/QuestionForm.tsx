import { memo } from 'react';
import { Controller } from 'react-hook-form';
import { FormField, Input, Textarea, Select, Button, RichTextEditor } from '@/components/ui';
import { APP_LABELS } from '@/constants/app';
import { useTestForm } from '../tests/context/TestFormContext';
import { TOPIC_OPTIONS, SUBTOPIC_OPTIONS, DIFFICULTY_OPTIONS } from '../tests/commonFields';

interface QuestionFormProps {
  questionIndex: number;
  showAddAnotherQuestion?: boolean;
}

const FIXED_OPTIONS = 4;

function QuestionFormBase({ questionIndex, showAddAnotherQuestion = true }: QuestionFormProps) {
  const { register, control, errors, onAddQuestion } = useTestForm();
  const questionErrors = errors.questions?.[questionIndex];

  const fieldName = {
    description: `questions.${questionIndex}.description` as const,
    explanation: `questions.${questionIndex}.explanation` as const,
    mediaUrl: `questions.${questionIndex}.mediaUrl` as const,
    difficulty: `questions.${questionIndex}.difficulty` as const,
    topic: `questions.${questionIndex}.topic` as const,
    subTopic: `questions.${questionIndex}.subTopic` as const,
    correctAnswer: `questions.${questionIndex}.correctAnswer` as const,
    option: (i: number) => `questions.${questionIndex}.options.${i}.text` as const,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {APP_LABELS.testCreation.question} {questionIndex + 1}
        </h3>
        <span className="text-sm text-gray-500">
          {FIXED_OPTIONS} {APP_LABELS.testCreation.optionsCount}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <RichTextEditor
          name={fieldName.description}
          control={control}
          label={APP_LABELS.testCreation.description}
          error={questionErrors?.description?.message}
          placeholder={APP_LABELS.testCreation.placeholderDescription}
        />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 pb-2">
            {APP_LABELS.testCreation.options}
          </span>
          {Array.from({ length: FIXED_OPTIONS }).map((_, optionIndex) => (
            <div key={optionIndex} className="flex gap-2 items-center">
              <input
                type="radio"
                {...register(fieldName.correctAnswer, { valueAsNumber: true })}
                value={optionIndex}
                className="mt-2 w-4 h-4 text-blue-600"
              />
              <div className="flex flex-col gap-1 flex-1">
                <Input
                  {...register(fieldName.option(optionIndex))}
                  error={!!questionErrors?.options?.[optionIndex]?.text}
                  placeholder={`${APP_LABELS.testCreation.option} ${optionIndex + 1}`}
                  aria-invalid={!!questionErrors?.options?.[optionIndex]?.text}
                />
                {questionErrors?.options?.[optionIndex]?.text && (
                  <span className="text-xs text-red-600">
                    {questionErrors.options[optionIndex]?.text?.message}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <FormField
          label={APP_LABELS.testCreation.explanation}
          error={questionErrors?.explanation?.message}
        >
          <Textarea
            {...register(fieldName.explanation)}
            className="min-h-[120px]"
            placeholder={APP_LABELS.testCreation.placeholderSolution}
            error={!!questionErrors?.explanation}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label={APP_LABELS.testCreation.questionDifficulty}
            error={questionErrors?.difficulty?.message}
          >
            <Controller
              name={fieldName.difficulty}
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  error={!!questionErrors?.difficulty}
                >
                  <option value="">{APP_LABELS.testCreation.selectDifficulty}</option>
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormField>

          <FormField
            label={APP_LABELS.testCreation.topic}
            error={questionErrors?.topic?.message}
          >
            <Controller
              name={fieldName.topic}
              control={control}
              render={({ field }) => (
                 <Select
                   value={field.value}
                   onChange={field.onChange}
                   error={!!questionErrors?.topic}
                   placeholder={APP_LABELS.testCreation.chooseFromDropdown}
                 >
                   {TOPIC_OPTIONS.map((option) => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </Select>
              )}
            />
          </FormField>

          <FormField
            label={APP_LABELS.testCreation.subTopic}
            error={questionErrors?.subTopic?.message}
          >
            <Controller
              name={fieldName.subTopic}
              control={control}
              render={({ field }) => (
                 <Select
                   value={field.value}
                   onChange={field.onChange}
                   error={!!questionErrors?.subTopic}
                   placeholder={APP_LABELS.testCreation.chooseFromDropdown}
                 >
                   {SUBTOPIC_OPTIONS.map((option) => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </Select>
              )}
            />
          </FormField>
        </div>

        <FormField
          label={APP_LABELS.testCreation.mediaUrl}
          error={questionErrors?.mediaUrl?.message}
        >
          <Input
            {...register(fieldName.mediaUrl)}
            placeholder={APP_LABELS.testCreation.placeholderMediaUrl}
            error={!!questionErrors?.mediaUrl}
          />
        </FormField>

        {showAddAnotherQuestion && (
          <Button type="button" onClick={onAddQuestion}>
            {APP_LABELS.testCreation.addAnotherQuestion}
          </Button>
        )}
      </div>
    </div>
  );
}

export const QuestionForm = memo(QuestionFormBase);
