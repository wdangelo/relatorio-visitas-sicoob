'use client';

import { useState, useCallback } from 'react';
import { FormData, BancoInfo } from '@/types';

const initialFormData: FormData = {
  // Informações do Cooperado
  eCooperado: '',
  cpfCnpj: '',
  pa: '',
  gerenteRelacionamento: '',
  nomeRazaoSocial: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  uf: '',
  municipio: '',
  dataNascimentoConstituicao: '',
  rendaFaturamento: '',
  aplicacoes: '',
  capitalSocial: '',
  telefone: '',
  site: '',
  formaGestao: '',
  patrimonio: '',
  tipoImovel: '',
  alteracaoSocios: '',
  descricaoAlteracaoSocios: '',

  // Informações Bancárias
  bancos: [],

  // Informações da Visita
  dataVisita: '',
  participantes: [],
  objetivoVisita: '',
  visitaEnderecoRegistrado: '',
  enderecoVisita: '',
  atividadesExercidas: '',
  numeroFuncionarios: '',
  estadoFisicoVisual: '',

  // Fotos e Anexos
  fotosFachada: [],
  fotosInterior: [],
  fotosEstoque: [],
  fotosOutros: [],
  observacoes: ''
};

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateNestedField = useCallback((field: keyof FormData, index: number, subField: string, value: any) => {
    setFormData(prev => {
      const array = prev[field] as any[];
      const newArray = [...array];
      newArray[index] = {
        ...newArray[index],
        [subField]: value
      };
      return {
        ...prev,
        [field]: newArray
      };
    });
  }, []);

  const addBanco = useCallback(() => {
    const newBanco: BancoInfo = {
      id: Date.now().toString(),
      banco: '',
      responsabilidadeTotal: '',
      previdencia: false,
      aplicacoes: false,
      cobranca: false,
      seguros: false
    };
    
    setFormData(prev => ({
      ...prev,
      bancos: [...prev.bancos, newBanco]
    }));
  }, []);

  const removeBanco = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      bancos: prev.bancos.filter(banco => banco.id !== id)
    }));
  }, []);

  const addParticipante = useCallback((participante: string) => {
    setFormData(prev => ({
      ...prev,
      participantes: [...prev.participantes, participante]
    }));
  }, []);

  const removeParticipante = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      participantes: prev.participantes.filter((_, i) => i !== index)
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem('sicoob-form-draft');
      if (saved) {
        const parsedData = JSON.parse(saved);
        // Não carregar arquivos do localStorage por questões de segurança
        const dataWithoutFiles = {
          ...parsedData,
          fotosFachada: [],
          fotosInterior: [],
          fotosEstoque: [],
          fotosOutros: []
        };
        setFormData(dataWithoutFiles);
        return true;
      }
    } catch (error) {
      console.error('Erro ao carregar rascunho:', error);
    }
    return false;
  }, []);

  const saveToStorage = useCallback(() => {
    try {
      // Salvar dados sem os arquivos
      const dataToSave = {
        ...formData,
        fotosFachada: [],
        fotosInterior: [],
        fotosEstoque: [],
        fotosOutros: []
      };
      localStorage.setItem('sicoob-form-draft', JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error);
      return false;
    }
  }, [formData]);

  return {
    formData,
    updateField,
    updateNestedField,
    addBanco,
    removeBanco,
    addParticipante,
    removeParticipante,
    resetForm,
    loadFromStorage,
    saveToStorage
  };
};

