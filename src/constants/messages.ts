export const MESSAGES = {
  error: {
    auth: {
      invalidCredentials: 'Invalid credentials',
      noRefreshToken: 'No refresh token available',
      emailRequired: 'Email is required',
      invalidEmail: 'Invalid email format',
      passwordRequired: 'Password is required',
      userIdRequired: 'User ID is required',
      bothRequired: 'Please enter both email and password.',
    },
    validation: {
      questionDescriptionRequired: 'Question description is required',
      optionTextRequired: 'Option text is required',
      atLeastTwoOptions: 'At least 2 options are required',
      selectTopic: 'Please select a topic',
      selectSubTopic: 'Please select a sub-topic',
      titleMinLength: 'Title must be at least 3 characters',
      selectAtLeastOneTopic: 'Please select at least one topic',
      durationRequired: 'Duration is required',
      subjectRequired: 'Subject is required',
      mustBeZeroOrMore: 'Must be 0 or more',
      mustBeAtLeastOne: 'Must be at least 1',
    },
    api: {
      fetchSubjects: 'Failed to fetch subjects',
      fetchTopics: 'Failed to fetch topics',
      fetchSubTopics: 'Failed to fetch sub-topics',
      fetchTests: 'Failed to fetch tests',
      fetchTest: 'Failed to fetch test',
      createTest: 'Failed to create test',
      updateTest: 'Failed to update test',
      publishTest: 'Failed to publish test',
      createQuestions: 'Failed to create questions',
      fetchQuestions: 'Failed to fetch questions',
      httpError: (status: number) => `HTTP ${status}`,
    },
  },
  success: {
    test: {
      created: 'Test created successfully',
      updated: 'Test updated successfully',
      published: 'Test published successfully',
      deleted: 'Test deleted successfully',
      draftSaved: 'Draft saved successfully',
    },
    question: {
      bulkCreated: (count: number) => `Successfully created ${count} questions`,
      fetched: 'Questions fetched successfully',
    },
    auth: {
      login: 'Login successful',
      refresh: 'Session refreshed',
      logout: 'Logout successful',
    },
  },
} as const;

export type Messages = typeof MESSAGES;
export type ErrorMessages = typeof MESSAGES.error;
export type SuccessMessages = typeof MESSAGES.success;
export type ErrorKey = keyof ErrorMessages;
export type SuccessKey = keyof SuccessMessages;
export type AuthErrorKey = keyof typeof MESSAGES.error.auth;
export type ValidationErrorKey = keyof typeof MESSAGES.error.validation;
export type ApiErrorKey = keyof typeof MESSAGES.error.api;
export type TestSuccessKey = keyof typeof MESSAGES.success.test;
export type QuestionSuccessKey = keyof typeof MESSAGES.success.question;
export type AuthSuccessKey = keyof typeof MESSAGES.success.auth;
