'use client';

import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 bg-sicoob-turquesa-dark rounded-md flex items-center p-2">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default FormSection;

