import { ClockIcon, QuestionsIcon, MarksIcon } from '@/components/icons/ActionIcons';

interface SummaryItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SummaryItem({ icon, children }: SummaryItemProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </div>
  );
}

interface TestSummaryStatsProps {
  duration?: string;
  totalQuestions?: number;
  totalMarks?: number;
}

export function TestSummaryStats({ duration, totalQuestions, totalMarks }: TestSummaryStatsProps) {
  return (
    <div className="flex gap-5 px-2 py-1 border border-gray-200 rounded-md">
      <SummaryItem icon={<ClockIcon />}>
        {duration ? `${duration} min` : '-'}
      </SummaryItem>
      <div className="w-px bg-gray-300" />
      <SummaryItem icon={<QuestionsIcon />}>
        {totalQuestions ?? '-'}
      </SummaryItem>
      <div className="w-px bg-gray-300" />
      <SummaryItem icon={<MarksIcon />}>
        {totalMarks ?? '-'}
      </SummaryItem>
    </div>
  );
}
