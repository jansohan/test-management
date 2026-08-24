import { ApiResponse, Topic } from '@/types';
import { apiGet } from '@/utils/api';
import { API_ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';
import { mockGetTopicsBySubjectId } from '@/data/mockData';

function getDummyDataEnabled(): boolean {
  return import.meta.env.VITE_DUMMY_DATA === 'true' || import.meta.env.VITE_DUMMY_LOGIN === 'true';
}

export async function getTopicsBySubjectId(subjectId: string): Promise<Topic[]> {
  if (getDummyDataEnabled()) {
    const response = await mockGetTopicsBySubjectId(subjectId);
    return response.data;
  }

  const response = await apiGet<ApiResponse<Topic[]>>(API_ROUTES.topics.bySubject(subjectId));

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(MESSAGES.error.api.fetchTopics);
  }

  return response.data;
}
