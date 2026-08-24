import { ApiResponse, Subject } from '@/types';
import { apiGet } from '@/utils/api';
import { API_ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';
import { mockGetSubjects } from '@/data/mockData';

function getDummyDataEnabled(): boolean {
  return import.meta.env.VITE_DUMMY_DATA === 'true' || import.meta.env.VITE_DUMMY_LOGIN === 'true';
}

export async function getSubjects(): Promise<Subject[]> {
  if (getDummyDataEnabled()) {
    const response = await mockGetSubjects();
    return response.data;
  }

  const response = await apiGet<ApiResponse<Subject[]>>(API_ROUTES.subjects);

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(MESSAGES.error.api.fetchSubjects);
  }

  return response.data;
}
