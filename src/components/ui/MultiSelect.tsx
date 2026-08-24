import SelectComponent from 'react-select';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
  required?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  error,
  className = '',
  required,
}: MultiSelectProps) {
  const baseClasses = 'border border-gray-300 rounded h-13 px-3 py-2';
  const errorClasses = error ? 'border-red-500' : '';

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const handleChange = (newValue: readonly MultiSelectOption[] | null) => {
    onChange((newValue || []).map((opt) => opt.value));
  };

  return (
    <SelectComponent
      isMulti
      classNamePrefix="react-select"
      classNames={{
        control: () => `${baseClasses} ${errorClasses} ${className}`,
        valueContainer: () => 'px-3 py-2',
        singleValue: () => 'text-gray-500',
        placeholder: () => 'text-gray-500',
        input: () => 'text-gray-900',
        multiValue: () => 'bg-blue-100 text-blue-800 rounded',
        multiValueLabel: () => 'text-blue-800',
        multiValueRemove: () => 'text-blue-800 hover:text-blue-900',
      }}
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      isSearchable={false}
      isClearable={!required}
      placeholder={placeholder}
      required={required}
    />
  );
}
