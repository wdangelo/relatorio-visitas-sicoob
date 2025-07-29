'use client';

// Página principal de configurações

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Settings, Database, Shield } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function ConfiguracoesPageContent() {
  const configOptions = [
    {
      title: 'Gerenciar Usuários',
      description: 'Adicionar, editar e remover usuários do sistema',
      icon: Users,
      href: '/dashboard/configuracoes/usuarios',
      color: 'text-sicoob-turquesa',
      bgColor: 'bg-sicoob-turquesa/10',
    },
    {
      title: 'Configurações do Sistema',
      description: 'Configurações gerais do sistema de visitas',
      icon: Settings,
      href: '#',
      color: 'text-sicoob-verde-medio',
      bgColor: 'bg-sicoob-verde-medio/10',
      disabled: true,
    },
    {
      title: 'Backup e Dados',
      description: 'Gerenciar backups e exportação de dados',
      icon: Database,
      href: '#',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      disabled: true,
    },
    {
      title: 'Segurança',
      description: 'Configurações de segurança e permissões',
      icon: Shield,
      href: '#',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      disabled: true,
    },
  ];

  return (
    <DashboardLayout
      title="Configurações"
      subtitle="Gerencie as configurações do sistema"
    >
      <div className="space-y-6">
        {/* Grid de Opções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {configOptions.map((option, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow ${
              option.disabled ? 'opacity-60' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${option.bgColor}`}>
                    <option.icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-sicoob-verde-escuro mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {option.description}
                    </p>
                    {option.disabled ? (
                      <Button variant="outline" disabled>
                        Em breve
                      </Button>
                    ) : (
                      <Link href={option.href}>
                        <Button variant="primary">
                          Acessar
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informações Adicionais */}
        <Card className="bg-sicoob-turquesa/5 border-sicoob-turquesa/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-sicoob-turquesa/10">
                <Users className="h-6 w-6 text-sicoob-turquesa" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-sicoob-verde-escuro mb-2">
                  Gerenciamento de Usuários
                </h4>
                <p className="text-gray-600 mb-4">
                  A funcionalidade de gerenciamento de usuários permite que você:
                </p>
                <ul className="text-gray-600 space-y-1 mb-4">
                  <li>• Criar novos usuários com diferentes cargos e setores</li>
                  <li>• Editar informações de usuários existentes</li>
                  <li>• Remover usuários do sistema</li>
                  <li>• Buscar e filtrar usuários</li>
                  <li>• Gerenciar senhas e permissões</li>
                </ul>
                <Link href="/dashboard/configuracoes/usuarios">
                  <Button variant="primary">
                    <Users className="mr-2 h-4 w-4" />
                    Gerenciar Usuários
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


export default function ConfiguracoesPage() {
  return (
    <ProtectedRoute>
      <ConfiguracoesPageContent />
    </ProtectedRoute>
  );
}

