import React from 'react';
import SelectComponent from 'react-select';

interface SelectProps {
  error?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
}

type SelectOption = { value: string; label: string };

export function Select({ error, className = '', value, onChange, children, required, placeholder, ...props }: SelectProps) {
  const baseClasses = 'border border-gray-300 rounded h-13 px-3 py-2';
  const errorClasses = error ? 'border-red-500' : '';
  
  const options = React.Children.toArray(children).flatMap((child) => {
    if (React.isValidElement(child) && child.type === 'option') {
      return {
        value: (child.props as { value: string }).value,
        label: typeof (child.props as { children: React.ReactNode }).children === 'string'
          ? (child.props as { children: string }).children
          : String((child.props as { children: React.ReactNode }).children),
      };
    }
    return [];
  });
  
  const selectedOption = options.find((opt) => opt.value === value) || null;
  
  const handleChange = (newValue: SelectOption | null) => {
    if (onChange) {
      onChange(newValue?.value || '');
    }
  };
  
  return (
    <SelectComponent
      classNamePrefix="react-select"
      classNames={{
        control: () => `${baseClasses} ${errorClasses} ${className}`,
        valueContainer: () => 'px-3 py-2',
        singleValue: () => 'text-gray-500',
        placeholder: () => 'text-gray-500',
        input: () => 'text-gray-900',
      }}
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={false}
      isClearable={!required}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  );
}
