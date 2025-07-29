'use client';

// Página inicial do dashboard

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { FileText, Users, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function DashboardPageContent() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Visitas Realizadas',
      value: '24',
      icon: FileText,
      color: 'text-sicoob-turquesa',
      bgColor: 'bg-sicoob-turquesa/10',
    },
    {
      title: 'Usuários Ativos',
      value: '12',
      icon: Users,
      color: 'text-sicoob-verde-medio',
      bgColor: 'bg-sicoob-verde-medio/10',
    },
    {
      title: 'Taxa de Sucesso',
      value: '87%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Visitas Este Mês',
      value: '8',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Nova visita registrada',
      user: 'João Silva',
      time: '2 horas atrás',
      type: 'visit',
    },
    {
      id: 2,
      action: 'Usuário cadastrado',
      user: 'Maria Santos',
      time: '4 horas atrás',
      type: 'user',
    },
    {
      id: 3,
      action: 'Relatório gerado',
      user: 'Pedro Oliveira',
      time: '1 dia atrás',
      type: 'report',
    },
    {
      id: 4,
      action: 'Visita atualizada',
      user: 'Ana Costa',
      time: '2 dias atrás',
      type: 'visit',
    },
  ];

  return (
    <DashboardLayout
      title={`Bem-vindo, ${user?.nome?.split(' ')[0] || 'Usuário'}!`}
      subtitle="Aqui está um resumo das atividades do sistema"
    >
      <div className="space-y-6">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-sicoob-verde-escuro">
                Ações Rápidas
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/dashboard/visitas">
                <Button variant="primary" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Nova Visita
                </Button>
              </Link>
              
              <Link href="/dashboard/configuracoes/usuarios">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Gerenciar Usuários
                </Button>
              </Link>
              
              <Link href="/dashboard/visitas">
                <Button variant="secondary" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Ver Relatórios
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Atividades Recentes */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-sicoob-verde-escuro">
                Atividades Recentes
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'visit' ? 'bg-sicoob-turquesa/10' :
                      activity.type === 'user' ? 'bg-sicoob-verde-medio/10' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'visit' && (
                        <FileText className="h-4 w-4 text-sicoob-turquesa" />
                      )}
                      {activity.type === 'user' && (
                        <Users className="h-4 w-4 text-sicoob-verde-medio" />
                      )}
                      {activity.type === 'report' && (
                        <TrendingUp className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        por {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações do Usuário */}
        {user && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-sicoob-verde-escuro">
                Suas Informações
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nome</p>
                  <p className="text-base text-gray-900">{user.nome}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-base text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Cargo</p>
                  <p className="text-base text-gray-900">{user.cargo || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Setor</p>
                  <p className="text-base text-gray-900">{user.setor || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Regional</p>
                  <p className="text-base text-gray-900">{user.regional || 'Não informado'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}



export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardPageContent />
    </ProtectedRoute>
  );
}

