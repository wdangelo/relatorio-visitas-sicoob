// API route para login de usuários

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { verifyPassword, generateToken, isValidEmail } from '@/lib/auth';
import { UserWithPassword } from '@/types/user';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido' },
        { status: 400 }
      );
    }

    // Buscar usuário no banco de dados
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const user: UserWithPassword = result.rows[0];

    // Verificar senha
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Gerar token JWT
    const userForToken = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      cargo: user.cargo,
      setor: user.setor,
      regional: user.regional,
    };

    const token = generateToken(userForToken);

    // Retornar sucesso com token e dados do usuário (sem senha)
    return NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: userForToken,
      token,
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

