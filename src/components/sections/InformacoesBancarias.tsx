'use client';

import React from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import FormGrid from '@/components/FormGrid';
import { FormData, BancoInfo } from '@/types';
import { BANCOS_BRASIL } from '@/lib/constants';
import { useMasks } from '@/hooks/useMasks';

interface InformacoesBancariasProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  updateNestedField: (field: keyof FormData, index: number, subField: string, value: any) => void;
  addBanco: () => void;
  removeBanco: (id: string) => void;
  errors: Record<string, string>;
}

const InformacoesBancarias: React.FC<InformacoesBancariasProps> = ({
  formData,
  updateField,
  updateNestedField,
  addBanco,
  removeBanco,
  errors
}) => {
  const { applyMoneyMask } = useMasks();

  const handleMoneyChange = (index: number, value: string) => {
    const maskedValue = applyMoneyMask(value);
    updateNestedField('bancos', index, 'responsabilidadeTotal', maskedValue);
  };

  const handleCheckboxChange = (index: number, field: string, checked: boolean) => {
    updateNestedField('bancos', index, field, checked);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium text-gray-900">
          Relacionamento Bancário
        </h3>
        <button
          type="button"
          onClick={addBanco}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          + Adicionar Banco
        </button>
      </div>

      {formData.bancos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum banco adicionado ainda.</p>
          <p className="text-sm">Clique em "Adicionar Banco" para começar.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.bancos.map((banco, index) => (
            <div
              key={banco.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">
                  Banco {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeBanco(banco.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remover
                </button>
              </div>

              <div className="space-y-4">
                {/* Linha 1: Banco + Responsabilidade Total */}
                <FormGrid columns={2}>
                  <Select
                    label="Banco"
                    options={BANCOS_BRASIL.map(b => ({
                      value: b.nome,
                      label: `${b.codigo} - ${b.nome}`
                    }))}
                    value={banco.banco}
                    onChange={(value) => updateNestedField('bancos', index, 'banco', value)}
                    placeholder="Selecione o banco..."
                    size="large"
                  />
                  
                  <Input
                    label="Responsabilidade Total"
                    value={banco.responsabilidadeTotal}
                    onChange={(e) => handleMoneyChange(index, e.target.value)}
                    placeholder="R$ 0,00"
                    size="medium"
                  />
                </FormGrid>

                {/* Linha 2: Checkboxes de serviços */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serviços Utilizados
                  </label>
                  <FormGrid columns={4}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={banco.previdencia}
                        onChange={(e) => handleCheckboxChange(index, 'previdencia', e.target.checked)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">Previdência</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={banco.aplicacoes}
                        onChange={(e) => handleCheckboxChange(index, 'aplicacoes', e.target.checked)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">Aplicações</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={banco.cobranca}
                        onChange={(e) => handleCheckboxChange(index, 'cobranca', e.target.checked)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">Cobrança</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={banco.seguros}
                        onChange={(e) => handleCheckboxChange(index, 'seguros', e.target.checked)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">Seguros</span>
                    </label>
                  </FormGrid>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InformacoesBancarias;

