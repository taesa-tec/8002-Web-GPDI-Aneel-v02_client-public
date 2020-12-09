import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@app/services/app.service';
import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { Pagination } from '@app/models/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'titulo',
      title: 'Produto Intermediário',
      order: true,
    },
    {
      field: 'etapas',
      title: 'Etapa(s) Associada(s)',
      order: true,
    },
    {
      field: 'classificacao',
      title: 'Classificação',
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

  produtos: Pagination<any> = {
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

    // Produto
    this.filters.push({
      field: "titulo",
      options: [
        {text: " Todos os Produtos", value: ""},
        ...uniqBy(this.data.produtosAll, 'titulo').map((v: any) => ({text: v.titulo, value: v.titulo}))
      ],
      value: ""
    });

    // Classificação
    this.filters.push({
      field: "classificacao",
      options: [
        {text: " Todas as Classificações", value: ""},
        ...uniqBy(this.data.produtosAll, 'classificacao').map((v: any) => ({text: v.classificacao, value: v.classificacao}))
      ],
      value: ""
    });
  }

  async tableAction({ action, data }) {
    if (action === 'editar') {
      await this.salvarProduto(data);
    }
  }

  setCurrentData() {
    let filtered_data = this.data.produtosAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.produtosAll.length) {
      this.produtos.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.produtos = await this.getProdutos(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  async salvarProduto(produto?: any) {
    const modalRef = this.modal.open(ProdutoFormComponent, {size: 'lg'});
    modalRef.componentInstance.produto = produto;

    try {
      await modalRef.result;
      //this.getProdutos();
    } catch(e) {
      console.log(e);
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const produtos = await this._getProdutos();

    this.data = {
      produtosAll: produtos,
      produtos: chunk(produtos, perPage),
      perPage: perPage
    };
  }

  getProdutos(page) {
    return {
      data: this.data.produtos[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.produtosAll.length,
      totalPages: this.data.produtos.length
    };
  }
  //==================================================

  _getProdutos() {
    return [
      {
        id: 1,
        titulo: 'Título',
        classificacao: 'Produto Intermediário',
        tipoProduto: 'Produto 1',
        cadeiaInovacao: 'Fase 1',
        tipoProdutoDetalhado: 'Produto Detalhado 1',
        descricao: 'Descrição',
        etapas: ['Etapa 1', 'Etapa 2', 'Etapa 3']
      },
      {
        id: 2,
        titulo: 'Título 2',
        classificacao: 'Produto Intermediário 2',
        tipoProduto: 'Produto 2',
        cadeiaInovacao: 'Fase 2',
        tipoProdutoDetalhado: 'Produto Detalhado 2',
        descricao: 'Descrição 2',
        etapas: ['Etapa 1', 'Etapa 2', 'Etapa 3']
      }
    ]
  }

}
