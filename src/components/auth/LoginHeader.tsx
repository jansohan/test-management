import { APP_LABELS } from '@/constants/app';
import { Logo } from '@/components/layout/Logo';

interface LoginHeaderProps {
  title?: string;
  helper?: string;
}

export function LoginHeader({ title, helper }: LoginHeaderProps) {
  return (
    <>
      <Logo />
      <h1 className="text-2xl font-bold">{title || APP_LABELS.login.title}</h1>
      <p className="text-xs py-2">{helper || APP_LABELS.login.helper}</p>
    </>
  );
}
