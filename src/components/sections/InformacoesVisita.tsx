'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import FormGrid from '@/components/FormGrid';
import { FormData } from '@/types';
import { OBJETIVOS_VISITA, ESTADOS_FISICO_VISUAL } from '@/lib/constants';
import { useApi } from '@/hooks/useApi';
import { useMasks } from '@/hooks/useMasks';

interface InformacoesVisitaProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  addParticipante: (participante: string) => void;
  removeParticipante: (index: number) => void;
  errors: Record<string, string>;
}

const InformacoesVisita: React.FC<InformacoesVisitaProps> = ({
  formData,
  updateField,
  addParticipante,
  removeParticipante,
  errors
}) => {
  const { participantesDisponiveis, carregarParticipantes } = useApi();
  const { applyDateMask } = useMasks();
  const [participanteSelecionado, setParticipanteSelecionado] = useState('');

  useEffect(() => {
    carregarParticipantes();
  }, [carregarParticipantes]);

  const handleDateChange = (value: string) => {
    const maskedValue = applyDateMask(value);
    updateField('dataVisita', maskedValue);
  };

  const handleAdicionarParticipante = () => {
    if (participanteSelecionado && !formData.participantes.includes(participanteSelecionado)) {
      addParticipante(participanteSelecionado);
      setParticipanteSelecionado('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Linha 1: Data da Visita */}
      <FormGrid columns={1}>
        <Input
          label="Data da Visita"
          value={formData.dataVisita}
          onChange={(e) => handleDateChange(e.target.value)}
          placeholder="DD/MM/AAAA"
          maxLength={10}
          required
          error={errors.dataVisita}
          size="small"
        />
      </FormGrid>

      {/* Participantes da Visita */}
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-4">
          Participantes da Visita
        </h3>
        
        <div className="space-y-4">
          {/* Adicionar participante */}
          <FormGrid columns={2}>
            <Select
              label="Selecionar Participante"
              options={participantesDisponiveis
                .filter(p => !formData.participantes.includes(p))
                .map(participante => ({
                  value: participante,
                  label: participante
                }))}
              value={participanteSelecionado}
              onChange={setParticipanteSelecionado}
              placeholder="Escolha um participante..."
              size="large"
            />
            
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAdicionarParticipante}
                disabled={!participanteSelecionado}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Adicionar
              </button>
            </div>
          </FormGrid>

          {/* Lista de participantes adicionados */}
          {formData.participantes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">
                Participantes Adicionados:
              </h4>
              {formData.participantes.map((participante, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                >
                  <span className="text-sm text-gray-700">{participante}</span>
                  <button
                    type="button"
                    onClick={() => removeParticipante(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Linha 2: Objetivo da Visita + A visita é no endereço cadastrado */}
      <FormGrid columns={2}>
        <Select
          label="Objetivo da Visita"
          options={OBJETIVOS_VISITA.map(objetivo => ({
            value: objetivo,
            label: objetivo
          }))}
          value={formData.objetivoVisita}
          onChange={(value) => updateField('objetivoVisita', value)}
          required
          error={errors.objetivoVisita}
          size="large"
        />
        
        <Select
          label="A visita é no endereço cadastrado?"
          options={[
            { value: 'Sim', label: 'Sim' },
            { value: 'Não', label: 'Não' }
          ]}
          value={formData.visitaEnderecoRegistrado}
          onChange={(value) => updateField('visitaEnderecoRegistrado', value)}
          required
          error={errors.visitaEnderecoRegistrado}
          size="medium"
        />
      </FormGrid>

      {/* Campo condicional para endereço da visita */}
      {formData.visitaEnderecoRegistrado === 'Não' && (
        <Textarea
          label="Endereço da Visita"
          value={formData.enderecoVisita}
          onChange={(e) => updateField('enderecoVisita', e.target.value)}
          placeholder="Informe o endereço onde a visita foi realizada..."
          required
          error={errors.enderecoVisita}
        />
      )}

      {/* Atividades Exercidas */}
      <Textarea
        label="Atividades Exercidas"
        value={formData.atividadesExercidas}
        onChange={(e) => updateField('atividadesExercidas', e.target.value)}
        placeholder="Descreva as principais atividades exercidas pela empresa..."
        error={errors.atividadesExercidas}
      />

      {/* Linha 3: Número de Funcionários + Estado Físico/Visual */}
      <FormGrid columns={2}>
        <Input
          label="Número de Funcionários"
          value={formData.numeroFuncionarios}
          onChange={(e) => updateField('numeroFuncionarios', e.target.value)}
          type="number"
          min="0"
          placeholder="0"
          error={errors.numeroFuncionarios}
          size="small"
        />
        
        <Select
          label="Estado Físico/Visual da Empresa"
          options={ESTADOS_FISICO_VISUAL.map(estado => ({
            value: estado,
            label: estado
          }))}
          value={formData.estadoFisicoVisual}
          onChange={(value) => updateField('estadoFisicoVisual', value)}
          error={errors.estadoFisicoVisual}
          size="medium"
        />
      </FormGrid>
    </div>
  );
};

export default InformacoesVisita;

