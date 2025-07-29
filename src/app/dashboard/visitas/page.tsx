'use client';

// Página de visitas - redireciona para o formulário original

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function VisitasPageContent() {
  // Mock data para demonstração
  const recentVisits = [
    {
      id: 1,
      cooperado: 'João Silva Ltda',
      data: '2024-01-15',
      objetivo: 'Análise de crédito',
      status: 'Concluída',
    },
    {
      id: 2,
      cooperado: 'Maria Santos MEI',
      data: '2024-01-14',
      objetivo: 'Prospecção de novos negócios',
      status: 'Pendente',
    },
    {
      id: 3,
      cooperado: 'Pedro Oliveira & Cia',
      data: '2024-01-13',
      objetivo: 'Renovação de contratos',
      status: 'Concluída',
    },
  ];

  return (
    <DashboardLayout
      title="Relatórios de Visitas"
      subtitle="Gerencie e visualize todos os relatórios de visitas"
    >
      <div className="space-y-6">
        {/* Ações Principais */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/visitas/create">
              <Button variant="primary" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Nova Visita
              </Button>
            </Link>
            
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Buscar Visitas
            </Button>
            
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total de Visitas
                  </p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <div className="p-3 rounded-full bg-sicoob-turquesa/10">
                  <FileText className="h-6 w-6 text-sicoob-turquesa" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Este Mês
                  </p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="p-3 rounded-full bg-sicoob-verde-medio/10">
                  <FileText className="h-6 w-6 text-sicoob-verde-medio" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Pendentes
                  </p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Visitas Recentes */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-sicoob-verde-escuro">
              Visitas Recentes
            </h3>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Cooperado
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Data
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Objetivo
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentVisits.map((visit) => (
                    <tr key={visit.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {visit.cooperado}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(visit.data).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {visit.objetivo}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          visit.status === 'Concluída' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {visit.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Informação sobre Nova Visita */}
        <Card className="bg-sicoob-turquesa/5 border-sicoob-turquesa/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-sicoob-turquesa/10">
                <FileText className="h-6 w-6 text-sicoob-turquesa" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-sicoob-verde-escuro mb-2">
                  Criar Nova Visita
                </h4>
                <p className="text-gray-600 mb-4">
                  Clique no botão "Nova Visita" para acessar o formulário completo de relatório de visitas. 
                  O formulário inclui todas as seções necessárias: informações do cooperado, dados bancários, 
                  detalhes da visita e upload de fotos.
                </p>
                <Link href="/dashboard/visitas/create">
                  <Button variant="primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Acessar Formulário
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


export default function VisitasPage() {
  return (
    <ProtectedRoute>
      <VisitasPageContent />
    </ProtectedRoute>
  );
}

