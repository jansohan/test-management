import { APP_LABELS } from '@/constants/app';
import { mockSubjects, mockTopics, mockSubTopics } from '@/data/mockData';

export const SUBJECT_OPTIONS = mockSubjects.map((subject) => ({ value: subject.id, label: subject.name }));
export const TOPIC_OPTIONS = mockTopics.map((topic) => ({ value: topic.id, label: topic.name }));
export const SUBTOPIC_OPTIONS = mockSubTopics.map((subTopic) => ({ value: subTopic.id, label: subTopic.name }));

export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: APP_LABELS.testCreation.easy },
  { value: 'medium', label: APP_LABELS.testCreation.medium },
  { value: 'hard', label: APP_LABELS.testCreation.hard },
];
