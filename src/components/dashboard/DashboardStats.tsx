import { Card } from '@/components/ui';
import type { ReactNode } from 'react';

interface StatItem {
  label: ReactNode;
  value: number;
  color: string;
}

interface DashboardStatsProps {
  stats: StatItem[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label?.toString()} padding="md" className={`text-center ${stat.color}`}>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
}
