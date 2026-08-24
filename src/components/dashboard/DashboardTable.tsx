import type { ReactNode } from 'react';

interface DashboardTableProps {
  header: ReactNode;
  children: ReactNode;
}

export function DashboardTable({ header, children }: DashboardTableProps) {
  return (
    <div className="w-full text-left text-sm">
      <div className="border-b border-gray-200">{header}</div>
      <div>{children}</div>
    </div>
  );
}
