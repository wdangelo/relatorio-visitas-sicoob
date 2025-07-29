// Hook para chamadas da API de autenticação

import { useState } from 'react';
import { LoginData, CreateUserData, AuthResponse } from '@/types/user';

export const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (loginData: LoginData): Promise<AuthResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao fazer login');
        return null;
      }

      return data;
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: CreateUserData): Promise<AuthResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao criar conta');
        return null;
      }

      return data;
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

