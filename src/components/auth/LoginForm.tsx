import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/useAuthStore';
import { ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';
import { LoginLayout } from './LoginLayout';
import { LoginHeader } from './LoginHeader';
import { LoginFields } from './LoginFields';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { loginSchema, LoginFormValues } from '@/lib/validation';

type AuthMode = 'login' | 'forgot-password';

export function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const success = await login(data.userId, data.password);
      if (success) {
        navigate(ROUTES.dashboard);
      } else {
        setError('root', { type: 'manual', message: MESSAGES.error.auth.bothRequired });
      }
    } catch {
      setError('root', { type: 'manual', message: 'Login failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginLayout>
      {mode === 'login' ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-sm w-full">
          <LoginHeader />
          <LoginFields
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
          <a
            type="button"
            onClick={() => setMode('forgot-password')}
            className="self-start text-sm text-primary hover:underline"
          >
            Forgot Password?
          </a>
        </form>
      ) : (
        <ForgotPasswordForm onBack={() => setMode('login')} />
      )}
    </LoginLayout>
  );
}
