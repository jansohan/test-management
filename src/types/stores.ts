import type { Test, TestFormData } from '@/types';
import type { AuthTokens } from '@/types/auth';

export interface TestStore {
  tests: Test[];
  addTest: (data: TestFormData) => void;
  addTestFromApi: (data: Test) => void;
  saveDraft: (data: TestFormData) => void;
  saveDraftFromApi: (data: Test) => void;
  updateTest: (id: string, data: TestFormData) => void;
  deleteTest: (id: string) => void;
}

export interface AuthStore {
  isAuthenticated: boolean;
  user: { email: string; name: string; role: string; picture?: string } | null;
  tokens: AuthTokens | null;
  login: (userId: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshTokens: () => Promise<boolean>;
}

export interface QuestionNavStore {
  totalQuestions: number;
  activeQuestion: number;
  isQuestionsStep: boolean;
  setTotalQuestions: (count: number) => void;
  setActiveQuestion: (index: number) => void;
  setIsQuestionsStep: (value: boolean) => void;
}
