// Utilitários de autenticação

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserWithPassword } from '@/types/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-here';

// Função para hash da senha
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Função para verificar senha
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Função para gerar JWT token
export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      nome: user.nome,
    },
    JWT_SECRET,
    { expiresIn: '7d' } // Token válido por 7 dias
  );
};

// Função para verificar JWT token
export const verifyToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      email: decoded.email,
      nome: decoded.nome,
    };
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
};

// Função para extrair token do header Authorization
export const extractTokenFromHeader = (authHeader: string | null): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove "Bearer " do início
};

// Função para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para validar senha (mínimo 6 caracteres)
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

