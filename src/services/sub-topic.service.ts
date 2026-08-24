import { ApiResponse, SubTopic } from '@/types';
import { apiGet, apiPost } from '@/utils/api';
import { API_ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';
import { mockGetSubTopicsByTopicId, mockGetSubTopicsByMultipleTopicIds } from '@/data/mockData';

function getDummyDataEnabled(): boolean {
  return import.meta.env.VITE_DUMMY_DATA === 'true' || import.meta.env.VITE_DUMMY_LOGIN === 'true';
}

export async function getSubTopicsByTopicId(topicId: string): Promise<SubTopic[]> {
  if (getDummyDataEnabled()) {
    const response = await mockGetSubTopicsByTopicId(topicId);
    return response.data;
  }

  const response = await apiGet<ApiResponse<SubTopic[]>>(API_ROUTES.subTopics.byTopic(topicId));

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(MESSAGES.error.api.fetchSubTopics);
  }

  return response.data;
}

export async function getSubTopicsByMultipleTopicIds(topicIds: string[]): Promise<SubTopic[]> {
  if (getDummyDataEnabled()) {
    const response = await mockGetSubTopicsByMultipleTopicIds(topicIds);
    return response.data;
  }

  const response = await apiPost<ApiResponse<SubTopic[]>>(API_ROUTES.subTopics.multiTopics, {
    topicIds,
  });

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(MESSAGES.error.api.fetchSubTopics);
  }

  return response.data;
}
