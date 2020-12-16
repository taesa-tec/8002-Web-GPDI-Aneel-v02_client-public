import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@app/services/app.service';
import { CaptacaoEtapa, CaptacaoEtapaText } from '../commons';
import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { CriarCaptacaoComponent } from '../shared/criar-captacao/criar-captacao.component';
import { EnviarSelecaoComponent } from '../shared/enviar-selecao/enviar-selecao.component';
import { Pagination } from '@app/commons/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-projetos-captacao-list',
  templateUrl: './projetos-captacao-list.component.html',
  styleUrls: ['./projetos-captacao-list.component.scss']
})
export class ProjetosCaptacaoListComponent implements OnInit {

  captacaoEtapa: CaptacaoEtapa;
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [];
  buttons: TableComponentActions = [];

  filters: Array<TableComponentFilter> = [];

  captacoes: Pagination<any> = {
    perPage: 0,
    page: 0,
    totalItems: 0,
    data: [],
    totalPages: 0
  };

  // REMOVER
  data: any;
  //========

  constructor(
    protected route: ActivatedRoute,
    protected app: AppService,
    protected modal: NgbModal
  ) { }

  async ngOnInit() {
    this.captacaoEtapa = this.route.snapshot.data.captacaoEtapaStatus;
    this.createTable();

    // REMOVER
    await this.getData(20);
    //=====================
    this.gotoPage().then();

    // Projetos
    this.filters.push({
      field: "titulo",
      options: [
        {text: " Todos os Projetos", value: ""},
        ...uniqBy(this.data.captacoesAll, 'titulo').map((v: any) => ({text: v.titulo, value: v.titulo}))
      ],
      value: ""
    });
  }

  async createTable() {
    this.cols = this.createColumns();
    this.buttons = this.createButtons();
  }

