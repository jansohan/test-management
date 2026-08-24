import { APP_LABELS } from '@/constants/app';
import { Badge, KeyValue } from '@/components/ui';
import { useTestForm } from '../context/TestFormContext';
import { TestSummaryStats } from './TestSummaryStats';
import { mockTopics, mockSubTopics } from '@/data/mockData';
import { EditIcon } from '@/components/icons/ActionIcons';

const topicNameMap = new Map(mockTopics.map((topic) => [topic.id, topic.name]));
const subTopicNameMap = new Map(mockSubTopics.map((sub) => [sub.id, sub.name]));

export function ChapterwiseSummary() {
  const { values, onEdit } = useTestForm();

  return (
    <div className="border border-gray-300 p-5 rounded">
      <div className="flex items-center justify-between">
        <Badge variant="primary">{APP_LABELS.testCreation.details}</Badge>
        <button
          type="button"
          onClick={onEdit}
          className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary-light transition-colors"
          title={APP_LABELS.common.edit}
        >
          <EditIcon />
        </button>
      </div>

      <div className="flex gap-3 py-2">
        <div className="flex gap-3">
          <img src={APP_LABELS.images.testSubjectIcon} alt={values.title || '-'} className={`w-7 h-auto object-contain}`} /> {values.title || '-'}
        </div>
        <Badge variant="success" className="gap-1"><img src={APP_LABELS.images.cognitionIcon} alt={values.difficulty || '-'} className={`w-3 h-auto object-contain}`} />{values.difficulty || '-'}</Badge>
      </div>

      <div>
        <KeyValue label={APP_LABELS.testCreation.subject}>
          {values.subject || '-'}
        </KeyValue>
        <div className="flex items-start">
          <span className="text-sm font-medium text-gray-500 w-20">{APP_LABELS.testCreation.topic}</span>
          <div className="flex flex-wrap gap-2">:
            {values.topic && values.topic.length > 0 ? (
              values.topic.map((t: string) => (
                <Badge key={t} variant="warning">
                  {topicNameMap.get(t) || t.replace(/-/g, ' ')}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-400">-</span>
            )}
          </div>
        </div>
        <KeyValue label={APP_LABELS.testCreation.subTopic}>
          {values.subTopic ? (
            <Badge variant="warning">{subTopicNameMap.get(values.subTopic) || values.subTopic.replace(/-/g, ' ')}</Badge>
          ) : (
            '-'
          )}
        </KeyValue>
        <div className="flex justify-end">
          <TestSummaryStats
            duration={values.duration}
            totalQuestions={values.markingScheme?.totalQuestions}
            totalMarks={values.markingScheme?.totalMarks}
          />
        </div>
      </div>
    </div>
  );
}
