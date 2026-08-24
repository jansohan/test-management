import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/stores/useTestStore';
import { APP_LABELS } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { Card, Badge, Button } from '@/components/ui';
import { getStatusVariant } from '@/constants/testStatus';
import { DashboardTable } from './DashboardTable';
import { DashboardTableRow } from './DashboardTableRow';
import { DashboardTableHeader } from './DashboardTableHeader';
import { DashboardTableActions } from './DashboardTableActions';
import { DashboardStats } from './DashboardStats';
import { DashboardFilters } from './DashboardFilters';
import { formatDate } from '@/utils/format';
import { CloseIcon } from '@/components/icons/ActionIcons';

export function Dashboard() {
  const navigate = useNavigate();
  const tests = useTestStore((state) => state.tests);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewingTest, setViewingTest] = useState<typeof tests[number] | null>(null);

  const total = tests.length;
  const passed = tests.filter((test) => test.status === 'passed').length;
  const failed = tests.filter((test) => test.status === 'failed').length;
  const pending = tests.filter((test) => test.status === 'pending' || !test.status).length;
  const drafts = tests.filter((test) => test.status === 'draft').length;

  const stats = [
    { label: APP_LABELS.dashboard.totalTests, value: total, color: 'bg-blue-100 text-blue-800' },
    { label: APP_LABELS.dashboard.passed, value: passed, color: 'bg-green-100 text-green-800' },
    { label: APP_LABELS.dashboard.failed, value: failed, color: 'bg-red-100 text-red-800' },
    { label: APP_LABELS.dashboard.pending, value: pending, color: 'bg-yellow-100 text-yellow-800' },
    { label: APP_LABELS.dashboard.draft, value: drafts, color: 'bg-purple-100 text-purple-800' },
  ];

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(search.toLowerCase()) ||
      (test.subject || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? test.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">{APP_LABELS.dashboard.welcome}</h2>
      <DashboardStats stats={stats} />

      <Card padding="md">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800">{APP_LABELS.dashboard.totalTests}</h3>
            <Button size="md" onClick={() => navigate(ROUTES.testCreation)}>
              {APP_LABELS.dashboard.createTest}
            </Button>
          </div>
          <DashboardFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
          />
          {filteredTests.length === 0 ? (
            <p className="text-sm text-gray-500">{APP_LABELS.tests.empty}</p>
          ) : (
            <div className="overflow-x-auto">
              <DashboardTable header={<DashboardTableHeader />}>
                {filteredTests.map((test, index) => (
                  <DashboardTableRow key={test.id} isLast={index === filteredTests.length - 1}>
                    <div className="py-2 pr-4 font-medium">{test.title || '-'}</div>
                    <div className="py-2 pr-4">{test.subject || '-'}</div>
                    <div className="py-2 pr-4">
                      <Badge variant={getStatusVariant(test.status)}>
                        {test.status || 'pending'}
                      </Badge>
                    </div>
                    <div className="py-2 pr-4">{formatDate(test.createdAt)}</div>
                    <div className="py-2 whitespace-nowrap">
                      <DashboardTableActions
                        testId={test.id}
                        onView={() => setViewingTest(test)}
                        onDelete={() => {
                          if (viewingTest?.id === test.id) {
                            setViewingTest(null);
                          }
                        }}
                      />
                    </div>
                  </DashboardTableRow>
                ))}
              </DashboardTable>
            </div>
          )}
        </div>
      </Card>

      {viewingTest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card padding="lg" className="max-w-md w-full mx-4 relative">
            <button
              type="button"
              onClick={() => setViewingTest(null)}
              className="absolute top-3 right-3 p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title={APP_LABELS.dashboard.close}
            >
              <CloseIcon />
            </button>
            <h3 className="text-lg font-semibold mb-4 pr-8">{APP_LABELS.dashboard.detailsTitle}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">{APP_LABELS.dashboard.name}:</span> {viewingTest.title || '-'}
              </div>
              <div>
                <span className="font-medium">{APP_LABELS.dashboard.subject}:</span> {viewingTest.subject || '-'}
              </div>
              <div>
                <span className="font-medium">{APP_LABELS.dashboard.status}:</span>{' '}
                <Badge variant={getStatusVariant(viewingTest.status)}>
                  {viewingTest.status || 'pending'}
                </Badge>
              </div>
              <div>
                <span className="font-medium">{APP_LABELS.dashboard.createdDate}:</span> {formatDate(viewingTest.createdAt)}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
