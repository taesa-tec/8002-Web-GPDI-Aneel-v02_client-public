import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TableComponentCols, TableComponentFilter } from '@app/core/components/table/table';
import { Pagination } from '@app/commons/common';
import { at, chunk, uniqBy } from 'lodash-es';

@Component({
  selector: 'app-propostas-list',
  templateUrl: './propostas-list.component.html',
  styleUrls: ['./propostas-list.component.scss']
})
export class PropostasListComponent implements OnInit {

  propostaEtapa: string;
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'nomeFornecedor',
      title: 'Nome Fornecedor',
      order: true,
    },
    {
      field: 'dataRecebimento',
      title: 'Data de Recebimento',
      order: true,
    },
    {
      field: 'status',
      title: 'Status',
      order: true,
    },
  ];

  filters: Array<TableComponentFilter> = [];

  propostas: Pagination<any> = {
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
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.propostaEtapa = this.route.snapshot.data.propostaEtapaStatus;

    // REMOVER
    await this.getData(20);
    //=====================
    this.gotoPage().then();

    // Fornecedor
    this.filters.push({
      field: "nomeFornecedor",
      options: [
        {text: " Todos os Fornecedores", value: ""},
        ...uniqBy(this.data.propostasAll, 'nomeFornecedor').map((v: any) => ({text: v.nomeFornecedor, value: v.nomeFornecedor}))
      ],
      value: ""
    });

    // Status
    this.filters.push({
      field: "status",
      options: [
        {text: " Todos os Status", value: ""},
        //...uniqBy(this.data.propostasAll, 'status').map((v: any) => ({text: v.status, value: v.status}))
      ],
      value: ""
    });
  }

  setCurrentData() {
    let filtered_data = this.data.propostasAll;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `${f.field}`)) === f.value);
      }
    });

    if(filtered_data.length < this.data.propostasAll.length) {
      this.propostas.data = filtered_data;
      this.hidePagination = true;
    } else {
      this.gotoPage().then();
      this.hidePagination = false;
    }
  }

  async gotoPage(page = 1) {
    this.loading = true;
    try {
      this.propostas = await this.getPropostas(page);
    } catch (e) {
      //this.app.alert(e.message).then();
    } finally {
      this.loading = false;
    }
  }

  //REMOVER
  async getData(perPage: number) {
    const propostas = await this._getPropostas(this.propostaEtapa);

    this.data = {
      propostasAll: propostas,
      propostas: chunk(propostas, perPage),
      perPage: perPage
    };
  }

  getPropostas(page) {
    return {
      data: this.data.propostas[page - 1],
      page: page,
      perPage: this.data.perPage,
      totalItems: this.data.propostasAll.length,
      totalPages: this.data.propostas.length
    };
  }
  //==================================================

  _getPropostas(status) {
    switch(status) {
      case 'aberto':
        return [
          {
            nomeFornecedor: 'XYZ Serviços 1',
            dataRecebimento: '25/01/2020',
            status: 'Minuta Contrato (<span class="text-green">Submetido</span>)<br>Plano de Trabalho (<span class="text-danger">Pendente</span>)'
          },
          {
            nomeFornecedor: 'XYZ Serviços 2',
            dataRecebimento: '10/09/2020',
            status: 'Minuta Contrato (<span class="text-green">Submetido</span>)<br>Plano de Trabalho (<span class="text-danger">Pendente</span>)'
          }
        ];

      case 'recebidas':
        return [
          {
            nomeFornecedor: 'XYZ Serviços 5',
            dataRecebimento: '18/02/2020',
            status: 'Minuta Contrato (<span class="text-green">Submetido</span>)<br>Plano de Trabalho (<span class="text-green">Submetido</span>)'
          },
          {
            nomeFornecedor: 'XYZ Serviços 6',
            dataRecebimento: '23/07/2020',
            status: 'Minuta Contrato (<span class="text-green">Submetido</span>)<br>Plano de Trabalho (<span class="text-green">Submetido</span>)'
          }
        ];

      case 'negadas':
        return [
          {
            nomeFornecedor: 'XYZ Serviços 8',
            dataRecebimento: '09/09/2020',
            status: 'Minuta Contrato (<span class="text-danger">Recusado</span>)<br>Plano de Trabalho (<span class="text-danger">Pendente</span>)'
          },
          {
            nomeFornecedor: 'XYZ Serviços 9',
            dataRecebimento: '30/04/2020',
            status: 'Minuta Contrato (<span class="text-danger">Recusado</span>)<br>Plano de Trabalho (<span class="text-danger">Pendente</span>)'
          }
        ];
    }
  }

}
