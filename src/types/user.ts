// Tipos TypeScript para usuários

export interface User {
  id: string;
  nome: string;
  email: string;
  cargo?: string;
  setor?: string;
  regional?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface CreateUserData {
  nome: string;
  email: string;
  password: string;
  cargo?: string;
  setor?: string;
  regional?: string;
}

export interface UpdateUserData {
  nome?: string;
  email?: string;
  cargo?: string;
  setor?: string;
  regional?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

