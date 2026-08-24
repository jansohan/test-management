import { z } from 'zod';
import { MESSAGES } from '@/constants/messages';

export const questionSchema = z.object({
  id: z.string(),
  description: z.string().min(1, MESSAGES.error.validation.questionDescriptionRequired),
  options: z.array(z.object({
    id: z.string(),
    text: z.string().min(1, MESSAGES.error.validation.optionTextRequired),
  })).min(2, MESSAGES.error.validation.atLeastTwoOptions),
  explanation: z.string().optional(),
  mediaUrl: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  topic: z.string().optional(),
  subTopic: z.string().optional(),
  correctAnswer: z.number().min(0).optional(),
});

export const testSchema = z.object({
  title: z.string().min(3, MESSAGES.error.validation.titleMinLength),
  topic: z.array(z.string()).min(1, MESSAGES.error.validation.selectAtLeastOneTopic),
  subTopic: z.string().min(1, MESSAGES.error.validation.selectSubTopic),
  duration: z.string().min(1, MESSAGES.error.validation.durationRequired),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  subject: z.string().min(1, MESSAGES.error.validation.subjectRequired),
  markingScheme: z.object({
    wrongAnswer: z.number(),
    unattempted: z.number().min(0, MESSAGES.error.validation.mustBeZeroOrMore),
    correctAnswer: z.number().min(0, MESSAGES.error.validation.mustBeZeroOrMore),
    totalQuestions: z.number().min(1, MESSAGES.error.validation.mustBeAtLeastOne),
    totalMarks: z.number().min(1, MESSAGES.error.validation.mustBeAtLeastOne),
  }),
  questions: z.array(questionSchema).optional(),
});

export type TestFormValues = z.infer<typeof testSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>;

export const loginSchema = z.object({
  userId: z.string().min(1, MESSAGES.error.auth.userIdRequired),
  password: z.string().min(1, MESSAGES.error.auth.passwordRequired),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  userId: z.string().min(1, MESSAGES.error.auth.userIdRequired),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
