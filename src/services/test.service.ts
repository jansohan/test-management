import { ApiResponse, ApiTest, CreateTestRequest, CreateTestResponse, UpdateTestRequest, UpdateTestResponse, GetTestByIdResponse } from '@/types';
import { apiGet, apiPost, apiPut } from '@/utils/api';
import { API_ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';
import { mockGetTests, mockGetTestById, mockCreateTest, mockUpdateTest, mockPublishTest } from '@/data/mockData';

function getDummyDataEnabled(): boolean {
  return import.meta.env.VITE_DUMMY_DATA === 'true' || import.meta.env.VITE_DUMMY_LOGIN === 'true';
}

export async function getTests(): Promise<ApiTest[]> {
  if (getDummyDataEnabled()) {
    const response = await mockGetTests();
    return response.data;
  }

  const response = await apiGet<ApiResponse<ApiTest[]>>(API_ROUTES.tests.list);

  if (!response.success || !Array.isArray(response.data)) {
    throw new Error(MESSAGES.error.api.fetchTests);
  }

  return response.data;
}

export async function getTestById(id: string): Promise<ApiTest> {
  if (getDummyDataEnabled()) {
    const response = await mockGetTestById(id);
    return response.data;
  }

  const response = await apiGet<GetTestByIdResponse>(API_ROUTES.tests.byId(id));

  if (!response.success || !response.data) {
    throw new Error(MESSAGES.error.api.fetchTest);
  }

  return response.data;
}

export async function createTest(payload: CreateTestRequest): Promise<ApiTest> {
  if (getDummyDataEnabled()) {
    const response = await mockCreateTest({ name: payload.name });
    return response.data;
  }

  const response = await apiPost<CreateTestResponse>(API_ROUTES.tests.create, payload);

  if (!response.success || !response.data) {
    throw new Error(MESSAGES.error.api.createTest);
  }

  return response.data;
}

export async function updateTest(id: string, payload: UpdateTestRequest): Promise<ApiTest> {
  if (getDummyDataEnabled()) {
    const response = await mockUpdateTest(id, payload);
    return response.data;
  }

  const response = await apiPut<UpdateTestResponse>(API_ROUTES.tests.byId(id), payload);

  if (!response.success || !response.data) {
    throw new Error(MESSAGES.error.api.updateTest);
  }

  return response.data;
}

export async function publishTest(id: string): Promise<ApiTest> {
  if (getDummyDataEnabled()) {
    const response = await mockPublishTest(id);
    return response.data;
  }

  const response = await apiPut<UpdateTestResponse>(API_ROUTES.tests.byId(id), {
    status: 'live',
  });

  if (!response.success || !response.data) {
    throw new Error(MESSAGES.error.api.publishTest);
  }

  return response.data;
}
