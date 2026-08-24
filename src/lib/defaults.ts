import type { TestFormValues } from '@/lib/validation';

export const defaultValues: TestFormValues = {
  title: '',
  subject: '',
  topic: [],
  subTopic: '',
  duration: '30',
  difficulty: 'medium',
  markingScheme: {
    wrongAnswer: -1,
    unattempted: 0,
    correctAnswer: 5,
    totalQuestions: 1,
    totalMarks: 100,
  },
  questions: [],
};

export const emptyMarkingScheme = {
  wrongAnswer: -1,
  unattempted: 0,
  correctAnswer: 5,
  totalQuestions: 0,
  totalMarks: 0,
};
