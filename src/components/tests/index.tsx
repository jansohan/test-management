import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTestStore } from '@/stores/useTestStore';
import { useQuestionNavStore } from '@/stores/useQuestionNavStore';
import { APP_LABELS } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { testSchema, TestFormValues } from '@/lib/validation';
import { Breadcrumb } from '@/components/ui';
import { TestFormContext, type TestFormContextValue } from './context/TestFormContext';
import { TestTabs } from './tabs/TestTabs';
import { ChapterwiseForm } from './ChapterwiseForm';
import { QuestionsStep } from './steps/QuestionsStep';
import { FormActions } from './FormActions';
import { defaultValues, emptyMarkingScheme } from '@/lib/defaults';
import { createTest, getTestById, updateTest } from '@/services/test.service';
import type { Test } from '@/types';

type Tab = 'chapterwise' | 'pyq' | 'mockTest';
type ChapterwiseStep = 'details' | 'questions';

const detailsTabBreadcrumb = (step: ChapterwiseStep): string =>
  step === 'details' ? APP_LABELS.testCreation.chapterwiseBreadcrumb : 'Questions';

const tabBreadcrumb = (tab: Tab): string =>
  tab === 'pyq'
    ? APP_LABELS.testCreation.pyqBreadcrumb
    : APP_LABELS.testCreation.mockTestBreadcrumb;

