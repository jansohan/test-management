import { BulkQuestionRequest, BulkQuestionResponse, FetchBulkQuestionsRequest, FetchBulkQuestionsResponse } from '@/types';
import { apiPost } from '@/utils/api';
import { API_ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';
import { mockCreateBulkQuestions, mockFetchBulkQuestions } from '@/data/mockData';

function getDummyDataEnabled(): boolean {
  return import.meta.env.VITE_DUMMY_DATA === 'true' || import.meta.env.VITE_DUMMY_LOGIN === 'true';
}

export async function createBulkQuestions(payload: BulkQuestionRequest): Promise<BulkQuestionResponse['data']> {
  if (getDummyDataEnabled()) {
    const response = await mockCreateBulkQuestions(payload);
    return response.data;
  }

  const response = await apiPost<BulkQuestionResponse>(API_ROUTES.questions.bulk, payload);

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(MESSAGES.error.api.createQuestions);
  }

  return response.data;
}

export async function fetchBulkQuestions(payload: FetchBulkQuestionsRequest): Promise<FetchBulkQuestionsResponse['data']> {
  if (getDummyDataEnabled()) {
    const response = await mockFetchBulkQuestions(payload);
    return response.data;
  }

  const response = await apiPost<FetchBulkQuestionsResponse>(API_ROUTES.questions.fetchBulk, payload);

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(MESSAGES.error.api.fetchQuestions);
  }

  return response.data;
}
