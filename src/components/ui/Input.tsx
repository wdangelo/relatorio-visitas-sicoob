'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large' | 'extra-small';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  size = 'medium',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    'extra-small': 'w-16',
    'small': 'w-32',
    'medium': 'w-48',
    'large': 'w-full'
  };

  const inputClasses = `
    px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;