export function TestCreationForm() {
  const addTestFromApi = useTestStore((state) => state.addTestFromApi);
  const saveDraftFromApi = useTestStore((state) => state.saveDraftFromApi);
  const updateTestInStore = useTestStore((state) => state.updateTest);
  const navigate = useNavigate();
  const location = useLocation();
  const editingId = (location.state as { editingId?: string } | null)?.editingId;
  const [activeTab, setActiveTab] = useState<Tab>('chapterwise');
  const [chapterwiseStep, setChapterwiseStep] = useState<ChapterwiseStep>('details');
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
    setValue,
    setFocus,
  } = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues,
  });

  const { fields: questions, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions',
  });

  const watchedValues = watch();
  const totalQuestions = watchedValues.markingScheme?.totalQuestions || 0;

  const setActiveQuestion = useQuestionNavStore((state) => state.setActiveQuestion);
  const setTotalQuestions = useQuestionNavStore((state) => state.setTotalQuestions);
  const setIsQuestionsStep = useQuestionNavStore((state) => state.setIsQuestionsStep);
  const activeQuestion = useQuestionNavStore((state) => state.activeQuestion);
  const isQuestionsStep = chapterwiseStep === 'questions';

  useEffect(() => {
    setTotalQuestions(totalQuestions);
  }, [totalQuestions, setTotalQuestions]);

  useEffect(() => {
    setIsQuestionsStep(isQuestionsStep);
  }, [isQuestionsStep, setIsQuestionsStep]);

  useEffect(() => {
    if (!editingId) {
      setIsEditing(false);
      return;
    }

    let cancelled = false;
    setIsEditing(true);

    async function loadTest() {
      if (!editingId) return;
      try {
        const test = await getTestById(editingId);
        if (!cancelled) {
          reset({
            title: test.name,
            subject: test.subject || '',
            topic: test.topics || [],
            subTopic: '',
            duration: '30',
            difficulty: 'medium',
            markingScheme: {
              wrongAnswer: -1,
              unattempted: 0,
              correctAnswer: 5,
              totalQuestions: 0,
              totalMarks: 0,
            },
            questions: [],
          });
        }
      } catch (err) {
        console.error('Failed to load test:', err);
      }
    }

    loadTest();

    return () => {
      cancelled = true;
    };
  }, [editingId, reset]);

  const initializeQuestions = () => {
    const currentQuestions = watchedValues.questions || [];
    if (currentQuestions.length === 0 && totalQuestions > 0) {
      const newQuestions = Array.from({ length: totalQuestions }, () => ({
        id: Date.now().toString() + Math.random(),
        description: '',
        options: [
          { id: '1', text: '' },
          { id: '2', text: '' },
          { id: '3', text: '' },
          { id: '4', text: '' },
        ],
        explanation: '',
        mediaUrl: '',
        difficulty: 'medium' as const,
        topic: '',
        subTopic: '',
        correctAnswer: 0,
      }));
      setValue('questions', newQuestions);
    }
  };

  const onSubmit: SubmitHandler<TestFormValues> = async (data) => {
    try {
      if (isEditing && editingId) {
        const updated = await updateTest(editingId, {
          name: data.title,
          subject: data.subject,
          topics: data.topic,
          sub_topics: data.subTopic ? [data.subTopic] : [],
          correct_marks: data.markingScheme.correctAnswer,
          wrong_marks: data.markingScheme.wrongAnswer,
          unattempt_marks: data.markingScheme.unattempted,
          difficulty: data.difficulty,
          total_time: Number(data.duration),
          total_marks: data.markingScheme.totalMarks,
          total_questions: data.markingScheme.totalQuestions,
          questions: [],
        });

        updateTestInStore(editingId, {
          title: updated.name,
          subject: updated.subject || data.subject,
          topic: updated.topics || data.topic,
          subTopic: data.subTopic,
          duration: data.duration,
          difficulty: data.difficulty,
          markingScheme: data.markingScheme,
        });
      } else {
        const apiTest = await createTest({
          name: data.title,
          type: 'chapterwise',
          subject: data.subject,
          topics: data.topic,
          sub_topics: data.subTopic ? [data.subTopic] : [],
          correct_marks: data.markingScheme.correctAnswer,
          wrong_marks: data.markingScheme.wrongAnswer,
          unattempt_marks: data.markingScheme.unattempted,
          difficulty: data.difficulty,
          total_time: Number(data.duration),
          total_marks: data.markingScheme.totalMarks,
          total_questions: data.markingScheme.totalQuestions,
          status: null,
        });

        addTestFromApi({
          ...data,
          id: apiTest.id,
          createdAt: apiTest.created_at,
        } as Test);
      }
    } catch (error) {
      console.error(isEditing ? 'Failed to update test:' : 'Failed to create test:', error);
    } finally {
      reset({
        ...defaultValues,
        markingScheme: emptyMarkingScheme,
      });
      setChapterwiseStep('details');
      setActiveQuestion(0);
      setTotalQuestions(0);
      setIsEditing(false);
      navigate(ROUTES.dashboard, { replace: true });
    }
  };

  const onSaveDraft: SubmitHandler<TestFormValues> = async (data) => {
    try {
      if (isEditing && editingId) {
        await updateTest(editingId, {
          name: data.title,
          subject: data.subject,
          topics: data.topic,
          sub_topics: data.subTopic ? [data.subTopic] : [],
          correct_marks: data.markingScheme.correctAnswer,
          wrong_marks: data.markingScheme.wrongAnswer,
          unattempt_marks: data.markingScheme.unattempted,
          difficulty: data.difficulty,
          total_time: Number(data.duration),
          total_marks: data.markingScheme.totalMarks,
          total_questions: data.markingScheme.totalQuestions,
          questions: [],
        });

        updateTestInStore(editingId, {
          title: data.title,
          subject: data.subject,
          topic: data.topic,
          subTopic: data.subTopic,
          duration: data.duration,
          difficulty: data.difficulty,
          markingScheme: data.markingScheme,
        });
      } else {
        const apiTest = await createTest({
          name: data.title,
          type: 'chapterwise',
          subject: data.subject,
          topics: data.topic,
          sub_topics: data.subTopic ? [data.subTopic] : [],
          correct_marks: data.markingScheme.correctAnswer,
          wrong_marks: data.markingScheme.wrongAnswer,
          unattempt_marks: data.markingScheme.unattempted,
          difficulty: data.difficulty,
          total_time: Number(data.duration),
          total_marks: data.markingScheme.totalMarks,
          total_questions: data.markingScheme.totalQuestions,
          status: 'draft',
        });

        saveDraftFromApi({
          ...data,
          id: apiTest.id,
          createdAt: apiTest.created_at,
        } as Test);
      }
    } catch (error) {
      console.error(isEditing ? 'Failed to update draft:' : 'Failed to save draft:', error);
    } finally {
      reset({
        ...defaultValues,
        markingScheme: emptyMarkingScheme,
      });
      setChapterwiseStep('details');
      setActiveQuestion(0);
      setTotalQuestions(0);
      setIsEditing(false);
      navigate(ROUTES.dashboard, { replace: true });
    }
  };

  const handleChapterwiseNext = async () => {
    if (chapterwiseStep === 'details') {
      const fieldsToValidate: (keyof TestFormValues)[] = ['title', 'subject', 'topic', 'subTopic', 'duration', 'difficulty', 'markingScheme'];
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
      initializeQuestions();
      setChapterwiseStep('questions');
    }
  };

  const handleChapterwisePrevious = () => {
    if (chapterwiseStep === 'questions') {
      setChapterwiseStep('details');
    }
  };

  const handleAddQuestion = () => {
    appendQuestion({
      id: Date.now().toString() + Math.random(),
      description: '',
      options: [
        { id: '1', text: '' },
        { id: '2', text: '' },
        { id: '3', text: '' },
        { id: '4', text: '' },
      ],
      explanation: '',
      mediaUrl: '',
      difficulty: 'medium' as const,
      topic: '',
      subTopic: '',
      correctAnswer: 0,
    });
    const newIndex = questions.length;
    setActiveQuestion(newIndex);
    setTotalQuestions(newIndex + 1);
  };

  const handleDeleteQuestion = (index: number) => {
    removeQuestion(index);
    if (activeQuestion >= questions.length - 1) {
      setActiveQuestion(Math.max(0, questions.length - 2));
    }
    setTotalQuestions(questions.length - 1);
  };

  const breadcrumbItems = [
    { label: APP_LABELS.nav.dashboard, to: ROUTES.dashboard },
    { label: isEditing ? APP_LABELS.nav.dashboard : APP_LABELS.nav.testCreation, to: isEditing ? ROUTES.dashboard : ROUTES.testCreation },
    {
      label: isEditing ? APP_LABELS.tests.editTitle : (activeTab === 'chapterwise' ? detailsTabBreadcrumb(chapterwiseStep) : tabBreadcrumb(activeTab)),
    },
  ];

  const isChapterwise = activeTab === 'chapterwise';

  const contextValue: TestFormContextValue = {
    register,
    control,
    errors,
    values: watchedValues,
    totalQuestions,
    activeQuestion,
    onQuestionChange: setActiveQuestion,
    onEdit: handleChapterwisePrevious,
    isQuestionsStep,
    onPrevious: handleChapterwisePrevious,
    onCancel: () => navigate(ROUTES.dashboard),
    onNext: handleChapterwiseNext,
    onAddQuestion: handleAddQuestion,
    onDeleteQuestion: handleDeleteQuestion,
    onSaveDraft,
    handleSubmit,
    setFocus,
    watch,
    isEditing,
  };

  return (
    <TestFormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />

        {chapterwiseStep === 'details' && (
          <TestTabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {isChapterwise && chapterwiseStep === 'details' && (
          <ChapterwiseForm
            step={chapterwiseStep}
          />
        )}

        {isChapterwise && isQuestionsStep && (
          <QuestionsStep />
        )}

        {isChapterwise && (
          <FormActions />
        )}
       </form>
    </TestFormContext.Provider>
  );
}

export { TestTracking } from './TestTracking';
