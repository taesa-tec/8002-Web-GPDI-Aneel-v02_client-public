interface Arquivo {
  id: number;
  userId: string;
  size: number;
  name: string;
  uri: string;
  fileName: string;
  contentType: string;
  createdAt: Date;
  acessoFornecedor: boolean;
  captacaoId: number;
}

type CaptacaoStatus = 'Cancelada' | 'Pendente' | 'Elaboracao' | 'Fornecedor' | 'Encerrada' | 'Refinamento' | 'AnaliseRisco';

export interface Proposta {
  guid: string;
  captacao: string;
  captacaoStatus: CaptacaoStatus;
  fornecedorId: number;
  fornecedor: string;
  captacaoId: number;
  duracao: number;
  contratoFinalizado: boolean;
  planoFinalizado: boolean;
  dataCriacao?: Date;
  dataTermino?: Date;
  dataResposta?: Date;
  dataParticipacao?: Date;
  dataClausulasAceitas?: Date;
  participacao: 0 | 1 | 2 | 3;
  consideracoes: string;
  planoTrabalhoAprovacao: string;
  contratoAprovacao: string;
  arquivos: Arquivo[];
  id: number;
}


