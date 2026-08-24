import type { BadgeVariant } from '@/components/ui/Badge';

export const STATUS_OPTIONS = ['passed', 'failed', 'pending', 'draft'] as const;
export type TestStatus = (typeof STATUS_OPTIONS)[number];

export const STATUS_BADGE: Record<TestStatus, BadgeVariant> = {
  passed: 'success',
  failed: 'neutral',
  pending: 'outline',
  draft: 'primary',
};

export const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'passed', label: 'Passed' },
  { value: 'failed', label: 'Failed' },
  { value: 'pending', label: 'Pending' },
  { value: 'draft', label: 'Draft' },
] as const;

export function getStatusVariant(status?: string): BadgeVariant {
  if (status && STATUS_OPTIONS.includes(status as TestStatus)) {
    return STATUS_BADGE[status as TestStatus];
  }
  return 'neutral';
}
