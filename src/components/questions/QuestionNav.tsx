import { memo } from 'react';
import { APP_LABELS } from '@/constants/app';
import { NextIcon, CheckIcon, MinusIcon } from '@/components/icons/ActionIcons';

interface QuestionNavProps {
  totalQuestions: number;
  activeQuestion: number;
  onQuestionChange: (index: number) => void;
}

export const QuestionNav = memo(function QuestionNav({ totalQuestions, activeQuestion, onQuestionChange }: QuestionNavProps) {
  return (
    <div className="w-42 bg-white flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">{APP_LABELS.testCreation.questionsNav}</h3>
        <p className="text-xs text-gray-500 mt-1">{APP_LABELS.testCreation.totalLabel} {totalQuestions}</p>
      </div>
      <nav className="flex flex-col p-2 gap-1">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num, index) => {
          const isActive = activeQuestion === index;
          const isCompleted = index < activeQuestion;

          return (
            <button
              key={num}
              type="button"
              onClick={() => onQuestionChange(index)}
            className={`text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between border ${
              isActive
                ? 'border-[var(--color-success)] text-[var(--color-success)] font-medium bg-green-50'
                : isCompleted
                  ? 'border-[var(--color-success)] text-[var(--color-success)] font-medium'
                  : 'border-gray-300 text-gray-500'
            }`}
            >
              {isCompleted && <CheckIcon className="w-4 h-4 text-[var(--color-success)]" />}
              {isActive && <CheckIcon className="w-4 h-4 text-[var(--color-success)]" />}
              {!isActive && !isCompleted && <MinusIcon className="w-4 h-4 text-gray-400" />}
              <span>{APP_LABELS.testCreation.question} {num}</span>
              {isActive && <NextIcon className="w-4 h-4 text-[var(--color-success)]" />}
              {isCompleted && <NextIcon className="w-4 h-4 text-[var(--color-success)]" />}
              {!isActive && !isCompleted && <NextIcon className="w-4 h-4 text-gray-400" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
});
