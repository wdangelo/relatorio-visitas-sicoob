'use client';

// Página de gerenciamento de usuários com CRUD completo

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import MessageContainer from '@/components/ui/MessageContainer';
import { useUsersApi } from '@/hooks/useUsersApi';
import { User, CreateUserData, UpdateUserData } from '@/types/user';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const CARGOS_OPTIONS = [
  'Agente de Negócios',
  'Assistente',
  'Analista',
  'Gerente de Relacionamento PJ',
  'Gerente de Relacionamento PF',
  'Gerente de Agência',
  'Agente de Negócios',
  'Coordenador',
  'Diretoria',
  'Assistente',
  'Coordenador',
  'Outro',
];

const SETORES_OPTIONS = [
  'Administrativo',
  'Financeiro',
  'Comercial',
  'Crédito',
  'Operações',
  'Produtos',
  'Relacionamento',
  'Inteligência de Negócios',
  'Tecnologia',
  'Outro',
];

const REGIONAIS_OPTIONS = [
  'Regional 1',
  'Regional 2',
  'UAD'
];

export default function UsuariosPage() {
  return (
    <ProtectedRoute>
      <UsuariosPageContent />
    </ProtectedRoute>
  );
}

function UsuariosPageContent() {
  const { getUsers, createUser, updateUser, deleteUser, isLoading, error, clearError } = useUsersApi();
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateUserData & { password?: string; confirmPassword?: string }>({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    cargo: '',
    setor: '',
    regional: '',
  });

  // Carregar usuários
  const loadUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
    setFilteredUsers(usersData);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filtrar usuários
  useEffect(() => {
    const filtered = users.filter(user =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.cargo && user.cargo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      password: '',
      confirmPassword: '',
      cargo: '',
      setor: '',
      regional: '',
    });
    setEditingUser(null);
  };

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nome: user.nome,
        email: user.email,
        password: '',
        confirmPassword: '',
        cargo: user.cargo || '',
        setor: user.setor || '',
        regional: user.regional || '',
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
    clearError();
    setSuccess(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
    clearError();
    setSuccess(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nome || !formData.email) {
      return;
    }

    if (!editingUser && !formData.password) {
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.password && formData.password.length < 6) {
      return;
    }

    const { confirmPassword, ...userData } = formData;
    
    let result;
    if (editingUser) {
      // Atualizar usuário
      const updateData: UpdateUserData & { password?: string } = {
        nome: userData.nome,
        email: userData.email,
        cargo: userData.cargo,
        setor: userData.setor,
        regional: userData.regional,
      };
      
      if (userData.password) {
        updateData.password = userData.password;
      }
      
      result = await updateUser(editingUser.id, updateData);
    } else {
      // Criar usuário
      result = await createUser(userData as CreateUserData);
    }

    if (result) {
      setSuccess(editingUser ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
      await loadUsers();
      setTimeout(() => {
        closeModal();
      }, 1500);
    }
  };

  const handleDelete = async (user: User) => {
    if (window.confirm(`Tem certeza que deseja deletar o usuário "${user.nome}"?`)) {
      const success = await deleteUser(user.id);
      if (success) {
        setSuccess('Usuário deletado com sucesso!');
        await loadUsers();
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  const isFormValid = () => {
    const baseValid = formData.nome && formData.email;
    
    if (editingUser) {
      // Para edição, senha é opcional
      if (formData.password) {
        return baseValid && formData.password === formData.confirmPassword && formData.password.length >= 6;
      }
      return baseValid;
    } else {
      // Para criação, senha é obrigatória
      return baseValid && formData.password && formData.password === formData.confirmPassword && formData.password.length >= 6;
    }
  };

  return (
    <DashboardLayout
      title="Gerenciamento de Usuários"
      subtitle="Gerencie usuários do sistema de visitas"
    >
      <div className="space-y-6">
        {success && (
          <MessageContainer type="success">
            {success}
          </MessageContainer>
        )}

        {error && (
          <MessageContainer type="error">
            {error}
          </MessageContainer>
        )}

        {/* Ações e Busca */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Button variant="primary" onClick={() => openModal()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        {/* Lista de Usuários */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-sicoob-verde-escuro">
              Usuários ({filteredUsers.length})
            </h3>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Carregando usuários...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchTerm ? 'Nenhum usuário encontrado.' : 'Nenhum usuário cadastrado.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Nome</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Cargo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Setor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Regional</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{user.nome}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4 text-gray-600">{user.cargo || '-'}</td>
                        <td className="py-3 px-4 text-gray-600">{user.setor || '-'}</td>
                        <td className="py-3 px-4 text-gray-600">{user.regional || '-'}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openModal(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(user)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de Criação/Edição */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
          size="lg"
        >
          {success && (
            <MessageContainer type="success" className="mb-4">
              {success}
            </MessageContainer>
          )}

          {error && (
            <MessageContainer type="error" className="mb-4">
              {error}
            </MessageContainer>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <Input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Digite o nome completo"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@sicoob.com.br"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser ? 'Nova Senha (opcional)' : 'Senha *'}
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  required={!editingUser}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser ? 'Confirmar Nova Senha' : 'Confirmar Senha *'}
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirme a senha"
                  required={!editingUser || !!formData.password}
                  disabled={isLoading}
                />
              </div>
            </div>

            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-red-600 text-sm">As senhas não coincidem</p>
            )}

            <div>
              <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                Cargo
              </label>
                <Select
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={(value) => handleInputChange({ target: { name: 'cargo', value } } as any)}
                  disabled={isLoading}
                  options={CARGOS_OPTIONS.map((cargo) => ({ value: cargo, label: cargo }))}
                  placeholder="Selecione seu cargo"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="setor" className="block text-sm font-medium text-gray-700 mb-1">
                  Setor
                </label>
                <Select
                  id="setor"
                  name="setor"
                  value={formData.setor}
                  onChange={(value) => handleInputChange({ target: { name: 'setor', value } } as any)}
                  disabled={isLoading}
                  options={SETORES_OPTIONS.map((setor) => ({ value: setor, label: setor }))}
                  placeholder="Selecione seu setor"
                />
              </div>

              <div>
                <label htmlFor="regional" className="block text-sm font-medium text-gray-700 mb-1">
                  Regional
                </label>
                <Select
                  id="regional"
                  name="regional"
                  value={formData.regional}
                  onChange={(value) => handleInputChange({ target: { name: 'regional', value } } as any)}
                  disabled={isLoading}
                  options={REGIONAIS_OPTIONS.map((regional) => ({ value: regional, label: regional }))}
                  placeholder="Selecione sua Regional"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={!isFormValid()}
              >
                {isLoading 
                  ? (editingUser ? 'Atualizando...' : 'Criando...') 
                  : (editingUser ? 'Atualizar' : 'Criar')
                }
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

