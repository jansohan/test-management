import type { ReactNode } from 'react';

interface KeyValueProps {
  label: string;
  children: ReactNode;
  align?: 'left' | 'right';
}

export function KeyValue({ label, children, align = 'left' }: KeyValueProps) {
  return (
    <div className="flex align-items-center py-2">
      <span className="text-sm font-medium text-gray-500 w-20">{label}</span>
      <div className={`text-sm text-gray-900 ${align === 'right' ? 'md:text-right w-full' : ''}`}>
        : {children}
      </div>
    </div>
  );
}
