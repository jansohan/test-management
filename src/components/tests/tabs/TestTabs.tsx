import { APP_LABELS } from '@/constants/app';
import { TestTab } from '@/types';

interface TestTabsProps {
  activeTab: TestTab;
  onTabChange: (tab: TestTab) => void;
}

export function TestTabs({ activeTab, onTabChange }: TestTabsProps) {
  const tabs: { key: TestTab; label: string }[] = [
    { key: 'chapterwise', label: APP_LABELS.testCreation.chapterwise },
    { key: 'pyq', label: APP_LABELS.testCreation.pyq },
    { key: 'mockTest', label: APP_LABELS.testCreation.mockTest },
  ];

  return (
    <div className="border border-gray-200 p-1 px-2 rounded-xl">
      <nav className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`px-4 py-3 text-sm rounded-xl font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-primary-light text-primary'
                : 'text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
