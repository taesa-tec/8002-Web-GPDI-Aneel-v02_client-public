
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { CoExecutorFormComponent } from './co-executor-form/co-executor-form.component';
import { Pagination } from '@app/commons/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-co-executores',
  templateUrl: './co-executores.component.html',
  styleUrls: ['./co-executores.component.scss']
})
export class CoExecutoresComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'razaoSocial',
      title: 'Nome ou Razão Social',
      order: true,
    },
    {
      field: 'cnpj',
      title: 'CNPJ',
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

  coExecutores: Pagination<any> = {
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

    // Nome ou Razão Social
    this.filters.push({
      field: "razaoSocial",
      options: [
        {text: " Todos os Nome ou Razão Social", value: ""},
        ...uniqBy(this.data.coExecutoresAll, 'razaoSocial').map((v: any) => ({text: v.razaoSocial, value: v.razaoSocial}))
      ],
      value: ""
    });

    // CNPJ
    this.filters.push({
      field: "cnpj",
      options: [
        {text: " Todos os CNPJ", value: ""},
        ...uniqBy(this.data.coExecutoresAll, 'cnpj').map((v: any) => ({text: v.cnpj, value: v.cnpj}))
      ],
      value: ""
    });
  }

  async tableAction({ action, data }) {
    if (action === 'editar') {
      await this.salvarCoExecutor(data);
    }
  }

  setCurrentData() {
    let filtered_data = this.data.coExecutoresAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.coExecutoresAll.length) {
      this.coExecutores.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.coExecutores = await this.getCoExecutores(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  async salvarCoExecutor(coExecutor?: any) {
    const modalRef = this.modal.open(CoExecutorFormComponent, {size: 'lg'});
    modalRef.componentInstance.coExecutor = coExecutor;

    try {
      await modalRef.result;

    } catch(e) {
      console.log(e);
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const coExecutores = await this._getCoExecutores();

    this.data = {
      coExecutoresAll: coExecutores,
      coExecutores: chunk(coExecutores, perPage),
      perPage: perPage
    };
  }

  getCoExecutores(page) {
    return {
      data: this.data.coExecutores[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.coExecutoresAll.length,
      totalPages: this.data.coExecutores.length
    };
  }
  //==================================================

  _getCoExecutores() {
    return [
      {
        id: 1,
        cnpj: '82.013.271/0001-46',
        uf: 'RJ',
        razaoSocial: 'Nome Razao Social 1',
        contrato: 'Contrato 1',
      },
      {
        id: 2,
        cnpj: '62.669.391/0001-99',
        uf: 'SP',
        razaoSocial: 'Nome Razao Social 2',
        contrato: 'Contrato 2',
      }
    ]
  }

}
