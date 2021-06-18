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
const templateCaptacao = item => {
  try {
    return `<div>\${convidadosTotal} Convidado(s)</div><div class="text-success">\${propostaTotal} proposta(s) recebida(s)</div>`;
  } catch (e) {
    console.error(e);
    return '';
  }
};
const statusMap = new Map([
  ['Cancelada', 'Cancelada'],
  ['Pendente', 'Pendente'],
  ['Elaboracao', 'Elaboração'],
  ['Fornecedor', 'Fornecedor'],
  ['Encerrada', 'Encerrada'],
  ['Refinamento', 'Refinamento'],
  ['AnaliseRisco', 'Analise de Risco'],
]);
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
      field: 'termino', title: 'Término Captação', order: true,
      pipe: new DatePipe('pt-BR'),
      value: item => [item.termino, 'shortDate']
    },
  ],

  Encerrada: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'usuarioSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {
      field: 'fornecedores', title: 'Fornecedores', order: true, type: 'template',
      value: item => item,
      template: templateCaptacao,
    },
    {
      field: 'termino', title: 'Término Captação', order: true,
      type: 'ng-pipe',
      pipe: new DatePipe('pt-BR'),
      value: item => [item.termino, 'shortDate']
    },
    {field: 'status', title: 'Status', order: true, value: i => statusMap.get(i.status) || 'Não definido!'},
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
      value: item => [item.cancelamento || item.termino, 'shortDate']
    },
  ],
  SelecaoPendente: [
    {field: 'titulo', title: 'Título', order: true},
    {field: 'propostasRecebidas', title: 'Propostas Recebidas', order: true},
  ],
  SelecaoFinalizada: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'proposta', title: 'Proposta Selecionada', order: true},
    {field: 'responsavel', title: 'Responsavel Refinamento', order: true},
    {
      field: 'dataAlvo', title: 'Data Alvo', order: true, type: 'ng-pipe',
      pipe: new DatePipe('pt-BR'),
      value: item => [item.dataAlvo, 'shortDate']
    }

  ],

  IdentificaoPendente: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'fornecedor', title: 'Fornecedor', order: true},
    {field: 'identificacaoRiscoResponsavel', title: 'Responsavel Identificação Riscos', order: true},
  ],
  IdentificaoFinalizada: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'fornecedor', title: 'Fornecedor', order: true},
    {field: 'aprovacaoResponsavel', title: 'Responsavel Aprovação e Formalização', order: true},
  ],
  FormalizacaoPendente: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'fornecedor', title: 'Fornecedor', order: true},
    {field: 'aprovacaoResponsavel', title: 'Responsavel Identificação Riscos', order: true},
  ],
  Formalizados: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'fornecedor', title: 'Fornecedor', order: true},
    {field: 'execucaoResponsavel', title: 'Responsavel Aprovação e Formalização', order: true},
  ],
  NoDeal: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'fornecedor', title: 'Fornecedor', order: true},
  ]
};

export const CaptacaoButtons: { [prop: string]: TableComponentActions } = {
  Pendente: [{action: 'criar', text: 'CRIAR CAPTAÇÃO', icon: 'ta-edit', className: 'btn btn-primary'}],
  EmElaboracao: [{action: '${id}', text: 'Configurar', isLink: true, icon: 'ta-edit', className: 'btn btn-primary'}],
  Aberta: [],
  Encerrada: [],
  Cancelada: [],
  SelecaoPendente: [{action: './#${id}', isLink: true, text: 'Confirmar seleção', icon: 'ta-edit', className: 'btn btn-primary'}],
  SelecaoFinalizada: [{action: './#${id}', isLink: true, text: 'Ver detalhes', icon: 'ta-eye', className: 'btn btn-primary'}],
  IdentificaoPendente: [{action: './#${id}', isLink: true, text: 'Confirmar Riscos', icon: 'ta-edit', className: 'btn btn-primary'}],
  IdentificaoFinalizada: [{action: './#${id}', isLink: true, text: 'Ver detalhes', icon: 'ta-edit', className: 'btn btn-primary'}],
  FormalizacaoPendente: [{action: './#${id}', isLink: true, text: 'Confirmar Formalização', icon: 'ta-edit', className: 'btn btn-primary'}],
  Formalizados: [{action: './#${id}', isLink: true, text: 'Ver detalhes', icon: 'ta-edit', className: 'btn btn-primary'}],
  NoDeal: [{action: './#${id}', isLink: true, text: 'Ver detalhes', icon: 'ta-edit', className: 'btn btn-primary'}],
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
