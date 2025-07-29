// API route para CRUD de usuários

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { hashPassword, isValidEmail, isValidPassword, verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { CreateUserData, UpdateUserData } from '@/types/user';

// Middleware para verificar autenticação
const verifyAuth = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
};

// GET - Listar todos os usuários
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Token de acesso inválido' },
        { status: 401 }
      );
    }

    const result = await query(
      'SELECT id, nome, email, cargo, setor, regional, created_at, updated_at FROM users ORDER BY nome'
    );

    return NextResponse.json({
      success: true,
      users: result.rows,
    });

  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar novo usuário
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Token de acesso inválido' },
        { status: 401 }
      );
    }

    const userData: CreateUserData = await request.json();
    const { nome, email, password, cargo, setor, regional } = userData;

    // Validações básicas
    if (!nome || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido' },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { success: false, message: 'Senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email já está em uso' },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Inserir novo usuário
    const result = await query(
      `INSERT INTO users (nome, email, password, cargo, setor, regional) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, nome, email, cargo, setor, regional, created_at`,
      [nome, email.toLowerCase(), hashedPassword, cargo, setor, regional]
    );

    const newUser = result.rows[0];

    return NextResponse.json({
      success: true,
      message: 'Usuário criado com sucesso',
      user: newUser,
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

