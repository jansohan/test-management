import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useTestStore } from '@/stores/useTestStore';
import { APP_LABELS } from '@/constants/app';
import { EyeIcon, EditIcon, DeleteIcon, IconButton } from '@/components/icons/ActionIcons';

interface DashboardTableActionsProps {
  testId: string;
  onView: () => void;
  onDelete?: () => void;
}

export function DashboardTableActions({ testId, onView, onDelete }: DashboardTableActionsProps) {
  const navigate = useNavigate();
  const deleteTest = useTestStore((state) => state.deleteTest);

  const handleDelete = () => {
    deleteTest(testId);
    onDelete?.();
  };

  return (
    <div className="flex gap-1">
      <IconButton onClick={onView} title={APP_LABELS.tests.view} hoverTextColor="hover:text-blue-600" hoverBgColor="hover:bg-blue-50">
        <EyeIcon />
      </IconButton>
      <IconButton onClick={() => navigate(ROUTES.testCreation, { state: { editingId: testId } })} title={APP_LABELS.common.edit} hoverTextColor="hover:text-primary" hoverBgColor="hover:bg-primary-light">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} title={APP_LABELS.common.delete} hoverTextColor="hover:text-red-600" hoverBgColor="hover:bg-red-50">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
