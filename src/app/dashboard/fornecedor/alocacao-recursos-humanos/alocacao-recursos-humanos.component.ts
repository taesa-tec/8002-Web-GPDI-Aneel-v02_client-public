import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/shared/app-components/table/table';
import { AlocarRecursoHumanoFormComponent } from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es'; 

@Component({
  selector: 'app-alocacao-recursos-humanos',
  templateUrl: './alocacao-recursos-humanos.component.html',
  styleUrls: ['./alocacao-recursos-humanos.component.scss']
})
export class AlocacaoRecursosHumanosComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'recursoHumano',
      title: 'Nome',
      order: true,
    },
    {
      field: 'etapa',
      title: 'Etapa',
      order: true,
    },
    {
      field: 'empresaFinanciadora',
      title: 'Empresa Financiadora',
      order: true,
    },
    {
      field: 'valor',
      title: 'Valor',
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

    // Etapa
    this.filters.push({
      field: "etapa", 
      options: [
        {text: " Todas as Etapas", value: ""},
        ...uniqBy(this.data.recursosHumanosAll, 'etapa').map((v: any) => ({text: v.etapa, value: v.etapa}))
      ],
      value: ""
    });

    // Empresa Financiadora
    this.filters.push({
      field: "empresaFinanciadora", 
      options: [
        {text: " Todas as Empresas", value: ""},
        ...uniqBy(this.data.recursosHumanosAll, 'empresaFinanciadora').map((v: any) => ({text: v.empresaFinanciadora, value: v.empresaFinanciadora}))
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

  async salvarRecurso(alocarRecurso?: any) {
    const modalRef = this.modal.open(AlocarRecursoHumanoFormComponent, {size: 'lg'});
    modalRef.componentInstance.alocarRecurso = alocarRecurso;

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
        recursoHumano: 'Frederico Souto dos Santos', 
        etapa: 'Etapa 1',
        empresaFinanciadora: 'Empresa Financiadora 1',
        valor: 'R$9.999,00',
        horasAlocadas: ['Max 160h', 'Max 160h', 'Max 160h', 'Max 160h', 'Max 160h', 'Max 160h'],
        justificativa: 'Justificativa 1'
      },
      {
        id: 2,
        recursoHumano: 'Carlos das Silva', 
        etapa: 'Etapa 2',
        empresaFinanciadora: 'Empresa Financiadora 2',
        valor: 'R$9.999,00',
        horasAlocadas: ['Max 160h', 'Max 160h', 'Max 160h', 'Max 160h', 'Max 160h', 'Max 160h'],
        justificativa: 'Justificativa 2'
      }
    ]
  }

}
