// Hook para gerenciamento de usuários via API

import { useState } from 'react';
import { User, CreateUserData, UpdateUserData } from '@/types/user';
import { useAuth } from '@/context/AuthContext';

export const useUsersApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });

  const getUsers = async (): Promise<User[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao buscar usuários');
        return [];
      }

      return data.users || [];
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: CreateUserData): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao criar usuário');
        return null;
      }

      return data.user;
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, userData: UpdateUserData & { password?: string }): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao atualizar usuário');
        return null;
      }

      return data.user;
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao deletar usuário');
        return false;
      }

      return true;
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (id: string): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erro ao buscar usuário');
        return null;
      }

      return data.user;
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