  createColumns() {
    switch(this.captacaoEtapa) {
      case CaptacaoEtapa.Pendente:
        return [
          {field: 'titulo', title: 'Título Resumido Projeto', order: true},
          {field: 'elaborado', title: 'Elaborado por', order: true},
          {field: 'tema', title: 'Tema', order: true},
          {field: 'dataAprovacao', title: 'Data Aprovação Demanda', order: true},
        ];

      case CaptacaoEtapa.EmElaboracao:
        return [
          {field: 'titulo', title: 'Título Resumido Projeto', order: true},
          {field: 'equipeSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
          {field: 'tema', title: 'Tema', order: true},
          {field: 'dataEnvioCaptacao', title: 'Data Envio para Captação Demanda', order: true},
        ];

      case CaptacaoEtapa.Aberta:
        return [
          {field: 'titulo', title: 'Título Resumido Projeto', order: true},
          {field: 'equipeSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
          {field: 'fornecedores', title: 'Fornecedores', order: true, value: ({fornecedores}) => this.formatLine(fornecedores)},
          {field: 'dataTerminoCaptacao', title: 'Data Término Captação', order: true},
        ];

      case CaptacaoEtapa.Encerrada:
        return [
          {field: 'titulo', title: 'Título Resumido Projeto', order: true},
          {field: 'equipeSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
          {field: 'fornecedores', title: 'Fornecedores', order: true, value: ({fornecedores}) => this.formatLine(fornecedores)},
          {field: 'dataTerminoCaptacao', title: 'Data Término Captação', order: true},
        ];

      case CaptacaoEtapa.Cancelada:
        return [
          {field: 'titulo', title: 'Título Resumido Projeto', order: true},
          {field: 'equipeSuprimento', title: 'Equipe de Suprimentos Usuário Designado', order: true},
          {field: 'fornecedores', title: 'Fornecedores', order: true, value: ({fornecedores}) => this.formatLine(fornecedores)},
          {field: 'dataTerminoCaptacao', title: 'Data Término Captação', order: true},
          {field: 'dataCancelamentoCaptacao', title: 'Data de Cancelamento', order: true},
        ];
    }
  }

  createButtons() {
    if(this.captacaoEtapa == CaptacaoEtapa.Pendente) {
      return [
        {action: 'criar-captacao', text: 'CRIAR CAPTAÇÃO', icon: 'ta-edit', className: 'btn btn-primary'}
      ];

    } else if(this.captacaoEtapa == CaptacaoEtapa.Aberta) {
      return [
        {action: 'ver-detalhes', text: 'VER DETALHES', icon: 'ta-edit', className: 'btn btn-primary'}
      ];

    } else if(this.captacaoEtapa == CaptacaoEtapa.Encerrada) {
      return [
        {action: 'enviar-para-selecao', text: 'ENVIAR PARA SELEÇÃO', icon: 'ta-edit', className: 'btn btn-primary'}
      ];
    }
  }

  tableAction(values) {
    if(this.captacaoEtapa == CaptacaoEtapa.Pendente) {
      this.actionPendente(values);

    } else if(this.captacaoEtapa == CaptacaoEtapa.Aberta) {
      this.actionAberta(values);

    } else if(this.captacaoEtapa == CaptacaoEtapa.Encerrada) {
      this.actionEncerrada(values);
    }
  }

  actionPendente({action, data}){
    if (action === 'criar-captacao') {
      const modalRef = this.modal.open(CriarCaptacaoComponent, {size: 'lg'});
      modalRef.componentInstance.projeto = data;
    }
  }

  actionAberta({action, data}){
    // Redirecionar para outra tela
    console.log(data);
  }

  actionEncerrada({action, data}){
    if (action === 'enviar-para-selecao') {
      const modalRef = this.modal.open(EnviarSelecaoComponent, {size: 'lg'});
      modalRef.componentInstance.projeto = data;
    }
  }

  formatLine(fornecedores) {
    const { status, convidados, propostas } = fornecedores;

    return `
          <div>${convidados} Convidados</div>
          <div class="${propostas ? 'text-verde-claro':'text-red'}">
            ${propostas} propostas recebidas
          </div>
    `;
  }

  setCurrentData() {
    let filtered_data = this.data.captacoesAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.captacoesAll.length) {
      this.captacoes.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.captacoes = await this.getCaptacoes(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const captacoes = await this._getCaptacoes(CaptacaoEtapaText[this.captacaoEtapa]);

    this.data = {
      captacoesAll: captacoes,
      captacoes: chunk(captacoes, perPage),
      perPage: perPage
    };
  }

  getCaptacoes(page) {
    return {
      data: this.data.captacoes[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.captacoesAll.length,
      totalPages: this.data.captacoes.length
    };
  }
  //==================================================

  _getCaptacoes(data) {
    switch(data){
      case 'pendente':
        return [
          {
            id: 1,
            titulo: "Análise Automática de Ocorrências",
            elaborado: "André Moraes",
            equipeSuprimento: "Maria do Nascimento",
            fornecedores: null,
            tema: "SE04",
            dataAprovacao: "25/01/2020",
            dataEnvioCaptacao: null,
            dataTerminoCaptacao: null,
            dataCancelamentoCaptacao: null,
            status: "pendente"
          },
          {
            id: 2,
            titulo: "Análise Automática de Ocorrências 2",
            elaborado: "Paulo dos Santos",
            equipeSuprimento: "Maria do Nascimento",
            fornecedores: null,
            tema: "SE05",
            dataAprovacao: "15/03/2020",
            dataEnvioCaptacao: null,
            dataTerminoCaptacao: null,
            dataCancelamentoCaptacao: null,
            status: "pendente"
          }
        ];
      case 'elaboracao':
       return [
        {
          id: 4,
          titulo: "Análise Automática de Ocorrências 3",
          elaborado: "Maria do Nascimento",
          equipeSuprimento: "Maria do Nascimento",
          fornecedores: null,
          tema: "SE06",
          dataAprovacao: "10/04/2020",
          dataEnvioCaptacao: "25/01/2020",
          dataTerminoCaptacao: null,
          dataCancelamentoCaptacao: null,
          status: "elaboracao"
        },
        {
          id: 5,
          titulo: "Análise Automática de Ocorrências 3",
          elaborado: "Maria do Nascimento",
          equipeSuprimento: "Maria do Nascimento",
          fornecedores: null,
          tema: "SE06",
          dataAprovacao: "10/04/2020",
          dataEnvioCaptacao: "15/03/2020",
          dataTerminoCaptacao: null,
          dataCancelamentoCaptacao: null,
          status: "elaboracao"
        }
       ];
      case 'aberta':
        return [
          {
            id: 7,
            titulo: "Análise Automática de Ocorrências 3",
            elaborado: "Maria do Nascimento",
            equipeSuprimento: "Maria do Nascimento",
            fornecedores: {
              convidados: 4,
              propostas: 0
            },
            tema: "SE06",
            dataAprovacao: "10/04/2020",
            dataEnvioCaptacao: "10/04/2020",
            dataTerminoCaptacao: "10/04/2020",
            dataCancelamentoCaptacao: null,
            status: "aberta"
          },
          {
            id: 8,
            titulo: "Análise Automática de Ocorrências 3",
            elaborado: "Maria do Nascimento",
            equipeSuprimento: "Maria do Nascimento",
            fornecedores: {
              convidados: 5,
              propostas: 1
            },
            tema: "SE06",
            dataAprovacao: "10/04/2020",
            dataEnvioCaptacao: "10/04/2020",
            dataTerminoCaptacao: "10/04/2020",
            dataCancelamentoCaptacao: null,
            status: "aberta"
          }
        ] ;
      case 'encerrada':
        return [
          {
            id: 10,
            titulo: "Análise Automática de Ocorrências 3",
            elaborado: "Maria do Nascimento",
            equipeSuprimento: "Maria do Nascimento",
            fornecedores: {
              convidados: 4,
              propostas: 2
            },
            tema: "SE06",
            dataAprovacao: "10/04/2020",
            dataEnvioCaptacao: "10/04/2020",
            dataTerminoCaptacao: "10/04/2020",
            dataCancelamentoCaptacao: null,
            status: "encerrada"
          },
          {
            id: 11,
            titulo: "Análise Automática de Ocorrências 3",
            elaborado: "Maria do Nascimento",
            equipeSuprimento: "Maria do Nascimento",
            fornecedores: {
              convidados: 4,
              propostas: 0
            },
            tema: "SE06",
            dataAprovacao: "10/04/2020",
            dataEnvioCaptacao: "10/04/2020",
            dataTerminoCaptacao: "10/04/2020",
            dataCancelamentoCaptacao: null,
            status: "encerrada"
          }
        ];
      case 'cancelada':
        return [
          {
            id: 13,
            titulo: "Análise Automática de Ocorrências 3",
            elaborado: "Maria do Nascimento",
            equipeSuprimento: "Maria do Nascimento",
            fornecedores: {
              convidados: 8,
              propostas: 4
            },
            tema: "SE06",
            dataAprovacao: "10/04/2020",
            dataEnvioCaptacao: "10/04/2020",
            dataTerminoCaptacao: "10/04/2020",
            dataCancelamentoCaptacao: "10/02/2020",
            status: "cancelada"
          }
        ];
    }
  }

}
