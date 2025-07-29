'use client';

import React, { useRef } from 'react';

interface FileInputProps {
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  error?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  files,
  onChange,
  accept = 'image/*',
  multiple = true,
  required = false,
  error
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onChange([...files, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
            <div className="flex items-center space-x-2">
              {file.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-8 h-8 object-cover rounded"
                />
              )}
              <span className="text-sm text-gray-700 truncate max-w-xs">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveFile(index)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remover
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={handleAddClick}
          className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-teal-500 hover:text-teal-500 transition-colors"
        >
          + Adicionar {label}
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default FileInput;

