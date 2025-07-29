'use client';

import { useCallback } from 'react';
import { FormData, ValidationError } from '@/types';
import { useMasks } from './useMasks';

export const useValidation = () => {
  const { validateCpfCnpj } = useMasks();

  const validateForm = useCallback((formData: FormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Validações obrigatórias - Informações do Cooperado
    if (!formData.eCooperado) {
      errors.push({ field: 'eCooperado', message: 'Campo obrigatório' });
    }

    if (!formData.cpfCnpj) {
      errors.push({ field: 'cpfCnpj', message: 'CPF/CNPJ é obrigatório' });
    } else if (!validateCpfCnpj(formData.cpfCnpj)) {
      errors.push({ field: 'cpfCnpj', message: 'CPF/CNPJ inválido' });
    }

    if (!formData.gerenteRelacionamento) {
      errors.push({ field: 'gerenteRelacionamento', message: 'Gerente de Relacionamento é obrigatório' });
    }

    if (!formData.formaGestao) {
      errors.push({ field: 'formaGestao', message: 'Forma de Gestão é obrigatória' });
    }

    // Validação condicional para alteração de sócios
    if (formData.alteracaoSocios === 'Sim' && !formData.descricaoAlteracaoSocios) {
      errors.push({ field: 'descricaoAlteracaoSocios', message: 'Descrição da alteração é obrigatória quando há alteração de sócios' });
    }

    // Validações obrigatórias - Informações da Visita
    if (!formData.dataVisita) {
      errors.push({ field: 'dataVisita', message: 'Data da visita é obrigatória' });
    }

    if (!formData.objetivoVisita) {
      errors.push({ field: 'objetivoVisita', message: 'Objetivo da visita é obrigatório' });
    }

    if (!formData.visitaEnderecoRegistrado) {
      errors.push({ field: 'visitaEnderecoRegistrado', message: 'Campo obrigatório' });
    }

    // Validação condicional para endereço da visita
    if (formData.visitaEnderecoRegistrado === 'Não' && !formData.enderecoVisita) {
      errors.push({ field: 'enderecoVisita', message: 'Endereço da visita é obrigatório quando a visita não é no endereço cadastrado' });
    }

    // Validações obrigatórias - Fotos e Anexos
    if (formData.fotosFachada.length === 0) {
      errors.push({ field: 'fotosFachada', message: 'Foto da fachada é obrigatória' });
    }

    // Validações de formato
    if (formData.cep && !/^\d{5}-?\d{3}$/.test(formData.cep.replace(/\D/g, ''))) {
      errors.push({ field: 'cep', message: 'CEP deve ter formato válido' });
    }

    if (formData.telefone && formData.telefone.replace(/\D/g, '').length < 10) {
      errors.push({ field: 'telefone', message: 'Telefone deve ter pelo menos 10 dígitos' });
    }

    if (formData.site && formData.site && !isValidUrl(formData.site)) {
      errors.push({ field: 'site', message: 'URL do site inválida' });
    }

    return errors;
  }, [validateCpfCnpj]);

  const validateField = useCallback((field: keyof FormData, value: any, formData: FormData): string | null => {
    switch (field) {
      case 'cpfCnpj':
        if (!value) return 'CPF/CNPJ é obrigatório';
        if (!validateCpfCnpj(value)) return 'CPF/CNPJ inválido';
        break;

      case 'gerenteRelacionamento':
        if (!value) return 'Gerente de Relacionamento é obrigatório';
        break;

      case 'formaGestao':
        if (!value) return 'Forma de Gestão é obrigatória';
        break;

      case 'descricaoAlteracaoSocios':
        if (formData.alteracaoSocios === 'Sim' && !value) {
          return 'Descrição da alteração é obrigatória quando há alteração de sócios';
        }
        break;

      case 'dataVisita':
        if (!value) return 'Data da visita é obrigatória';
        break;

      case 'objetivoVisita':
        if (!value) return 'Objetivo da visita é obrigatório';
        break;

      case 'enderecoVisita':
        if (formData.visitaEnderecoRegistrado === 'Não' && !value) {
          return 'Endereço da visita é obrigatório quando a visita não é no endereço cadastrado';
        }
        break;

      case 'cep':
        if (value && !/^\d{5}-?\d{3}$/.test(value.replace(/\D/g, ''))) {
          return 'CEP deve ter formato válido';
        }
        break;

      case 'telefone':
        if (value && value.replace(/\D/g, '').length < 10) {
          return 'Telefone deve ter pelo menos 10 dígitos';
        }
        break;

      case 'site':
        if (value && !isValidUrl(value)) {
          return 'URL do site inválida';
        }
        break;

      default:
        break;
    }

    return null;
  }, [validateCpfCnpj]);

  return {
    validateForm,
    validateField
  };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

