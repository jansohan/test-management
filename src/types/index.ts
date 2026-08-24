export interface SubTopic {
  id: string;
  name: string;
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiTest {
  id: string;
  name: string;
  subject: string;
  topics: string[];
  status?: 'passed' | 'failed' | 'pending' | 'draft' | 'live' | null;
  created_at: string;
}

export interface CreateTestRequest {
  name: string;
  type: 'chapterwise' | 'pyq' | 'mockTest';
  subject: string;
  topics: string[];
  sub_topics: string[];
  correct_marks: number;
  wrong_marks: number;
  unattempt_marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  total_time: number;
  total_marks: number;
  total_questions: number;
  status: string | null;
}

export interface CreateTestResponse {
  success: boolean;
  data: ApiTest;
  message: string;
}

export interface UpdateTestRequest {
  name: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  correct_marks: number;
  wrong_marks: number;
  unattempt_marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  total_time: number;
  total_marks: number;
  total_questions: number;
  questions: string[];
}

export interface UpdateTestResponse {
  success: boolean;
  data: ApiTest;
  message: string;
}

export interface GetTestByIdResponse {
  success: boolean;
  data: ApiTest;
}

export interface BulkQuestionRequest {
  questions: Array<{
    type: 'mcq';
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_option: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    test_id: string;
  }>;
}

export interface BulkQuestionResponse {
  success: boolean;
  data: Array<{
    id: string;
    question: string;
    type: string;
    test_id: string;
  }>;
  message: string;
}

export interface SubTopic {
  id: string;
  name: string;
  topicId: string;
}

export interface MultiSubTopicsRequest {
  topicIds: string[];
}

export interface MultiSubTopicsResponse {
  success: boolean;
  data: SubTopic[];
}

export interface FetchBulkQuestionsRequest {
  question_ids: string[];
}

export interface FetchBulkQuestionsResponse {
  success: boolean;
  data: Array<{
    id: string;
    question: string;
    type: string;
    test_id: string;
  }>;
}

export interface Test {
  id: string;
  title: string;
  description?: string;
  subject?: string;
  topic?: string[];
  subTopic?: string;
  duration?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'passed' | 'failed' | 'pending' | 'draft' | 'live';
  markingScheme?: {
    wrongAnswer: number;
    unattempted: number;
    correctAnswer: number;
    totalQuestions: number;
    totalMarks: number;
  };
  questions?: Question[];
  createdAt?: string;
}

export interface Question {
  id: string;
  description: string;
  options: QuestionOption[];
  explanation?: string;
  mediaUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  subTopic: string;
  correctAnswer?: number;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface TestFormData {
  title: string;
  subject: string;
  topic: string[];
  subTopic: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  markingScheme: {
    wrongAnswer: number;
    unattempted: number;
    correctAnswer: number;
    totalQuestions: number;
    totalMarks: number;
  };
  questions?: Question[];
}

export type TestTab = 'chapterwise' | 'pyq' | 'mockTest';
