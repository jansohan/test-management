import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormField, Input, Button } from '@/components/ui';
import { APP_LABELS } from '@/constants/app';

interface LoginFieldsProps {
  register: UseFormRegister<{ userId: string; password: string }>;
  errors: FieldErrors<{ userId: string; password: string }>;
  isSubmitting: boolean;
}

export function LoginFields({ register, errors, isSubmitting }: LoginFieldsProps) {
  return (
    <>
      {(errors.root) && (
        <p className="text-red-600 text-sm">{errors.root?.message}</p>
      )}
      <FormField label={APP_LABELS.login.userId} error={errors.userId?.message as string} required>
        <Input
          placeholder={APP_LABELS.login.userId}
          {...register('userId')}
          required
        />
      </FormField>
      <FormField label={APP_LABELS.login.password} error={errors.password?.message as string} required>
        <Input
          type="password"
          placeholder={APP_LABELS.login.password}
          {...register('password')}
          required
        />
      </FormField>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? APP_LABELS.common.loading : APP_LABELS.login.submit}
      </Button>
    </>
  );
}
