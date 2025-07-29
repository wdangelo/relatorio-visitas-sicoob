'use client';

import React, { useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import FormGrid from '@/components/FormGrid';
import { FormData } from '@/types';
import { ESTADOS_BRASIL, FORMAS_GESTAO, TIPOS_IMOVEL } from '@/lib/constants';
import { useMasks } from '@/hooks/useMasks';
import { useApi } from '@/hooks/useApi';

interface InformacoesCooperadoProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
  errors: Record<string, string>;
}

const InformacoesCooperado: React.FC<InformacoesCooperadoProps> = ({
  formData,
  updateField,
  errors
}) => {
  const { applyCpfCnpjMask, applyCepMask, applyPhoneMask, applyMoneyMask, applyDateMask } = useMasks();
  const { municipios, consultarCepApi, buscarMunicipiosApi } = useApi();

  // Buscar municípios quando UF mudar
  useEffect(() => {
    if (formData.uf) {
      buscarMunicipiosApi(formData.uf);
    }
  }, [formData.uf, buscarMunicipiosApi]);

  // Consultar CEP quando mudar
  useEffect(() => {
    const consultarCep = async () => {
      if (formData.cep && formData.cep.replace(/\D/g, '').length === 8) {
        const endereco = await consultarCepApi(formData.cep);
        if (endereco) {
          updateField('logradouro', endereco.logradouro);
          updateField('bairro', endereco.bairro);
          updateField('uf', endereco.uf);
          updateField('municipio', endereco.localidade);
        }
      }
    };

    const timeoutId = setTimeout(consultarCep, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.cep, consultarCepApi, updateField]);

  const handleCpfCnpjChange = (value: string) => {
    const maskedValue = applyCpfCnpjMask(value);
    updateField('cpfCnpj', maskedValue);
  };

  const handleCepChange = (value: string) => {
    const maskedValue = applyCepMask(value);
    updateField('cep', maskedValue);
  };

  const handlePhoneChange = (value: string) => {
    const maskedValue = applyPhoneMask(value);
    updateField('telefone', maskedValue);
  };

  const handleMoneyChange = (field: keyof FormData) => (value: string) => {
    const maskedValue = applyMoneyMask(value);
    updateField(field, maskedValue);
  };

  const handleDateChange = (value: string) => {
    const maskedValue = applyDateMask(value);
    updateField('dataNascimentoConstituicao', maskedValue);
  };

  return (
    <div className="space-y-6">
      {/* Linha 1: É Cooperado + CPF/CNPJ + PA */}
      <FormGrid columns={3}>
        <Select
          label="É Cooperado"
          options={[
            { value: 'Sim', label: 'Sim' },
            { value: 'Não', label: 'Não' }
          ]}
          value={formData.eCooperado}
          onChange={(value) => updateField('eCooperado', value)}
          required
          error={errors.eCooperado}
          size="small"
        />
        
        <Input
          label="CPF/CNPJ"
          value={formData.cpfCnpj}
          onChange={(e) => handleCpfCnpjChange(e.target.value)}
          placeholder="000.000.000-00"
          maxLength={18}
          required
          error={errors.cpfCnpj}
          size="medium"
        />
        
        <Select
          label="PA"
          options={Array.from({ length: 12 }, (_, i) => ({
            value: String(i + 1).padStart(2, '0'),
            label: String(i + 1).padStart(2, '0')
          }))}
          value={formData.pa}
          onChange={(value) => updateField('pa', value)}
          error={errors.pa}
          size="small"
        />
      </FormGrid>

      {/* Linha 2: Gerente + Nome/Razão Social */}
      <FormGrid columns={2}>
        <Input
          label="Gerente de Relacionamento"
          value={formData.gerenteRelacionamento}
          onChange={(e) => updateField('gerenteRelacionamento', e.target.value)}
          required
          error={errors.gerenteRelacionamento}
          size="large"
        />
        
        <Input
          label="Nome/Razão Social"
          value={formData.nomeRazaoSocial}
          onChange={(e) => updateField('nomeRazaoSocial', e.target.value)}
          error={errors.nomeRazaoSocial}
          size="large"
        />
      </FormGrid>

      {/* Linha 3: CEP + Logradouro + Número */}
      <FormGrid columns={3}>
        <Input
          label="CEP"
          value={formData.cep}
          onChange={(e) => handleCepChange(e.target.value)}
          placeholder="00000-000"
          maxLength={9}
          error={errors.cep}
          size="small"
        />
        
        <Input
          label="Logradouro"
          value={formData.logradouro}
          onChange={(e) => updateField('logradouro', e.target.value)}
          error={errors.logradouro}
          size="large"
        />
        
        <Input
          label="Número"
          value={formData.numero}
          onChange={(e) => updateField('numero', e.target.value)}
          maxLength={5}
          error={errors.numero}
          size="extra-small"
        />
      </FormGrid>

      {/* Linha 4: Complemento + Bairro */}
      <FormGrid columns={2}>
        <Input
          label="Complemento"
          value={formData.complemento}
          onChange={(e) => updateField('complemento', e.target.value)}
          error={errors.complemento}
          size="large"
        />
        
        <Input
          label="Bairro"
          value={formData.bairro}
          onChange={(e) => updateField('bairro', e.target.value)}
          error={errors.bairro}
          size="large"
        />
      </FormGrid>

      {/* Linha 5: UF + Município + Data Nascimento */}
      <FormGrid columns={3}>
        <Select
          label="UF"
          options={ESTADOS_BRASIL.map(estado => ({
            value: estado.sigla,
            label: `${estado.sigla} - ${estado.nome}`
          }))}
          value={formData.uf}
          onChange={(value) => updateField('uf', value)}
          error={errors.uf}
          size="small"
        />
        
        <Select
          label="Município"
          options={municipios.map(municipio => ({
            value: municipio.nome,
            label: municipio.nome
          }))}
          value={formData.municipio}
          onChange={(value) => updateField('municipio', value)}
          error={errors.municipio}
          size="medium"
        />
        
        <Input
          label="Data Nascimento/Constituição"
          value={formData.dataNascimentoConstituicao}
          onChange={(e) => handleDateChange(e.target.value)}
          placeholder="DD/MM/AAAA"
          maxLength={10}
          error={errors.dataNascimentoConstituicao}
          size="small"
        />
      </FormGrid>

      {/* Linha 6: Renda/Faturamento + Aplicações + Capital Social */}
      <FormGrid columns={3}>
        <Input
          label="Renda/Faturamento"
          value={formData.rendaFaturamento}
          onChange={(e) => handleMoneyChange('rendaFaturamento')(e.target.value)}
          placeholder="R$ 0,00"
          error={errors.rendaFaturamento}
          size="medium"
        />
        
        <Input
          label="Aplicações"
          value={formData.aplicacoes}
          onChange={(e) => handleMoneyChange('aplicacoes')(e.target.value)}
          placeholder="R$ 0,00"
          error={errors.aplicacoes}
          size="medium"
        />
        
        <Input
          label="Capital Social"
          value={formData.capitalSocial}
          onChange={(e) => handleMoneyChange('capitalSocial')(e.target.value)}
          placeholder="R$ 0,00"
          error={errors.capitalSocial}
          size="medium"
        />
      </FormGrid>

      {/* Linha 7: Telefone + Site */}
      <FormGrid columns={2}>
        <Input
          label="Telefone"
          value={formData.telefone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="(00) 00000-0000"
          error={errors.telefone}
          size="medium"
        />
        
        <Input
          label="Site"
          value={formData.site}
          onChange={(e) => updateField('site', e.target.value)}
          placeholder="https://www.exemplo.com.br"
          error={errors.site}
          size="large"
        />
      </FormGrid>

      {/* Linha 8: Forma de Gestão + Patrimônio + Tipo de Imóvel */}
      <FormGrid columns={3}>
        <Select
          label="Forma de Gestão"
          options={FORMAS_GESTAO.map(forma => ({
            value: forma,
            label: forma
          }))}
          value={formData.formaGestao}
          onChange={(value) => updateField('formaGestao', value)}
          required
          error={errors.formaGestao}
          size="medium"
        />
        
        <Input
          label="Patrimônio"
          value={formData.patrimonio}
          onChange={(e) => handleMoneyChange('patrimonio')(e.target.value)}
          placeholder="R$ 0,00"
          error={errors.patrimonio}
          size="medium"
        />
        
        <Select
          label="Tipo de Imóvel"
          options={TIPOS_IMOVEL.map(tipo => ({
            value: tipo,
            label: tipo
          }))}
          value={formData.tipoImovel}
          onChange={(value) => updateField('tipoImovel', value)}
          error={errors.tipoImovel}
          size="medium"
        />
      </FormGrid>

      {/* Linha 9: Alteração de Sócios */}
      <FormGrid columns={1}>
        <Select
          label="Alteração de sócios?"
          options={[
            { value: 'Sim', label: 'Sim' },
            { value: 'Não', label: 'Não' }
          ]}
          value={formData.alteracaoSocios}
          onChange={(value) => updateField('alteracaoSocios', value)}
          error={errors.alteracaoSocios}
          size="small"
        />
      </FormGrid>

      {/* Campo condicional para descrição da alteração */}
      {formData.alteracaoSocios === 'Sim' && (
        <Textarea
          label="Descrição da Alteração de Sócios"
          value={formData.descricaoAlteracaoSocios}
          onChange={(e) => updateField('descricaoAlteracaoSocios', e.target.value)}
          placeholder="Descreva as alterações realizadas..."
          required
          error={errors.descricaoAlteracaoSocios}
        />
      )}
    </div>
  );
};

export default InformacoesCooperado;

