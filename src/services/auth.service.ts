import { AuthTokens, TokenPayload } from '@/types/auth';
import { clearTokens, setTokens, createMockToken, getDummyLoginEnabled, mockDelay } from '@/utils/auth';
import { apiPost } from '@/utils/api';
import { API_ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function loginWithEmailPassword(userId: string, password: string): Promise<AuthTokens> {
  if (getDummyLoginEnabled() && userId === 'vedant-admin' && password === 'vedant123') {
    await mockDelay();

    const payload: TokenPayload = {
      sub: 'vedant-admin',
      email: 'vedant-admin@preproute.com',
      role: 'Admin',
      name: 'Vedant Admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 900,
    };

    const accessToken = createMockToken(payload, 900);
    const refreshPayload: TokenPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
    const refreshToken = createMockToken(refreshPayload, 7 * 24 * 60 * 60);

    const tokens = { accessToken, refreshToken };
    setTokens(accessToken, refreshToken);
    return tokens;
  }

  const data = await apiPost<LoginResponse>(API_ROUTES.auth.login, {
    userId,
    password,
  });

  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function refreshAuthTokens(): Promise<AuthTokens> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    throw new Error(MESSAGES.error.auth.noRefreshToken);
  }

  const data = await apiPost<LoginResponse>(API_ROUTES.auth.refresh, {
    refreshToken,
  });

  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export function logout(): void {
  clearTokens();
}
