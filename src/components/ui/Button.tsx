import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}, ref) => {
  const variantClasses = {
    primary: 'bg-[var(--color-primary-hover)] text-white hover:bg-blue-700',
    secondary: 'bg-[var(--color-primary-light)] text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-gray-600 border border-gray-300 hover:text-gray-900 hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-10 py-3',
    lg: 'px-12 py-4 text-lg',
  };

  return (
    <button
      ref={ref}
      className={`rounded ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
