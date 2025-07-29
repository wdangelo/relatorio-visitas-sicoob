'use client';

import { useState, useCallback } from 'react';
import { consultarCep, buscarMunicipios, consultarCnpj, buscarParticipantes } from '@/lib/api';
import { EnderecoViaCep, Municipio } from '@/types';
import { debounce } from '@/lib/utils';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [participantesDisponiveis, setParticipantesDisponiveis] = useState<string[]>([]);

  const consultarCepApi = useCallback(async (cep: string): Promise<EnderecoViaCep | null> => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) {
      return null;
    }

    setLoading(true);
    try {
      const resultado = await consultarCep(cep);
      return resultado;
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedConsultarCep = useCallback(
    debounce(consultarCepApi, 500),
    [consultarCepApi]
  );

  const buscarMunicipiosApi = useCallback(async (uf: string) => {
    if (!uf || uf.length !== 2) {
      setMunicipios([]);
      return;
    }

    setLoading(true);
    try {
      const resultado = await buscarMunicipios(uf);
      setMunicipios(resultado);
    } catch (error) {
      console.error('Erro ao buscar municípios:', error);
      setMunicipios([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const consultarCnpjApi = useCallback(async (cnpj: string) => {
    if (!cnpj || cnpj.replace(/\D/g, '').length !== 14) {
      return null;
    }

    setLoading(true);
    try {
      const resultado = await consultarCnpj(cnpj);
      return resultado;
    } catch (error) {
      console.error('Erro ao consultar CNPJ:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarParticipantes = useCallback(async () => {
    setLoading(true);
    try {
      const participantes = await buscarParticipantes();
      setParticipantesDisponiveis(participantes);
    } catch (error) {
      console.error('Erro ao carregar participantes:', error);
      setParticipantesDisponiveis([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    municipios,
    participantesDisponiveis,
    consultarCepApi,
    debouncedConsultarCep,
    buscarMunicipiosApi,
    consultarCnpjApi,
    carregarParticipantes
  };
};

