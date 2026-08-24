import { Logo } from '@/components/layout/Logo';
import { APP_LABELS } from '@/constants/app';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-[var(--color-login-bg)] flex-col justify-center items-center p-10">
        <img src={APP_LABELS.images.testTubeManImage} alt={APP_LABELS.appTitle} className={`w-120 h-auto object-contain}`} />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="md:hidden flex flex-col items-center mb-4">
          <Logo />
          <h1 className="text-xl font-bold text-gray-900 mt-2">{APP_LABELS.appTitle}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
