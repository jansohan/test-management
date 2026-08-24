import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function TestTracking() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.dashboard, { replace: true });
  }, [navigate]);

  return null;
}
