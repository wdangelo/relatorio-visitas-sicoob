// API route para operações específicas de usuário por ID

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { hashPassword, isValidEmail, isValidPassword, verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { UpdateUserData } from '@/types/user';

// Middleware para verificar autenticação
const verifyAuth = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
};

// GET - Buscar usuário por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Token de acesso inválido' },
        { status: 401 }
      );
    }

    const { id } = params;

    const result = await query(
      'SELECT id, nome, email, cargo, setor, regional, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.rows[0],
    });

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Token de acesso inválido' },
        { status: 401 }
      );
    }

    const { id } = params;
    const updateData: UpdateUserData & { password?: string } = await request.json();

    // Verificar se o usuário existe
    const existingUser = await query(
      'SELECT id, email FROM users WHERE id = $1',
      [id]
    );

    if (existingUser.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Validar email se fornecido
    if (updateData.email && !isValidEmail(updateData.email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verificar se o novo email já está em uso (se diferente do atual)
    if (updateData.email && updateData.email.toLowerCase() !== existingUser.rows[0].email) {
      const emailCheck = await query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [updateData.email.toLowerCase(), id]
      );

      if (emailCheck.rows.length > 0) {
        return NextResponse.json(
          { success: false, message: 'Email já está em uso' },
          { status: 409 }
        );
      }
    }

    // Preparar campos para atualização
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (updateData.nome) {
      updateFields.push(`nome = $${paramIndex++}`);
      updateValues.push(updateData.nome);
    }

    if (updateData.email) {
      updateFields.push(`email = $${paramIndex++}`);
      updateValues.push(updateData.email.toLowerCase());
    }

    if (updateData.cargo !== undefined) {
      updateFields.push(`cargo = $${paramIndex++}`);
      updateValues.push(updateData.cargo);
    }

    if (updateData.setor !== undefined) {
      updateFields.push(`setor = $${paramIndex++}`);
      updateValues.push(updateData.setor);
    }

    if (updateData.regional !== undefined) {
      updateFields.push(`regional = $${paramIndex++}`);
      updateValues.push(updateData.regional);
    }

    // Atualizar senha se fornecida
    if (updateData.password) {
      if (!isValidPassword(updateData.password)) {
        return NextResponse.json(
          { success: false, message: 'Senha deve ter pelo menos 6 caracteres' },
          { status: 400 }
        );
      }
      const hashedPassword = await hashPassword(updateData.password);
      updateFields.push(`password = $${paramIndex++}`);
      updateValues.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Nenhum campo para atualizar' },
        { status: 400 }
      );
    }

    // Adicionar updated_at
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const updateQuery = `
      UPDATE users 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramIndex}
      RETURNING id, nome, email, cargo, setor, regional, updated_at
    `;

    const result = await query(updateQuery, updateValues);

    return NextResponse.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      user: result.rows[0],
    });

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar usuário
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Token de acesso inválido' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Verificar se o usuário existe
    const existingUser = await query(
      'SELECT id FROM users WHERE id = $1',
      [id]
    );

    if (existingUser.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Deletar usuário
    await query('DELETE FROM users WHERE id = $1', [id]);

    return NextResponse.json({
      success: true,
      message: 'Usuário deletado com sucesso',
    });

  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

