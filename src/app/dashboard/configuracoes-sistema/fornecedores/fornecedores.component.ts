import { Component, OnInit } from '@angular/core';

import { AppService } from '@app/services/app.service';
import { TableComponentActions, TableComponentCols, TableComponentFilter } from '@app/core/shared/app-components/table/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es'; 


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'nome',
      title: 'Nome Fornecedor',
      order: true
    },
    {
      field: 'nomeResponsavel',
      title: 'Nome Usuário Responsável',
      order: true
    },
    {
      field: 'status',
      title: 'Status',
      order: true
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

  fornecedores: Pagination<any> = {
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
    protected app: AppService,
    protected modal: NgbModal
  ) { }

  async ngOnInit() {
    // REMOVER
    await this.getData(20);
    //=====================
    this.gotoPage().then();

    // Fornecedores
    this.filters.push({
      field: "nome", 
      options: [
        {text: " Todos os Fornecedores", value: ""},
        ...uniqBy(this.data.fornecedoresAll, 'nome').map((v: any) => ({text: v.nome, value: v.nome}))
      ],
      value: ""
    });

    // Status
    this.filters.push({
      field: "status", 
      options: [
        {text: " Todos os Status", value: ""},
        {text: "Ativo", value: "Ativo"},
        {text: "Desativado", value: "Desativado"}
      ],
      value: ""
    });
  }

  async tableAction({action, data}) {
    if(action === 'editar') {
      await this.salvarFornecedor(data);
    }
  }

  setCurrentData() {
    let filtered_data = this.data.fornecedoresAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.fornecedoresAll.length) {
      this.fornecedores.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.fornecedores = await this.getFornecedores(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  async salvarFornecedor(fornecedor?: any) {
    const modalRef = this.modal.open(FornecedorFormComponent, {size: 'lg'});
    modalRef.componentInstance.fornecedor = fornecedor;
    
    try {
      await modalRef.result;
      
    } catch (e) {
      console.log(e);
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const fornecedores = await this._getFornecedores();

    this.data = {
      fornecedoresAll: fornecedores,
      fornecedores: chunk(fornecedores, perPage),
      perPage: perPage
    };
  }

  getFornecedores(page) {
    return {
      data: this.data.fornecedores[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.fornecedoresAll.length,
      totalPages: this.data.fornecedores.length
    };
  }
  //==================================================

  _getFornecedores() {
    return [
      {
        "id": "1",
        "nome": "Nome Fornecedor",
        "cnpj": "05.254.665/0001-45",
        "nomeResponsavel": "Nome Responsável",
        "emailResponsavel": "responsavel@gmail.com",
        "status": "Ativo"
      },
      {
        "id": "2",
        "nome": "Nome Fornecedor 2",
        "cnpj": "24.177.202/0001-71",
        "nomeResponsavel": "Nome Responsável",
        "emailResponsavel": "responsavel@gmail.com",
        "status": "Ativo"
      },
      {
        "id": "3",
        "nome": "Nome Fornecedor 3",
        "cnpj": "10.874.254/0001-92",
        "nomeResponsavel": "Nome Responsável 3",
        "emailResponsavel": "responsavel3@gmail.com",
        "status": "Desativado"
      }
    ];
  }
  
}
