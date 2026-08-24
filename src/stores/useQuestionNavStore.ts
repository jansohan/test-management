import { create } from 'zustand';
import { QuestionNavStore } from '@/types/stores';

export const useQuestionNavStore = create<QuestionNavStore>((set) => ({
  totalQuestions: 1,
  activeQuestion: 0,
  isQuestionsStep: false,
  setTotalQuestions: (count) => set({ totalQuestions: count }),
  setActiveQuestion: (index) => set({ activeQuestion: index }),
  setIsQuestionsStep: (value) => set({ isQuestionsStep: value }),
}));
