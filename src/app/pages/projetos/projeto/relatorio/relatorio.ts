export interface Apoio {
  id: number;
  projetoId: number;
  tipo: string;
  cnpjReceptora: string;
  laboratorio: string;
  laboratorioArea: string;
  materiaisEquipamentos: string;
}

export interface Capacitacao {
  id: number;
  projetoId: number;
  recursoId: number;
  tipo: string;
  isConcluido: boolean;
  dataConclusao: string;
  cnpjInstituicao: string;
  areaPesquisa: string;
  tituloTrabalhoOrigem: string;
  arquivoTrabalhoOrigemId: number;
}

export interface ProducaoCientifica {
  id: number;
  projetoId: number;
  tipo: string;
  dataPublicacao: string;
  confirmacaoPublicacao: boolean;
  nomeEventoPublicacao: string;
  linkPublicacao: string;
  paisId: number;
  cidade: string;
  tituloTrabalho: string;
  arquivoTrabalhoOrigemId: number;
}

export interface IndicadorEconomico {
  id: number;
  projetoId: number;
  tipo: string;
  beneficio: string;
  unidadeBase: string;
  valorNumerico: number;
  porcentagemImpacto: number;
  valorBeneficio: number;
}

export interface Socioambiental {
  id: number;
  projetoId: number;
  tipo: string;
  resultadoPositivo: boolean;
  descricaoResultado: string;
}
