import { APP_LABELS } from '@/constants/app';
import { STATUS_FILTER_OPTIONS } from '@/constants/testStatus';
import { Input, Select } from '@/components/ui';

interface DashboardFiltersProps {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function DashboardFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder={APP_LABELS.dashboard.searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-xs"
      />
      <Select
        value={statusFilter}
        onChange={(value) => onStatusChange(value)}
        required
        className="w-40"
      >
        {STATUS_FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
