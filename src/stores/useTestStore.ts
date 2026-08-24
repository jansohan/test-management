import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Test, TestFormData } from '@/types';
import { TestStore } from '@/types/stores';
import { mockTests } from '@/data/mockData';

function getDummyDataEnabled(): boolean {
  return import.meta.env.VITE_DUMMY_DATA === 'true' || import.meta.env.VITE_DUMMY_LOGIN === 'true';
}

const getInitialTests = () => {
  if (getDummyDataEnabled()) {
    return mockTests.map((test) => ({
      id: test.id,
      title: test.name,
      subject: test.subject,
      topic: test.topics,
      status: test.status || 'pending',
      description: '',
      createdAt: test.created_at,
    }));
  }
  return [
    { id: '1', title: 'Sample Test', description: 'This is a sample test.' }
  ];
};

export const useTestStore = create<TestStore>()(
  persist(
    (set) => ({
      tests: getInitialTests(),
      addTest: (data: TestFormData) =>
        set((state) => ({
          tests: [
            ...state.tests,
            {
              id: Date.now().toString(),
              ...data,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      addTestFromApi: (data: Test) =>
        set((state) => ({
          tests: [
            ...state.tests,
            data,
          ],
        })),
      saveDraft: (data: TestFormData) =>
        set((state) => ({
          tests: [
            ...state.tests,
            {
              id: Date.now().toString(),
              ...data,
              status: 'draft',
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      saveDraftFromApi: (data: Test) =>
        set((state) => ({
          tests: [
            ...state.tests,
            data,
          ],
        })),
      updateTest: (id: string, data: TestFormData) =>
        set((state) => ({
          tests: state.tests.map((test) =>
            test.id === id ? { ...test, ...data } : test
          ),
        })),
      deleteTest: (id: string) =>
        set((state) => ({
          tests: state.tests.filter((test) => test.id !== id),
        })),
    }),
    {
      name: 'test-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (getDummyDataEnabled()) {
          const initial = getInitialTests();
          state.tests = initial;
        }
      },
    }
  )
);
