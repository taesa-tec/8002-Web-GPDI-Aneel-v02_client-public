export interface RelatorioFinal {
  id: number;
  projetoId: number;
  isProdutoAlcancado: boolean;
  tecnicaProduto: string;
  isTecnicaImplementada: boolean;
  tecnicaImplementada: string;
  isAplicabilidadeAlcancada: boolean;
  aplicabilidadeJustificativa: string;
  resultadosTestes: string;
  abrangenciaProduto: string;
  ambitoAplicacaoProduto: string;
  transferenciaTecnologica: string;
}

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

export interface RelatorioEtapa {
  id: number;
  projetoId: number;
  etapaId: number;
  etapa: {
    id: number;
    projetoId: number;
    produtoId: number;
    produto: string;
    ordem: number;
    meses: Array<number>;
    descricaoAtividades: string;
  }
  atividadesRealizadas: string;
  hasAtividadeCadastrada: boolean;
  inicio: string;
  fim: string;
}

export interface PropriedadeIntelectual {
  id: number;
  projetoId: number;
  tipo: string;
  pedidoData: string;
  pedidoNumero: string;
  tituloINPI: string;
  inventores: Array<number>;
  depositantes: Array<Depositante>;
}

export interface Depositante {
  empresaId: number;
  coExecutorId: number;
  porcentagem: number;
}