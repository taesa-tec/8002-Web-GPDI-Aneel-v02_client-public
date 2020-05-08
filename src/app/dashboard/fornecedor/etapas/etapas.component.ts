import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/shared/app-components/table/table';
import { Component, OnInit } from '@angular/core';
import { EtapaFormComponent } from './etapa-form/etapa-form.component';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es'; 

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'etapa',
      title: 'Etapas',
      order: true,
    },
    {
      field: 'mesInicial',
      title: 'Mês Inicial',
      order: true,
    },
    {
      field: 'mesFinal',
      title: 'Mês Final',
      order: true,
    }
  ];

  buttons: TableComponentActions = [
    {
      action: 'excluir',
      text: 'EXCLUIR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];

  filters: Array<TableComponentFilter> = [];

  etapas: Pagination<any> = {
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

    // Etapa
    this.filters.push({
      field: "etapa", 
      options: [
        {text: " Todas as Etapas", value: ""},
        ...uniqBy(this.data.etapasAll, 'etapa').map((v: any) => ({text: v.etapa, value: v.etapa}))
      ],
      value: ""
    });
  }

  tableAction({ action, data }) {
    if (action === 'excluir') {
      console.log(data, 'excluir');
    }
  }

  setCurrentData() {
    let filtered_data = this.data.etapasAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.etapasAll.length) {
      this.etapas.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.etapas = await this.getEtapas(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  async salvarEtapa(etapa?: any) {
    const modalRef = this.modal.open(EtapaFormComponent, {size: 'lg'});

    try {
      await modalRef.result;
      //this.getEtapas();
    } catch(e) {
      console.log(e);
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const etapas = await this._getEtapas();

    this.data = {
      etapasAll: etapas,
      etapas: chunk(etapas, perPage),
      perPage: perPage
    };
  }

  getEtapas(page) {
    return {
      data: this.data.etapas[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.etapasAll.length,
      totalPages: this.data.etapas.length
    };
  }
  //==================================================

  _getEtapas() {
    return [
      {
        id: 1,
        etapa: 'Etapa 1',
        mesInicial: '01',
        mesFinal: '06',
        produtosAssociados: [
          { nome: 'Produto 1' },
          { nome: 'Produto 2' }
        ],
        descricao: 'Descricao'
      },
      {
        id: 2,
        etapa: 'Etapa 2',
        mesInicial: '07',
        mesFinal: '12',
        produtosAssociados: [
          { nome: 'Produto 3' },
          { nome: 'Produto 4' }
        ],
        descricao: 'Descricao 1'
      }
    ]
  }

}
