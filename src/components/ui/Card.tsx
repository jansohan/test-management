import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ padding = 'md', className = '', children, ...props }, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      ref={ref}
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
