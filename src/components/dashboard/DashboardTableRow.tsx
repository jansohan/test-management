import type { ReactNode } from 'react';

interface DashboardTableRowProps {
  children: ReactNode;
  isLast?: boolean;
}

export function DashboardTableRow({ children, isLast }: DashboardTableRowProps) {
  return (
    <div className={`grid grid-cols-5 gap-4 ${isLast ? '' : 'border-b border-gray-100'}`}>
      {children}
    </div>
  );
}
