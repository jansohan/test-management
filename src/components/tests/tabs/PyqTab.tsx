import { memo } from 'react';
import { APP_LABELS } from '@/constants/app';

export const PyqTab = memo(function PyqTab() {
  return (
    <div className="text-sm text-gray-500">
      {APP_LABELS.testCreation.pyqComingSoon}
    </div>
  );
});
