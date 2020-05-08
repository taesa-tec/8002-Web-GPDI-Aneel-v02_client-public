import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/services/app.service';
import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/shared/app-components/table/table';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es'; 

@Component({
  selector: 'app-contratos-padrao',
  templateUrl: './contratos-padrao.component.html',
  styleUrls: ['./contratos-padrao.component.scss']
})
export class ContratosPadraoComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'titulo',
      title: 'Título do Contrato',
      order: true
    },
    {
      field: 'categoria',
      title: 'Categoria',
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
    protected app: AppService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    // REMOVER
    await this.getData(20);
    //=====================
    this.gotoPage().then();

    // Contratos
    this.filters.push({
      field: "titulo", 
      options: [
        {text: " Todos os Contratos", value: ""},
        ...uniqBy(this.data.contratosAll, 'titulo').map((v: any) => ({text: v.titulo, value: v.titulo}))
      ],
      value: ""
    });

    // Categorias
    this.filters.push({
      field: "categoria", 
      options: [
        {text: " Todas as Categorias", value: ""},
        ...uniqBy(this.data.contratosAll, 'categoria').map((v: any) => ({text: v.categoria, value: v.categoria}))
      ],
      value: ""
    });
  }

  tableAction({action, data}) {
    if(action === 'editar') {
      this.app.router.navigate(['../contratos-padrao/editar/', data.id], { relativeTo: this.route });
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
        "id": "1",
        "titulo": "Contrato 1",
        "categoria": "Fornecedor",
        "texto": "<p>Lorem Ipsum 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n"
      },
      {
        "id": "2",
        "titulo": "Contrato 2",
        "categoria": "Executor",
        "texto": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>"
      },
      {
        "id": "3",
        "titulo": "Contrato 3",
        "categoria": "Executor",
        "texto": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>"
      },
      {
        "id": "4",
        "titulo": "Contrato 4",
        "categoria": "Executor",
        "texto": "<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from</p>"
      },
      {
        "id": "5",
        "titulo": "Contrato 5",
        "categoria": "Fornecedor",
        "texto": "<p class='text-danger'>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with</p>\n"
      }
    ];
  }

}
