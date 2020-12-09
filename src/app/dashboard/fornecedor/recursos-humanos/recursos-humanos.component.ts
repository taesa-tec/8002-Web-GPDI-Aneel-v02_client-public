import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { RecursoHumanoFormComponent } from './recurso-humano-form/recurso-humano-form.component';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
  styleUrls: ['./recursos-humanos.component.scss']
})
export class RecursosHumanosComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'nome',
      title: 'Nome',
      order: true,
    },
    {
      field: 'empresa',
      title: 'Empresa',
      order: true,
    },
    {
      field: 'funcao',
      title: 'Função',
      order: true,
    },
    {
      field: 'titulacao',
      title: 'Titulação',
      order: true,
    }
  ];

  buttons: TableComponentActions = [
    {
      action: 'editar',
      text: 'EDITAR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];

  filters: Array<TableComponentFilter> = [];

  recursosHumanos: Pagination<any> = {
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
    private modal: NgbModal
  ) { }

  async ngOnInit() {
    // REMOVER
    await this.getData(20);
    //=====================
    this.gotoPage().then();

    // Função
    this.filters.push({
      field: "funcao",
      options: [
        {text: " Todas as Funções", value: ""},
        ...uniqBy(this.data.recursosHumanosAll, 'funcao').map((v: any) => ({text: v.funcao, value: v.funcao}))
      ],
      value: ""
    });

    // Titulação
    this.filters.push({
      field: "titulacao",
      options: [
        {text: " Todas as Titulações", value: ""},
        ...uniqBy(this.data.recursosHumanosAll, 'titulacao').map((v: any) => ({text: v.titulacao, value: v.titulacao}))
      ],
      value: ""
    });
  }

  async tableAction({ action, data }) {
    if (action === 'editar') {
      await this.salvarRecurso(data);
    }
  }

  setCurrentData() {
    let filtered_data = this.data.recursosHumanosAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.recursosHumanosAll.length) {
      this.recursosHumanos.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.recursosHumanos = await this.getRecursosHumanos(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  async salvarRecurso(recursoHumano?: any) {
    const modalRef = this.modal.open(RecursoHumanoFormComponent, {size: 'lg'});
    modalRef.componentInstance.recursoHumano = recursoHumano;

    try {
      await modalRef.result;
      //this.getResursosHumanos();
    } catch(e) {
      console.log(e);
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const recursosHumanos = await this._getRecursosHumanos();

    this.data = {
      recursosHumanosAll: recursosHumanos,
      recursosHumanos: chunk(recursosHumanos, perPage),
      perPage: perPage
    };
  }

  getRecursosHumanos(page) {
    return {
      data: this.data.recursosHumanos[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.recursosHumanosAll.length,
      totalPages: this.data.recursosHumanos.length
    };
  }
  //==================================================

  _getRecursosHumanos() {
    return [
      {
        id: 1,
        empresa: 'Ivision Sistemas de Imagem e Visão S.A',
        valorHora: 10.00,
        nome: 'Frederico Souto dos Santos',
        titulacao: 'Doutor',
        funcao: 'Coodernador',
        brasileiro: true,
        cpf: '12345678909',
        curriculoLattes: 'http//www.currico.com.br'
      },
      {
        id: 2,
        empresa: 'TAESA (7527)',
        valorHora: 25.00,
        nome: 'André dos Santos',
        titulacao: 'Doutor',
        funcao: 'Diretor',
        brasileiro: true,
        cpf: '12345678909',
        curriculoLattes: 'http//www.currico.com.br'
      }
    ]
  }

}
