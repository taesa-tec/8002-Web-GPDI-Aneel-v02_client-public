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

export interface Proposta {
  guid: string;
  captacao: string;
  dataCriacao?: Date;
  dataTermino?: Date;
  dataResposta?: Date;
  dataClausulasAceitas?: Date;
  duracao: number;
  fornecedorId: number;
  fornecedor: string;
  captacaoId: number;
  // 0
  participacao: 0 | 1 | 2 | 3;
  planoFinalizado: boolean;
  consideracoes: string;
  arquivos: Arquivo[];
  id: number;
}

