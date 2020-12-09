import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { AlocarRecursoMaterialFormComponent } from './alocar-recurso-material-form/alocar-recurso-material-form.component';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-alocacao-recursos-materiais',
  templateUrl: './alocacao-recursos-materiais.component.html',
  styleUrls: ['./alocacao-recursos-materiais.component.scss']
})
export class AlocacaoRecursosMateriaisComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'recursoMaterial',
      title: 'Nome Recurso',
      order: true,
    },
    {
      field: 'categoriaContabil',
      title: 'Cat. Contábil',
      order: true,
    },
    {
      field: 'valorTotal',
      title: 'Valor Total',
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

  recursosMateriais: Pagination<any> = {
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

    // Recursos
    this.filters.push({
      field: "recursoMaterial",
      options: [
        {text: " Todos os Recursos", value: ""},
        ...uniqBy(this.data.recursosMateriaisAll, 'recursoMaterial').map((v: any) => ({text: v.recursoMaterial, value: v.recursoMaterial}))
      ],
      value: ""
    });

    // Categoria Contábil
    this.filters.push({
      field: "categoriaContabil",
      options: [
        {text: " Todas as Categorias", value: ""},
        ...uniqBy(this.data.recursosMateriaisAll, 'categoriaContabil').map((v: any) => ({text: v.categoriaContabil, value: v.categoriaContabil}))
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
    let filtered_data = this.data.recursosMateriaisAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.recursosMateriaisAll.length) {
      this.recursosMateriais.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.recursosMateriais = await this.getRecursosMateriais(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  async salvarRecurso(alocarRecurso?: any) {
    const modalRef = this.modal.open(AlocarRecursoMaterialFormComponent, {size: 'lg'});
    modalRef.componentInstance.alocarRecurso = alocarRecurso;

    try {
      await modalRef.result;
      //this.getResursosMateriais();
    } catch(e) {
      console.log(e);
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const recursosMateriais = await this._getRecursosMateriais();

    this.data = {
      recursosMateriaisAll: recursosMateriais,
      recursosMateriais: chunk(recursosMateriais, perPage),
      perPage: perPage
    };
  }

  getRecursosMateriais(page) {
    return {
      data: this.data.recursosMateriais[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.recursosMateriaisAll.length,
      totalPages: this.data.recursosMateriais.length
    };
  }
  //==================================================

  _getRecursosMateriais() {
    return [
      {
        id: 1,
        recursoMaterial: 'Compra  Laptop',
        categoriaContabil: 'Serviços de Terceiros',
        valorTotal: 'R$3.540,00',
        empresaFinanciadora: 'Empresa Financiadora 1',
        empresaRecebedora: 'Empresa Recebedora 1',
        etapa: 'Etapa 1',
        quantidade: '25',
        justificativa: 'Justificativa 1'
      },
      {
        id: 2,
        recursoMaterial: 'Despesas Aéreas',
        categoriaContabil: 'Materiais de Consumo',
        valorTotal: 'R$2.540,00',
        empresaFinanciadora: 'Empresa Financiadora 2',
        empresaRecebedora: 'Empresa Recebedora 2',
        etapa: 'Etapa 2',
        quantidade: '20',
        justificativa: 'Justificativa 2'
      }
    ]
  }

}
