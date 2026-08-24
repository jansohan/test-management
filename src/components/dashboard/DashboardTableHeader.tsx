import { APP_LABELS } from '@/constants/app';

export function DashboardTableHeader() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="py-2 pr-4 font-medium text-gray-600">{APP_LABELS.dashboard.name}</div>
      <div className="py-2 pr-4 font-medium text-gray-600">{APP_LABELS.dashboard.subject}</div>
      <div className="py-2 pr-4 font-medium text-gray-600">{APP_LABELS.dashboard.status}</div>
      <div className="py-2 pr-4 font-medium text-gray-600">{APP_LABELS.dashboard.createdDate}</div>
      <div className="py-2 font-medium text-gray-600">{APP_LABELS.dashboard.actions}</div>
    </div>
  );
}
