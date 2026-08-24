import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import type { UseFormRegister, Control, FieldErrors } from 'react-hook-form';
import type { TestFormValues } from '@/lib/validation';
import { APP_LABELS } from '@/constants/app';
import { FormField, Input, Select, MultiSelect, RadioGroup } from '@/components/ui';
import { SUBJECT_OPTIONS, DIFFICULTY_OPTIONS } from './commonFields';
import { getTopicsBySubjectId } from '@/services/topic.service';
import { getSubTopicsByMultipleTopicIds } from '@/services/sub-topic.service';

interface TestFormFieldsProps {
  register: UseFormRegister<TestFormValues>;
  control: Control<TestFormValues>;
  errors: FieldErrors<TestFormValues>;
  watch: <TFieldName extends keyof TestFormValues | string>(name: TFieldName) => unknown;
}

export function TestFormFields({ register, control, errors, watch }: TestFormFieldsProps) {
  const totalQuestions = watch('markingScheme.totalQuestions') as number | undefined;
  const subject = watch('subject') as string | undefined;
  const topics = (watch('topic') as string[]) || [];

  const [topicOptions, setTopicOptions] = useState<{ value: string; label: string }[]>([]);
  const [subTopicOptions, setSubTopicOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!subject) {
      setTopicOptions([]);
      return;
    }

    let cancelled = false;
    getTopicsBySubjectId(subject)
      .then((data) => {
        if (!cancelled) {
          setTopicOptions(data.map((topic) => ({ value: topic.id, label: topic.name })));
        }
      })
      .catch(() => {
        if (!cancelled) setTopicOptions([]);
      });

    return () => { cancelled = true; };
  }, [subject]);

  useEffect(() => {
    if (topics.length === 0) {
      setSubTopicOptions([]);
      return;
    }

    let cancelled = false;
    getSubTopicsByMultipleTopicIds(topics)
      .then((data) => {
        if (!cancelled) {
          setSubTopicOptions(data.map((sub) => ({ value: sub.id, label: sub.name })));
        }
      })
      .catch(() => {
        if (!cancelled) setSubTopicOptions([]);
      });

    return () => { cancelled = true; };
  }, [topics]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <FormField label={APP_LABELS.testCreation.subject} error={errors.subject?.message as string} required>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              required
              placeholder={APP_LABELS.testCreation.chooseFromDropdown}
            >
              {SUBJECT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        />
      </FormField>
      <FormField label={APP_LABELS.testCreation.testName} error={errors.title?.message as string} required>
        <Input
          placeholder={APP_LABELS.testCreation.placeholderTestName}
          {...register('title')}
          required
        />
      </FormField>
      <FormField label={APP_LABELS.testCreation.topic} error={errors.topic?.message as string}>
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={topicOptions}
              value={field.value || []}
              onChange={field.onChange}
              placeholder={APP_LABELS.testCreation.chooseFromDropdown}
            />
          )}
        />
      </FormField>
      <FormField label={APP_LABELS.testCreation.subTopic} error={errors.subTopic?.message as string}>
        <Controller
          name="subTopic"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
            >
              <option value="">{APP_LABELS.testCreation.chooseFromDropdown}</option>
              {subTopicOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        />
      </FormField>
      <FormField label={APP_LABELS.testCreation.duration} error={errors.duration?.message as string} required>
        <Input
          type="number"
          min={1}
          placeholder={APP_LABELS.testCreation.placeholderDuration}
          {...register('duration')}
          required
        />
      </FormField>
      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <RadioGroup
            label={APP_LABELS.testCreation.difficulty}
            name="difficulty"
            value={field.value}
            onChange={field.onChange}
            error={!!errors.difficulty}
            required
            options={DIFFICULTY_OPTIONS}
          />
        )}
      />
      <div className="col-span-full">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{APP_LABELS.testCreation.markingScheme}</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <FormField label={APP_LABELS.testCreation.wrongAnswer} error={errors.markingScheme?.wrongAnswer?.message as string} required>
            <Input
              type="number"
              {...register('markingScheme.wrongAnswer', { valueAsNumber: true })}
              required
            />
          </FormField>
          <FormField label={APP_LABELS.testCreation.unattempted} error={errors.markingScheme?.unattempted?.message as string} required>
            <Input
              type="number"
              min={0}
              {...register('markingScheme.unattempted', { valueAsNumber: true })}
              required
            />
          </FormField>
          <FormField label={APP_LABELS.testCreation.correctAnswer} error={errors.markingScheme?.correctAnswer?.message as string} required>
            <Input
              type="number"
              min={0}
              {...register('markingScheme.correctAnswer', { valueAsNumber: true })}
              required
            />
          </FormField>
          <FormField label={APP_LABELS.testCreation.totalQuestions} error={errors.markingScheme?.totalQuestions?.message as string} required>
            <Input
              type="number"
              min={1}
              placeholder={APP_LABELS.testCreation.placeholderTotalQuestions}
              {...register('markingScheme.totalQuestions', { valueAsNumber: true })}
              required
            />
          </FormField>
          <FormField label={APP_LABELS.testCreation.totalMarks} error={errors.markingScheme?.totalMarks?.message as string} required>
            <Input
              type="number"
              min={1}
              {...register('markingScheme.totalMarks', { valueAsNumber: true })}
              required
              disabled={typeof totalQuestions !== 'number' || totalQuestions === 0}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
