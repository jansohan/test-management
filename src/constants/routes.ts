export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  testCreation: '/test-creation',
  testTracking: '/test-tracking',
} as const;

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
  },
  subjects: '/subjects',
  topics: {
    bySubject: (subjectId: string) => `/topics/subject/${subjectId}`,
  },
  subTopics: {
    byTopic: (topicId: string) => `/sub-topics/topic/${topicId}`,
    multiTopics: '/sub-topics/multi-topics',
  },
  tests: {
    list: '/tests',
    create: '/tests',
    byId: (id: string) => `/tests/${id}`,
  },
  questions: {
    bulk: '/questions/bulk',
    fetchBulk: '/questions/fetchBulk',
  },
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];
export type ApiTopicRoute = typeof API_ROUTES.topics;
export type ApiSubTopicRoute = typeof API_ROUTES.subTopics;
export type ApiTestsRoute = typeof API_ROUTES.tests;
