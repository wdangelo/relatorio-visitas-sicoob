'use client';

import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large' | 'extra-small';
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  required,
  placeholder = 'Selecione...',
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    'extra-small': 'w-24',
    'small': 'w-32',
    'medium': 'w-48',
    'large': 'w-full'
  };

  const selectClasses = `
    px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={selectClasses}
        value={value}
        onChange={handleChange}
      >
        <option value="">{placeholder}</option>

        {(options ?? []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

       {/*  
       {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        */} 
      </select>
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Select;

