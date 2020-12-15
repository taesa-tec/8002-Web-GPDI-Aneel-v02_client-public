import {TableComponentCols} from '@app/core/components/table/table';
import {DatePipe} from '@angular/common';

export enum CaptacaoEtapa {
  Pendente,
  EmElaboracao,
  Aberta,
  Encerrada,
  Cancelada
}

export const CaptacaoCols: { [prop: string]: TableComponentCols } = {
  Pendente: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'criador', title: 'Elaborado por', order: true},
    {field: 'aprovacao', title: 'Data Aprovação Demanda', order: true, type: 'ng-pipe', pipe: new DatePipe('pt-BR'), value: item => [item.aprovacao, 'short']},
  ],

  EmElaboracao: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'usuarioSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {field: 'envioCaptacao', title: 'Data Envio para Captação Demanda', order: true, type: 'ng-pipe', pipe: new DatePipe('pt-BR'), value: item => [item.envioCaptacao, 'short']},
  ],

  Aberta: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'equipeSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {field: 'fornecedores', title: 'Fornecedores', order: true, value: ({fornecedores}) => this.formatLine(fornecedores)},
    {field: 'dataTerminoCaptacao', title: 'Data Término Captação', order: true},
  ],

  Encerrada: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'equipeSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {field: 'fornecedores', title: 'Fornecedores', order: true, value: ({fornecedores}) => this.formatLine(fornecedores)},
    {field: 'dataTerminoCaptacao', title: 'Data Término Captação', order: true},
  ],

  Cancelada: [
    {field: 'titulo', title: 'Título Resumido Projeto', order: true},
    {field: 'equipeSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
    {field: 'fornecedores', title: 'Fornecedores', order: true, value: ({fornecedores}) => this.formatLine(fornecedores)},
    {field: 'dataTerminoCaptacao', title: 'Data Término Captação', order: true},
    {field: 'dataCancelamentoCaptacao', title: 'Data de Cancelamento', order: true},
  ]
};

export const CaptacaoButtons = {
  Pendente: [{action: 'criar', text: 'CRIAR CAPTAÇÃO', icon: 'ta-edit', className: 'btn btn-primary'}],
  EmElaboracao: [],
  Aberta: [{action: 'ver', text: 'VER DETALHES', icon: 'ta-edit', className: 'btn btn-primary'}],
  Encerrada: [{action: 'enviar', text: 'ENVIAR PARA SELEÇÃO', icon: 'ta-edit', className: 'btn btn-primary'}],
  Cancelada: []
};
