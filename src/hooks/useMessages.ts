'use client';

import { useState, useCallback } from 'react';
import { Message } from '@/types';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((type: Message['type'], text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);

    // Auto-remove message after 5 seconds
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }, 5000);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const showSuccess = useCallback((text: string) => {
    addMessage('success', text);
  }, [addMessage]);

  const showError = useCallback((text: string) => {
    addMessage('error', text);
  }, [addMessage]);

  const showWarning = useCallback((text: string) => {
    addMessage('warning', text);
  }, [addMessage]);

  const showInfo = useCallback((text: string) => {
    addMessage('info', text);
  }, [addMessage]);

  return {
    messages,
    addMessage,
    removeMessage,
    clearMessages,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

