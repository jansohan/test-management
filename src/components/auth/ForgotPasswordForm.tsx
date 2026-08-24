import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APP_LABELS } from '@/constants/app';
import { FormField, Input, Button } from '@/components/ui';
import { forgotPasswordSchema, ForgotPasswordFormValues } from '@/lib/validation';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-700">{APP_LABELS.login.forgotPasswordSuccess}</p>
        <Button type="button" variant="ghost" onClick={onBack}>
          {APP_LABELS.login.backToLogin}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">{APP_LABELS.login.forgotPasswordTitle}</h2>
      <p className="text-sm text-gray-600">{APP_LABELS.login.forgotPasswordHint}</p>
      <FormField label={APP_LABELS.login.userId} error={errors.userId?.message as string} required>
        <Input
          placeholder={APP_LABELS.login.userId}
          {...register('userId')}
          required
        />
      </FormField>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? APP_LABELS.common.loading : APP_LABELS.login.forgotPasswordSubmit}
      </Button>
      <Button type="button" variant="ghost" onClick={onBack}>
        {APP_LABELS.login.backToLogin}
      </Button>
    </form>
  );
}
