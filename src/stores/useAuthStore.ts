import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStore } from '@/types/stores';
import { getAccessToken, isTokenExpired, clearTokens, decodeTokenPayload } from '@/utils/auth';
import { loginWithEmailPassword, refreshAuthTokens, logout as logoutService } from '@/services/auth.service';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      tokens: null,

      login: async (userId: string, password: string) => {
        try {
          const tokens = await loginWithEmailPassword(userId, password);
          const payload = decodeTokenPayload(tokens.accessToken);

          set({
            isAuthenticated: true,
            tokens,
            user: payload
              ? { email: payload.email, name: payload.name, role: payload.role }
              : { email: userId, name: userId, role: 'User' },
          });

          return true;
        } catch {
          return false;
        }
      },

      logout: () => {
        logoutService();
        set({ isAuthenticated: false, user: null, tokens: null });
      },

      refreshTokens: async () => {
        try {
          const tokens = await refreshAuthTokens();
          const payload = decodeTokenPayload(tokens.accessToken);

          set({
            tokens,
            user: payload
              ? { email: payload.email, name: payload.name, role: payload.role }
              : get().user,
          });

          return true;
        } catch {
          get().logout();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const token = getAccessToken();
        if (!token || isTokenExpired(token)) {
          clearTokens();
          state.isAuthenticated = false;
          state.user = null;
          state.tokens = null;
        }
      },
    }
  )
);
