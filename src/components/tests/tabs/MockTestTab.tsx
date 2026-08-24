import { memo } from 'react';
import { APP_LABELS } from '@/constants/app';

export const MockTestTab = memo(function MockTestTab() {
  return (
    <div className="text-sm text-gray-500">
      {APP_LABELS.testCreation.mockTestComingSoon}
    </div>
  );
});
