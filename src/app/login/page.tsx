'use client';

// Página de login com estilização Sicoob

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useAuthApi } from '@/hooks/useAuthApi';
import Input  from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import MessageContainer from '@/components/ui/MessageContainer';
import { PublicRoute } from '@/components/auth/PublicRoute';

function LoginPageContent() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const { login, isLoading, error, clearError } = useAuthApi();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    const result = await login(formData);
    
    if (result && result.success) {
      authLogin(result.user!, result.token!);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sicoob-turquesa to-sicoob-verde-escuro flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Sicoob */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-lg">
            <span className="text-sicoob-turquesa font-bold text-xl">SICOOB</span>
          </div>
          <h1 className="text-white text-2xl font-bold mt-4">Sistema de Visitas</h1>
          <p className="text-white/80 text-sm">Faça login para acessar o sistema</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-sicoob-verde-escuro text-center">
              Entrar na sua conta
            </h2>
          </CardHeader>

          <CardContent>
            {error && (
              <MessageContainer type="error" className="mb-4">
                {error}
              </MessageContainer>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={!formData.email || !formData.password}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link 
                href="/register" 
                className="text-sicoob-turquesa hover:text-sicoob-turquesa/80 font-medium"
              >
                Criar conta
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

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginPageContent />
    </PublicRoute>
  );
}

