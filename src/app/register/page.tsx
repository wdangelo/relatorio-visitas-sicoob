'use client';

// Página de cadastro com estilização Sicoob

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthApi } from '@/hooks/useAuthApi';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import MessageContainer from '@/components/ui/MessageContainer';
import { PublicRoute } from '@/components/auth/PublicRoute';

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
  'Comercial',
  'Crédito',
  'Operações',
  'Relacionamento',
  'Administração',
  'Tecnologia',
  'Outro',
];

const REGIONAIS_OPTIONS = [
  'Regional 1',
  'Regional 2',
  'UAD'
];

export default function RegisterPage() {
  return (
    <PublicRoute>
      <RegisterPageContent />
    </PublicRoute>
  );
}

function RegisterPageContent() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthApi();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    cargo: '',
    setor: '',
    regional: '',
  });

  const [success, setSuccess] = useState(false);

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
  clearError();
  setSuccess(false);
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nome || !formData.email || !formData.password) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.password.length < 6) {
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result && result.success) {
      setSuccess(true);
      setFormData({
        nome: '',
        email: '',
        password: '',
        confirmPassword: '',
        cargo: '',
        setor: '',
        regional: '',
      });
    }
  };

  const isFormValid = () => {
    return (
      formData.nome &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 6
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sicoob-turquesa to-sicoob-verde-escuro flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo Sicoob */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-lg">
            <span className="text-sicoob-turquesa font-bold text-xl">SICOOB</span>
          </div>
          <h1 className="text-white text-2xl font-bold mt-4">Sistema de Visitas</h1>
          <p className="text-white/80 text-sm">Crie sua conta para acessar o sistema</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-sicoob-verde-escuro text-center">
              Criar nova conta
            </h2>
          </CardHeader>



          <CardContent>

            {error && (
                <MessageContainer
                  messages={[{
                    id: 'error-1', // você pode usar uuid ou index se necessário
                    text: error,
                    type: 'error',
                    timestamp: new Date(),

                  }]}
                  onRemoveMessage={() => {}}
                />
              )}

            {/*error && (
              <MessageContainer type="error" className="mb-4" messages={[error]}>
                {error}
              </MessageContainer>
            )*/}

            {success && (
                <MessageContainer
                  messages={[{
                    id: 'success-1',
                    text: 'Conta criada com sucesso! Você pode fazer login agora.',
                    type: 'success',
                    timestamp: new Date(),
                  }]}
                  onRemoveMessage={() => {}}
                />
              )}

            {/*success && (
              <MessageContainer type="success" className="mb-4"  messages={[success]}>
                Conta criada com sucesso! Você pode fazer login agora.
              </MessageContainer>
            )*/}

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
                  placeholder="Digite seu nome completo"
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
                  placeholder="seu.email@sicoob.com.br"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha *
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Senha *
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirme sua senha"
                    required
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

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={!isFormValid()}
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link 
                href="/login" 
                className="text-sicoob-turquesa hover:text-sicoob-turquesa/80 font-medium"
              >
                Fazer login
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Rodapé */}
        <div className="text-center mt-8 text-white/60 text-xs">
          <p>© 2024 Sicoob. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

