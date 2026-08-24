import { TokenPayload } from '@/types/auth';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const MOCK_DELAY = 400;

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function decodeTokenPayload(token: string): TokenPayload | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeTokenPayload(token);
  if (!payload) return true;
  return Date.now() >= payload.exp * 1000;
}

export function isTokenExpiringSoon(token: string, thresholdSeconds = 60): boolean {
  const payload = decodeTokenPayload(token);
  if (!payload) return true;
  return Date.now() >= (payload.exp - thresholdSeconds) * 1000;
}

export function base64UrlEncode(payload: object): string {
  const json = JSON.stringify(payload);
  return btoa(json)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function createMockToken(payload: TokenPayload, expiresInSeconds = 900): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };
  return `${base64UrlEncode(header)}.${base64UrlEncode(tokenPayload)}.mock_signature`;
}

export function getDummyLoginEnabled(): boolean {
  return import.meta.env.VITE_DUMMY_LOGIN === 'true' || import.meta.env.VITE_DUMMY_DATA === 'true';
}

export async function mockDelay(ms = MOCK_DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
