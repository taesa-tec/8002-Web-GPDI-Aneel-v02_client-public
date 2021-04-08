import {TableComponentActions, TableComponentCols} from '@app/core/components/table/table';
import {DatePipe} from '@angular/common';

export enum CaptacaoEtapa {
  Pendente,
  EmElaboracao,
  Aberta,
  Encerrada,
  Cancelada
}

const templatePropostas = item => {
  try {
    const className = item.totalPropostas > 0 ? 'text-success' : 'text-danger';
    return `<div>\${totalConvidados} Convidados</div><div class="${className}">\${totalPropostas} propostas recebidas</div>`;
  } catch (e) {
    console.error(e);
    return '';
  }
};

export const CaptacaoCols: { [prop: string]: TableComponentCols } = {
  Pendente: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'criador', title: 'Elaborado por', order: true},
    {
      field: 'aprovacao',
      title: 'Data Aprovação Demanda',
      order: true,
      type: 'ng-pipe',
      pipe: new DatePipe('pt-BR'),
      value: item => [item.aprovacao, 'short']
    },
  ],

  EmElaboracao: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'usuarioSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {
      field: 'envioCaptacao',
      title: 'Data Envio para Captação Demanda',
      order: true,
      type: 'ng-pipe',
      pipe: new DatePipe('pt-BR'),
      value: item => [item.envioCaptacao, 'short']
    },
  ],

  Aberta: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'usuarioSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {
      field: 'fornecedores', title: 'Fornecedores', order: true, type: 'template',
      value: item => item,
      template: templatePropostas,
    },
    {
      field: 'termino', title: 'Data Término Captação', order: true,
      pipe: new DatePipe('pt-BR'),
      value: item => [item.termino, 'shortDate']
    },
  ],

  Encerrada: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'usuarioSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {field: 'convidadosTotal', title: 'Fornecedores', order: true},
    {
      field: 'termino', title: 'Data Término Captação', order: true,
      type: 'ng-pipe',
      pipe: new DatePipe('pt-BR'),
      value: item => [item.termino, 'shortDate']
    },
  ],

  Cancelada: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'usuarioSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {
      field: 'termino', title: 'Data Término Captação', order: true, type: 'ng-pipe',
      pipe: new DatePipe('pt-BR'),
      value: item => [item.termino, 'shortDate']
    },
    {
      field: 'cancelamento', title: 'Data de Cancelamento', order: true, type: 'ng-pipe',
      pipe: new DatePipe('pt-BR'),
      value: item => [item.cancelamento, 'shortDate']
    },
  ],
  SelecaoPendente: [
    {field: 'titulo', title: 'Título', order: true},
    {field: 'propostasRecebidas', title: 'Propostas Recebidas', order: true},
  ]
};

export const CaptacaoButtons: { [prop: string]: TableComponentActions } = {
  Pendente: [{action: 'criar', text: 'CRIAR CAPTAÇÃO', icon: 'ta-edit', className: 'btn btn-primary'}],
  EmElaboracao: [{action: '${id}', text: 'Configurar', isLink: true, icon: 'ta-edit', className: 'btn btn-primary'}],
  Aberta: [],
  Encerrada: [{action: 'enviar', text: 'ENVIAR PARA SELEÇÃO', icon: 'ta-edit', className: 'btn btn-primary'}],
  Cancelada: [],
  SelecaoPendente: [{action: 'selecao', text: 'Confirmar seleção', icon: 'ta-edit', className: 'btn btn-primary'}],
};

export interface CaptacaoDetalhes {
  id: number;
  titulo: string;
  status: string;
  finalizada: boolean;
  especificacaoTecnicaUrl: string;
  arquivos: CaptacaoArquivo[];
  fornecedoresSugeridos: FornecedorCaptacao[];
  fornecedoresConvidados: FornecedorCaptacao[];
  observacoes: string;
  consideracoes: string;
  termino: string;
  contratoSugeridoId: number;
  contratoSugerido: null;
  contratoId: number;
  contrato: null;
}

export interface FornecedorCaptacao {
  nome: string;
  cnpj: string;
  responsavelId: string;
  responsavelNome: null;
  responsavelEmail: null;
  ativo: boolean;
  coExecutores: any[];
  id: number;
}

export interface CaptacaoArquivo {
  id: number;
  userId: string;
  user: null;
  size: number;
  name: string;
  uri: string;
  fileName: string;
  contentType: string;
  createdAt: Date;
  acessoFornecedor: boolean;
  captacaoId: number;
}
