'use client';

import React, { JSX, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FormData } from '@/types';


interface UserInfoProps {
  isExpanded?: boolean;
  className?: string;
  fields?: ('nome' | 'email' | 'cargo')[];
  formData?: FormData;
  updateField?: (field: keyof FormData, value: any) => void;
  
}

export const UserInfo: React.FC<UserInfoProps> = ({
  isExpanded = true,
  className = '',
  fields = ['nome', 'email', 'cargo'],
  formData,
  updateField

}) => {
  const { user } = useAuth();

useEffect(() => {
  if (user && updateField) {
    if (user.nome) updateField('nome', user.nome);
    if (user.email) updateField('email', user.email);
    if (user.cargo) updateField('cargo', user.cargo);
  }
}, [user, updateField]);




  // Mapeamento de campos para exibição
  const fieldComponents: Record<
    string,
    () => JSX.Element | null
  > = {
    nome: () => (
      <p key="nome" className="text-lg font-semibold truncate">
        {user?.nome || 'Usuário'}
      </p>
    ),
    email: () => (
      <p key="email" className="text-md text-gray-900 truncate">
        {user?.email || 'email@exemplo.com'}
      </p>
    ),
    cargo: () =>
      user?.cargo ? (
        <p key="cargo" className="text-xs text-gray-700 truncate">
          {user.cargo}
        </p>
      ) : null,
  };



  // Filtrar e mapear apenas os campos válidos
  const renderedFields = fields
    .map((field) => fieldComponents[field]?.())
    .filter((element): element is JSX.Element => element !== null);

  return (
    <div className={` ${className}`}>
      {isExpanded && user && <div className="mb-3">{renderedFields}</div>}
    </div>
  );
};