import { memo } from 'react';
import { Logo } from './Logo';
import { SidebarNav } from './SidebarNav';
import { useQuestionNavStore } from '@/stores/useQuestionNavStore';

export const AppSidebar = memo(function AppSidebar() {
  const isQuestionsStep = useQuestionNavStore((state) => state.isQuestionsStep);

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col transition-all duration-200">
      <div className="flex items-center gap-3 px-4 py-6">
        <Logo />
      </div>
      <SidebarNav iconOnly={isQuestionsStep} />
    </aside>
  );
});
