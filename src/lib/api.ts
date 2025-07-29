// Funções para integração com APIs externas

import { EnderecoViaCep, Municipio } from '@/types';

export const consultarCep = async (cep: string): Promise<EnderecoViaCep | null> => {
  try {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      throw new Error('CEP deve ter 8 dígitos');
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro na consulta do CEP');
    }

    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf
    };
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
    return null;
  }
};

export const buscarMunicipios = async (uf: string): Promise<Municipio[]> => {
  try {
    if (!uf || uf.length !== 2) {
      return [];
    }

    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    
    if (!response.ok) {
      throw new Error('Erro na consulta de municípios');
    }

    const data = await response.json();
    
    return data.map((municipio: any) => ({
      nome: municipio.nome
    })).sort((a: Municipio, b: Municipio) => a.nome.localeCompare(b.nome));
  } catch (error) {
    console.error('Erro ao buscar municípios:', error);
    return [];
  }
};

export const consultarCnpj = async (cnpj: string): Promise<any | null> => {
  try {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    
    if (cnpjLimpo.length !== 14) {
      throw new Error('CNPJ deve ter 14 dígitos');
    }

    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`);
    
    if (!response.ok) {
      throw new Error('Erro na consulta do CNPJ');
    }

    const data = await response.json();
    
    if (data.status === 'ERROR') {
      throw new Error(data.message || 'CNPJ não encontrado');
    }

    return {
      nome: data.nome,
      fantasia: data.fantasia,
      situacao: data.situacao,
      cep: data.cep,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      municipio: data.municipio,
      uf: data.uf,
      telefone: data.telefone,
      email: data.email,
      atividade_principal: data.atividade_principal,
      data_situacao: data.data_situacao,
      capital_social: data.capital_social
    };
  } catch (error) {
    console.error('Erro ao consultar CNPJ:', error);
    return null;
  }
};

// Simulação de API para participantes (em produção seria uma API real)
export const buscarParticipantes = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        'ADALBERTO BENEDITO MARQUES', 
        'ADRIANA DE BARROS ALMEIDA ANTON', 
        'ADRIELI CRISTINA DOS SANTOS RODRIGUES', 
        'ALESSANDRO DA SILVA SANTOS', 
        'ALESSANDRO DIAS GUIZARDI', 
        'ANDRE LUIS ALBERTIN', 
        'ANDRESSA PAULA SANTOS TOZONI', 
        'ANDREZZA DEOMEDESSE', 
        'ANGELO JOSE DE OLIVEIRA', 
        'ARIANA CRISTINA BELLAN', 
        'BARBARA LIDIA DE CASTRO WENZEL', 
        'BIANCA BUORO SCATOLIN MARINO', 
        'BIANCA GASPARINI', 
        'BIANCA MIQUELLOTO VAZOLER BUZOLIN', 
        'BRUNA GABRIELLA DOS SANTOS DIAS', 
        'BRUNA RENATA DA SILVA', 
        'BRUNO EDUARDO DA SILVA', 
        'CAMILA JARDIM CARVALHO', 
        'CLAUDIA CRISTINA COLTURATO DA COSTA', 
        'CARLA CRISTINA DIAS', 
        'CESAR JUNIOR LANCA', 
        'CLAYTON CESAR FAVARO', 
        'CLAYTON MERLO', 
        'CRISTIANE DINIZ PEREIRA CUNHA', 
        'CRISTIANO LUIZ ALVES BOLZAN', 
        'DAVI PAULINO VERTU FAVARO', 
        'EDUARDA WACHTER MATTOS', 
        'JULIANA SILVA DOS SANTOS RAIMUNDO', 
        'DANIELLE LUZ CARDOSO BITTES', 
        'DAYANE APARECIDA ALVES', 
        'DAYANE ISA SFERRA TRAIBA', 
        'DEBORA HELLEN DOS REIS', 
        'DEJENTAL ROSENDO DE SOUZA JUNIOR', 
        'DELER MARCELO PRIOLI', 
        'DENIS MENDES DA SILVA', 
        'DOUGLAS DE CASTRO SUELI', 
        'EDER FERNANDO FURONI JUNIOR', 
        'EDUARDA MAYANE FONSECA', 
        'ELTON LUZ DA SILVA', 
        'ERICK PEREIRA DE SOUZA', 
        'EVANDRO LUIZ DE MATTOS', 
        'EVELIN CAROLINE MONTEZELLI REMUALDO', 
        'FABIANA CRISTINA RAGONHA', 
        'FABIO CANGELAR MARCATO', 
        'FABIO JOSE ZANÃO', 
        'FABIO ROGERIO BAZILIO', 
        'FELIPE DE MARCO DE MELO', 
        'FERNANDA FERREIRA MACHADO', 
        'FERNANDA GONÇALVES DE ALMEIDA BERTIN', 
        'FILIPE DIEGO PRADO', 
        'FLAVIO RIBEIRO DE SOUZA', 
        'FREDERICK CARVALHO', 
        'FREDERICO CORREA CAMPOS', 
        'GABRIEL LAZAROTTO CARVALHO', 
        'GABRIELA BROETTO', 
        'GABRIELA PACHECO ESCHER', 
        'GILBERTO LOPES CHIVA', 
        'GISELE CHRIST ANTUNES', 
        'GUSTAVO APARECIDO DE SOUZA', 
        'GUSTAVO BERGER GARCIA', 
        'HELAN GERALDO DA SILVA', 
        'HERON SALTON DE ALMEIDA', 
        'ISABELLA VICTORIA VICENTE PAVANELLI', 
        'JAIME PINTO FERREIRA JUNIOR', 
        'JESSICA BARBI GARCIA DAMIANO', 
        'JESSICA DAIANE SILVEIRA FANTINELLI', 
        'JESSICA FERGUSON MAIDA', 
        'JESSICA VALQUIRIA SILVA DA CRUZ', 
        'JOANA D\'ARC SERAFIM VASCONCELOS', 
        'JOAO OSCAR IMPOLCETTO FILHO', 
        'JOAO PAULO MANZINE', 
        'JONATHAS MACHADO', 
        'JOSE ALBINO OLIER MIAZZO', 
        'JOSE DANIEL MENDES VIEIRA', 
        'JOSE MAURICIO LOPES', 
        'JOSE VICENTE DE SOUZA', 
        'JOSUE DIAS', 
        'JOSUE FELIPE CRUZ DE PAULA', 
        'JOVINO ALVES DE GODOY', 
        'JULIA FERNANDES CATTAE', 
        'JULIA MORAES PINHEIRO', 
        'JULIA PAULOSO TOMASSINI', 
        'JULIANA APARECIDA CONFORTINI', 
        'JULIANE SATILIO BUENO', 
        'KACIELE APARECIDA DE MELO RIBEIRO', 
        'KATIA CRISTINA MILHORINI ANDRADE', 
        'KAYKE GUILHERME VERTU', 
        'KEILE TATIANE FERNANDES DE OLIVEIRA', 
        'KIMBERLY HARTEMAN DE MOURA', 
        'LARISSA HELENA ZANI', 
        'LEANDRO MILHOR', 
        'LEILANE ISIS CARASKI', 
        'LETICIA FERRAGUT CASOTTI', 
        'LETICIA GANDOLFINE DE OLIVEIRA', 
        'LETICIA REYNES CASAGRANDE PINTO', 
        'LETICIA VITORIA DA SILVA FERNANDES', 
        'LIDIANE DE FARIAS MORO', 
        'LIVIA MENOSSI GHIZZI', 
        'LUCAS DE LIMA SILVA', 
        'LUCAS HUMBERTO CESÁRIO PARROTTI', 
        'LUCIANO RICARDO ACIARI', 
        'LUIZ FELIPE GOMES BEIG', 
        'LUIZ ROBERTO MATHIAS JUNIOR', 
        'MARCELA INACIO SANTORO', 
        'MARCELO DE OLIVEIRA RAMOS', 
        'MARCELO UNDICIATTI', 
        'MARCIA APARECIDA MARTINS', 
        'MARCIA REGINA DALESSE PICELLI', 
        'MARCO FERNANDO LIVIO', 
        'MARCOS ANTONIO VACHELLI', 
        'MARCOS ROGERIO ZANETTI', 
        'MARCOS VINICIUS SILVEIRA', 
        'MARIA ALICE DIAS PICELLI', 
        'MARIA GABRIELA PAES DA SILVA MELLO', 
        'MARIANA TEIXEIRA MARTINS', 
        'MARIANA VOLLET DE CASTRO', 
        'MARTA AURELIA TURAZZI BUENO', 
        'MATHEUS DE OLIVEIRA DE MORAIS', 
        'MATHEUS THADEU CATOIA VILELA', 
        'MICHELE CRISTINA BERTACINI RONQUIM', 
        'MILENA XAVIER DOS SANTOS', 
        'NAIARA APARECIDA RODRIGUES DE CAMARGO JOPE', 
        'NATHALIA MENDES DE HOLANDA', 
        'NATHALIA VIANA CABRERA', 
        'NEYLA FERNANDA BERNARDINO SATIRO', 
        'PATRICIA APARECIDA CALDAS', 
        'PATRICIA POMPEO GIMENEZ', 
        'POLIANE GOMES BECCARO DIKERTS', 
        'RAISSA SATIKO HIRAI SALLUM', 
        'REBECCA STEIN LAGUNA', 
        'RENATA CRISTINA GONCALVES THOMAZ', 
        'RICARDO ISSAO KIMURA', 
        'RICARDO JOSE FERNANDES', 
        'RICARDO PAVANI ZAGO', 
        'RITA DE CASSIA FURTADO CORREA DA SILVA', 
        'ROBERTA QUEIJA CORERATO', 
        'ROBERTO CARLOS MAINARDI', 
        'ROGERIO FERNANDO DI IORIO', 
        'ROGERIO GALLO CALIGIURI', 
        'ROSANGELA JULIANI', 
        'ROSICLEA APARECIDA ANDRE', 
        'STEFANY DOS SANTOS GALVAO', 
        'SUELITON RAMOS GOMES BARBOZA', 
        'TALITA APARECIDA DE CASTRO', 
        'TATIANA BELTRAMIN RATTIN', 
        'TATIANA CRISTINA DE LIMA', 
        'TATIANE CARLA PALHARES CORDISCO', 
        'TATIANE LOURENÇO BORGES DO NASCIMENTO', 
        'THIAGO TRAVITZKI', 
        'VALCIR BATISTA VIEIRA', 
        'VANIA EDILAINE DE ZOTTI DE MORAES', 
        'VINICIUS DIAS VIANA', 
        'VIVIANA XAVIER STOIANOF TEIXEIRA DA SILVA', 
        'WELLINGTON FERNANDO DE OLIVEIRA MARTINS DE LIMA', 
        'WILLIAM DE ANGELO'
      ]);
    }, 500);
  });
};

