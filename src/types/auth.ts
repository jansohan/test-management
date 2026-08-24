export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
