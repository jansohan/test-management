import { useTestForm } from '../tests/context/TestFormContext';
import { APP_LABELS } from '@/constants/app';
import { EditIcon, DeleteIcon } from '@/components/icons/ActionIcons';
import { IconButton } from '@/components/icons/ActionIcons';

export function QuestionList() {
  const { values, activeQuestion, onQuestionChange, onDeleteQuestion } = useTestForm();
  const questions = values.questions || [];

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">
          {APP_LABELS.testCreation.questionsNav} ({questions.length})
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {questions.map((question, index) => (
          <div
            key={question.id || index}
            className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 ${
              activeQuestion === index ? 'bg-primary-light/30' : ''
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {APP_LABELS.testCreation.question} {index + 1}
                </span>
                {activeQuestion === index && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    {APP_LABELS.common.active}
                  </span>
                )}
              </div>
              {/* <p className="text-sm text-gray-500 truncate mt-0.5">
                {questionPreview(question)}
              </p> */}
            </div>
            <div className="flex items-center gap-1 ml-4">
              <IconButton
                onClick={() => onQuestionChange(index)}
                title={APP_LABELS.common.edit}
                hoverTextColor="hover:text-blue-600"
                hoverBgColor="hover:bg-blue-50"
              >
                <EditIcon className="w-4 h-4" />
              </IconButton>
              <IconButton
                onClick={() => onDeleteQuestion(index)}
                title={APP_LABELS.common.delete}
                hoverTextColor="hover:text-red-600"
                hoverBgColor="hover:bg-red-50"
              >
                <DeleteIcon className="w-4 h-4" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
