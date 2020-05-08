import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '@app/services/app.service';
import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/shared/app-components/table/table';
import { RiscoFormComponent } from './risco-form/risco-form.component';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es'; 

@Component({
  selector: 'app-riscos',
  templateUrl: './riscos.component.html',
  styleUrls: ['./riscos.component.scss']
})
export class RiscosComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'item',
      title: 'Item',
      order: true,
    },
    {
      field: 'classificacao',
      title: 'Classificação',
      order: true,
    },
    {
      field: 'probabilidade',
      title: 'Probabilidade',
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

  riscos: Pagination<any> = {
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
    private app: AppService,
    private modal: NgbModal
  ) { }

  async ngOnInit() {
    // REMOVER
    await this.getData(20);
    //=====================
    this.gotoPage().then();

    // Classificação
    this.filters.push({
      field: "classificacao", 
      options: [
        {text: " Todas as Classificações", value: ""},
        ...uniqBy(this.data.riscosAll, 'classificacao').map((v: any) => ({text: v.classificacao, value: v.classificacao}))
      ],
      value: ""
    });

    // Probabilidade
    this.filters.push({
      field: "probabilidade", 
      options: [
        {text: " Todas as Probabilidades", value: ""},
        ...uniqBy(this.data.riscosAll, 'probabilidade').map((v: any) => ({text: v.probabilidade, value: v.probabilidade}))
      ],
      value: ""
    }); 
  }

  async tableAction({ action, data }) {
    if (action === 'editar') {
      await this.salvarRisco(data);
    }
  }

  setCurrentData() {
    let filtered_data = this.data.riscosAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.riscosAll.length) {
      this.riscos.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.riscos = await this.getRiscos(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  async salvarRisco(risco?: any) {
    const modalRef = this.modal.open(RiscoFormComponent, {size: 'lg'});
    modalRef.componentInstance.risco = risco;

    try {
      await modalRef.result;
      //this.getRiscos();
    } catch(e) {
      console.log(e);
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const riscos = await this._getRiscos();

    this.data = {
      riscosAll: riscos,
      riscos: chunk(riscos, perPage),
      perPage: perPage
    };
  }

  getRiscos(page) {
    return {
      data: this.data.riscos[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.riscosAll.length,
      totalPages: this.data.riscos.length
    };
  }
  //==================================================

  _getRiscos() {
    return [
      {
        id: 1,
        item: 'Título do Risco',
        classificacao: 'Técnico/Científico',
        probabilidade: 'Alto',
        justificativa: 'Justificative'
      },
      {
        id: 2,
        item: 'Título do Risco 2',
        classificacao: 'Financeiro',
        probabilidade: 'Médio',
        justificativa: 'Justificative 2'
      },
      {
        id: 3,
        item: 'Título do Risco  3',
        classificacao: 'Atraso no Cronograma',
        probabilidade: 'Baixo',
        justificativa: 'Justificative 3'
      },
    ]
  }

}
