import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '@app/services/app.service';
import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { Pagination } from '@app/commons/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-validacao-contratos',
  templateUrl: './validacao-contratos.component.html',
  styleUrls: ['./validacao-contratos.component.scss']
})
export class ValidacaoContratosComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'titulo',
      title: 'Listagem Contratos',
      order: true,
    },
    {
      field: 'empresaRelacionada',
      title: 'Empresa Relacionada',
      order: true,
    },
    {
      field: 'status',
      title: 'Status',
      order: true,
    }
  ];

  buttons: TableComponentActions = [
    {
      action: 'ver-detalhes',
      text: 'VER DETALHES',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];

  filters: Array<TableComponentFilter> = [];

  contratos: Pagination<any> = {
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
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    // REMOVER
    await this.getData(2);
    //=====================
    this.gotoPage().then();

    // Listagem Contratos
    this.filters.push({
      field: "titulo",
      options: [
        {text: " Todos os Contratos", value: ""},
        ...uniqBy(this.data.contratosAll, 'titulo').map((v: any) => ({text: v.titulo, value: v.titulo}))
      ],
      value: ""
    });

    // Empresa
    this.filters.push({
      field: "empresaRelacionada",
      options: [
        {text: " Todas as Empresa", value: ""},
        ...uniqBy(this.data.contratosAll, 'empresaRelacionada').map((v: any) => ({text: v.empresaRelacionada, value: v.empresaRelacionada}))
      ],
      value: ""
    });
  }

  tableAction({ action, data }) {
    if (action === 'ver-detalhes') {
      this.app.router.navigate(['../', data.id], { relativeTo: this.route });
    }
  }

  setCurrentData() {
    let filtered_data = this.data.contratosAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.contratosAll.length) {
      this.contratos.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.contratos = await this.getContratos(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const contratos = await this._getContratos();

    this.data = {
      contratosAll: contratos,
      contratos: chunk(contratos, perPage),
      perPage: perPage
    };
  }

  getContratos(page) {
    return {
      data: this.data.contratos[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.contratosAll.length,
      totalPages: this.data.contratos.length
    };
  }
  //==================================================

  _getContratos() {
    return [
      {
        id: 1,
        titulo: 'Título do Contrato 1',
        empresaRelacionada: 'XYZ Serviços (Executora)',
        status: '<div class="text-danger">Pendente</div>'
      },
      {
        id: 2,
        titulo: 'Título do Contrato 2',
        empresaRelacionada: 'YW Tecnologia (Co-Executora)',
        status: '<div class="text-success">Marcado como Finalizado</div>'
      }
    ]
  }

}
