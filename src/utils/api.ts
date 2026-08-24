const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

function getApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

function getJsonHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `HTTP ${response.status}`);
  }
  return response.json();
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(getApiUrl(path), init);
  return handleResponse<T>(response);
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(path, {
    method: 'GET',
    headers: getJsonHeaders(),
  });
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'PUT',
    headers: getJsonHeaders(),
    body: JSON.stringify(body),
  });
}
