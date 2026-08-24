import type { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'success' | 'neutral' | 'outline' | 'warning';

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-[var(--color-navy)] text-white',
  success: 'bg-[var(--color-success)] text-white',
  neutral: 'bg-gray-100 text-gray-800',
  outline: 'bg-white text-[var(--color-warning)] border border-[var(--color-warning)]',
  warning: 'bg-white text-[var(--color-warning)] border border-[var(--color-warning)]',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
