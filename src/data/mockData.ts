import type { Subject, Topic, SubTopic, ApiTest, Question, ApiResponse } from '@/types';

export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'Science' },
  { id: '3', name: 'English' },
  { id: '4', name: 'Social Studies' },
];

export const mockTopics: Topic[] = [
  { id: '1', name: 'Algebra', subjectId: '1' },
  { id: '2', name: 'Geometry', subjectId: '1' },
  { id: '3', name: 'Biology', subjectId: '2' },
  { id: '4', name: 'Chemistry', subjectId: '2' },
  { id: '5', name: 'Physics', subjectId: '2' },
  { id: '6', name: 'Literature', subjectId: '3' },
  { id: '7', name: 'History', subjectId: '4' },
];

export const mockSubTopics: SubTopic[] = [
  { id: '1', name: 'Linear Equations', topicId: '1' },
  { id: '2', name: 'Quadratic Equations', topicId: '1' },
  { id: '3', name: 'Triangles', topicId: '2' },
  { id: '4', name: 'Circles', topicId: '2' },
  { id: '5', name: 'Cell Biology', topicId: '3' },
  { id: '6', name: 'Genetics', topicId: '3' },
  { id: '7', name: 'Organic Chemistry', topicId: '4' },
  { id: '8', name: 'Physical Chemistry', topicId: '4' },
  { id: '9', name: 'Mechanics', topicId: '5' },
  { id: '10', name: 'Optics', topicId: '5' },
  { id: '11', name: 'Poetry', topicId: '6' },
  { id: '12', name: 'Prose', topicId: '6' },
  { id: '13', name: 'Ancient History', topicId: '7' },
  { id: '14', name: 'Modern History', topicId: '7' },
];

