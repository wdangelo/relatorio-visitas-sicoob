'use client';

import React from 'react';
import { Message } from '@/types';

interface MessageContainerProps {
  messages?: Message[];
  onRemoveMessage: (id: string) => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages = [],
  onRemoveMessage
}) => {
  if (messages.length === 0) return null;

  const getMessageStyles = (type: Message['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 border rounded-md shadow-md ${getMessageStyles(message.type)}`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm">{message.text}</p>
            <button
              onClick={() => onRemoveMessage(message.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;

