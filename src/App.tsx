import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { ROUTES } from '@/constants/routes';
import { APP_LABELS } from '@/constants/app';

const DashboardLazy = lazy(() => import('@/components/dashboard').then(m => ({ default: m.Dashboard })));
const TestCreationLazy = lazy(() => import('@/components/tests').then(m => ({ default: m.TestCreationForm })));
const TestTrackingLazy = lazy(() => import('@/components/tests').then(m => ({ default: m.TestTracking })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-sm text-gray-500">{APP_LABELS.common.loading}</div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginForm />} />
      <Route
        path="/*"
        element={
          <ProtectedLayout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={ROUTES.dashboard} element={<DashboardLazy />} />
                <Route path={ROUTES.testCreation} element={<TestCreationLazy />} />
                <Route path={ROUTES.testTracking} element={<TestTrackingLazy />} />
                <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
              </Routes>
            </Suspense>
          </ProtectedLayout>
        }
      />
    </Routes>
  );
}
