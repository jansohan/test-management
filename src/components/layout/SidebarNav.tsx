import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarLink } from './SidebarLink';
import { QuestionNav } from '@/components/questions/QuestionNav';
import { useQuestionNavStore } from '@/stores/useQuestionNavStore';
import { APP_LABELS } from '@/constants/app';
import { ROUTES } from '@/constants/routes';

const NAV_ITEMS = [
  { to: ROUTES.dashboard, label: APP_LABELS.nav.dashboard, icon: APP_LABELS.images.dashboardIcon },
  { to: ROUTES.testCreation, label: APP_LABELS.nav.testCreation, icon: APP_LABELS.images.testCreationIcon },
  { to: ROUTES.testTracking, label: APP_LABELS.nav.testTracking, icon: APP_LABELS.images.testTrackingIcon },
];

function getPageKey(path: string) {
  return path.replace('/', '');
}

interface SidebarNavProps {
  iconOnly?: boolean;
}

export const SidebarNav = memo(function SidebarNav({ iconOnly = false }: SidebarNavProps) {
  const location = useLocation();
  const activePage = useMemo(() => getPageKey(location.pathname), [location.pathname]);
  const totalQuestions = useQuestionNavStore((state) => state.totalQuestions);
  const activeQuestion = useQuestionNavStore((state) => state.activeQuestion);
  const setActiveQuestion = useQuestionNavStore((state) => state.setActiveQuestion);
  const isQuestionsStep = useQuestionNavStore((state) => state.isQuestionsStep);

  return (
    <div className="flex">
      <nav className={`flex flex-col ${iconOnly ? 'gap-1 mb-2 w-16' : 'p-2 gap-1'}`} aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            isActive={activePage === getPageKey(item.to)}
            label={item.label}
            icon={item.icon}
            iconOnly={iconOnly}
          />
        ))}
      </nav>
      {isQuestionsStep && (
        <QuestionNav
          totalQuestions={totalQuestions}
          activeQuestion={activeQuestion}
          onQuestionChange={setActiveQuestion}
        />
      )}
    </div>
  );
});