export const mockTests: ApiTest[] = [
  {
    id: '1',
    name: 'Algebra Mid-Term',
    subject: 'Mathematics',
    topics: ['algebra'],
    status: 'passed',
    created_at: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Biology Final',
    subject: 'Science',
    topics: ['biology'],
    status: 'pending',
    created_at: '2025-02-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'English Literature Quiz',
    subject: 'English',
    topics: ['literature'],
    status: 'draft',
    created_at: '2025-03-10T09:15:00Z',
  },
  {
    id: '4',
    name: 'Physics Mock Test',
    subject: 'Science',
    topics: ['physics'],
    status: 'failed',
    created_at: '2025-04-05T11:45:00Z',
  },
  {
    id: '5',
    name: 'Geometry Assessment',
    subject: 'Mathematics',
    topics: ['geometry'],
    status: 'live',
    created_at: '2025-05-12T08:20:00Z',
  },
  {
    id: '6',
    name: 'Chemistry Practice Test',
    subject: 'Science',
    topics: ['chemistry'],
    status: 'passed',
    created_at: '2025-06-18T13:10:00Z',
  },
  {
    id: '7',
    name: 'Social Studies Quiz',
    subject: 'Social Studies',
    topics: ['history'],
    status: 'pending',
    created_at: '2025-07-22T16:45:00Z',
  },
  {
    id: '8',
    name: 'Mathematics Olympiad',
    subject: 'Mathematics',
    topics: ['algebra', 'geometry'],
    status: 'live',
    created_at: '2025-08-01T09:30:00Z',
  },
  {
    id: '9',
    name: 'Science Fair Test',
    subject: 'Science',
    topics: ['biology', 'chemistry'],
    status: 'draft',
    created_at: '2025-08-15T11:00:00Z',
  },
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    description: 'What is the value of x in 2x + 5 = 15?',
    options: [
      { id: '1', text: '3' },
      { id: '2', text: '5' },
      { id: '3', text: '7' },
      { id: '4', text: '10' },
    ],
    explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5.',
    difficulty: 'easy',
    topic: 'algebra',
    subTopic: 'Linear Equations',
    correctAnswer: 1,
  },
  {
    id: '2',
    description: 'Which organelle is responsible for photosynthesis?',
    options: [
      { id: '1', text: 'Mitochondria' },
      { id: '2', text: 'Chloroplast' },
      { id: '3', text: 'Nucleus' },
      { id: '4', text: 'Ribosome' },
    ],
    explanation: 'Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.',
    difficulty: 'medium',
    topic: 'biology',
    subTopic: 'Cell Biology',
    correctAnswer: 1,
  },
  {
    id: '3',
    description: 'What is the formula for the area of a circle?',
    options: [
      { id: '1', text: '2πr' },
      { id: '2', text: 'πr²' },
      { id: '3', text: 'πd' },
      { id: '4', text: 'r²' },
    ],
    explanation: 'The area of a circle is π multiplied by the radius squared.',
    difficulty: 'easy',
    topic: 'geometry',
    subTopic: 'Circles',
    correctAnswer: 1,
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockGetSubjects(): Promise<ApiResponse<Subject[]>> {
  await delay(300);
  return { success: true, data: mockSubjects };
}

export async function mockGetTopicsBySubjectId(subjectId: string): Promise<ApiResponse<Topic[]>> {
  await delay(300);
  const filtered = mockTopics.filter((topic) => topic.subjectId === subjectId);
  return { success: true, data: filtered };
}

export async function mockGetSubTopicsByTopicId(topicId: string): Promise<ApiResponse<SubTopic[]>> {
  await delay(300);
  const filtered = mockSubTopics.filter((sub) => sub.topicId === topicId);
  return { success: true, data: filtered };
}

export async function mockGetSubTopicsByMultipleTopicIds(topicIds: string[]): Promise<ApiResponse<SubTopic[]>> {
  await delay(300);
  const filtered = mockSubTopics.filter((sub) => topicIds.includes(sub.topicId));
  return { success: true, data: filtered };
}

export async function mockGetTests(): Promise<ApiResponse<ApiTest[]>> {
  await delay(400);
  return { success: true, data: mockTests };
}

export async function mockGetTestById(id: string): Promise<{ success: boolean; data: ApiTest }> {
  await delay(300);
  const test = mockTests.find((t) => t.id === id);
  if (!test) {
    throw new Error('Test not found');
  }
  return { success: true, data: test };
}

export async function mockCreateTest(payload: { name: string }): Promise<{ success: boolean; data: ApiTest; message: string }> {
  await delay(500);
  const newTest: ApiTest = {
    id: Date.now().toString(),
    name: payload.name,
    subject: 'Mathematics',
    topics: ['algebra'],
    status: null,
    created_at: new Date().toISOString(),
  };
  mockTests.push(newTest);
  return { success: true, data: newTest, message: 'Test created successfully' };
}

export async function mockUpdateTest(id: string, payload: { name: string; subject?: string; topics?: string[] }): Promise<{ success: boolean; data: ApiTest; message: string }> {
  await delay(500);
  const test = mockTests.find((t) => t.id === id);
  if (!test) {
    throw new Error('Test not found');
  }
  if (payload.name) test.name = payload.name;
  if (payload.subject) test.subject = payload.subject;
  if (payload.topics) test.topics = payload.topics;
  return { success: true, data: test, message: 'Test updated successfully' };
}

export async function mockPublishTest(id: string): Promise<{ success: boolean; data: ApiTest; message: string }> {
  await delay(500);
  const test = mockTests.find((t) => t.id === id);
  if (!test) {
    throw new Error('Test not found');
  }
  test.status = 'live' as ApiTest['status'];
  return { success: true, data: test, message: 'Test published successfully' };
}

export async function mockCreateBulkQuestions(payload: { questions: unknown[] }): Promise<{ success: boolean; data: Array<{ id: string; question: string; type: string; test_id: string }>; message: string }> {
  await delay(600);
  const created = payload.questions.map((q: unknown, index: number) => {
    const question = q as Record<string, unknown>;
    return {
      id: Date.now().toString() + index,
      question: question.question as string,
      type: question.type as string,
      test_id: question.test_id as string,
    };
  });
  return { success: true, data: created, message: 'Questions created successfully' };
}

export async function mockFetchBulkQuestions(payload: { question_ids: string[] }): Promise<{ success: boolean; data: Array<{ id: string; question: string; type: string; test_id: string }> }> {
  await delay(400);
  const filtered = mockQuestions.filter((q) => payload.question_ids.includes(q.id)).map((q) => ({
    id: q.id,
    question: q.description,
    type: 'mcq',
    test_id: '1',
  }));
  return { success: true, data: filtered };
}
