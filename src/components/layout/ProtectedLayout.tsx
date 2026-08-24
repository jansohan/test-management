import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { ROUTES } from '@/constants/routes';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { getAccessToken, isTokenExpired } from '@/utils/auth';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const refreshTokens = useAuthStore((state) => state.refreshTokens);

  const token = getAccessToken();
  const hasValidToken = token && !isTokenExpired(token);

  if (!isAuthenticated || !hasValidToken) {
    if (hasValidToken === false && isAuthenticated) {
      refreshTokens();
      return null;
    }
    return <Navigate to={ROUTES.login} replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
