import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { RecursoMaterialFormComponent } from './recurso-material-form/recurso-material-form.component';
import { Pagination } from '@app/commons/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-recursos-materiais',
  templateUrl: './recursos-materiais.component.html',
  styleUrls: ['./recursos-materiais.component.scss']
})
export class RecursosMateriaisComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'nome',
      title: 'Nome Recurso',
      order: true,
    },
    {
      field: 'entidadeRecebedora',
      title: 'Entidade Recebedora',
      order: true,
    },
    {
      field: 'valorUnitario',
      title: 'Valor Unitário',
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

    // Nome
    this.filters.push({
      field: "nome",
      options: [
        {text: " Todos os Recursos", value: ""},
        ...uniqBy(this.data.recursosMateriaisAll, 'nome').map((v: any) => ({text: v.nome, value: v.nome}))
      ],
      value: ""
    });

    // Entidade Recebedora
    this.filters.push({
      field: "entidadeRecebedora",
      options: [
        {text: " Todas as Entidade Recebedoras", value: ""},
        ...uniqBy(this.data.recursosMateriaisAll, 'entidadeRecebedora').map((v: any) => ({text: v.entidadeRecebedora, value: v.entidadeRecebedora}))
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

  async salvarRecurso(recursoMaterial?: any) {
    const modalRef = this.modal.open(RecursoMaterialFormComponent, {size: 'lg'});
    modalRef.componentInstance.recursoMaterial = recursoMaterial;

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
        nome: 'Compra  Laptop',
        categoriaContabil: 'Categoria 1',
        valorUnitario: 'R$3.540,00',
        entidadeRecebedora: 'Axxiom Soluções Tecnológicas S.A',
        especificacao: 'Recurso 1'
      },
      {
        id: 2 ,
        nome: 'Almoço',
        categoriaContabil: 'Categoria 2',
        valorUnitario: 'R$2.540,00',
        entidadeRecebedora: 'Não Definido',
        especificacao: 'Recurso 2'
      },
    ]
  }

}
