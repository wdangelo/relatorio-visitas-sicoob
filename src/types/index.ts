// Tipos para o formulário de relatório de visitas Sicoob

export interface FormData {
  // Informações do Cooperado
  nome: string
  email: string
  cargo: string
  eCooperado: string;
  cpfCnpj: string;
  pa: string;
  gerenteRelacionamento: string;
  nomeRazaoSocial: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
  municipio: string;
  dataNascimentoConstituicao: string;
  rendaFaturamento: string;
  aplicacoes: string;
  capitalSocial: string;
  telefone: string;
  site: string;
  formaGestao: string;
  patrimonio: string;
  tipoImovel: string;
  alteracaoSocios: string;
  descricaoAlteracaoSocios: string;

  // Informações Bancárias
  bancos: BancoInfo[];

  // Informações da Visita
  dataVisita: string;
  participantes: string[];
  objetivoVisita: string;
  visitaEnderecoRegistrado: string;
  enderecoVisita: string;
  atividadesExercidas: string;
  numeroFuncionarios: string;
  estadoFisicoVisual: string;

  // Fotos e Anexos
  fotosFachada: File[];
  fotosInterior: File[];
  fotosEstoque: File[];
  fotosOutros: File[];
  observacoes: string;
}

export interface BancoInfo {
  id: string;
  banco: string;
  responsabilidadeTotal: string;
  previdencia: boolean;
  aplicacoes: boolean;
  cobranca: boolean;
  seguros: boolean;
}

export interface Banco {
  codigo: string;
  nome: string;
}

export interface Estado {
  sigla: string;
  nome: string;
}

export interface Municipio {
  nome: string;
}

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface Message {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
}

