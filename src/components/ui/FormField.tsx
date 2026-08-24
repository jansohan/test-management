import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700 pb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, className = '', ...props }, ref) => {
  const baseClasses = 'border border-gray-300 rounded h-13 px-3 py-2';
  const errorClasses = error ? 'border-red-500' : '';
  
  return (
    <input
      ref={ref}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ error, className = '', ...props }, ref) => {
  const baseClasses = 'border border-gray-300 rounded px-3 py-2';
  const errorClasses = error ? 'border-red-500' : '';
  
  return (
    <textarea
      ref={ref}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  required?: boolean;
}

export function RadioGroup({ label, name, value, onChange, options, error, required }: RadioGroupProps) {
  return (
    <FormField label={label} error={error ? 'This field is required' : undefined} required={required}>
      <div className="flex flex-row gap-4 justify-between pt-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </FormField>
  );
}
