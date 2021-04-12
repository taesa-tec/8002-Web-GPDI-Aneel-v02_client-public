import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TableComponentCols, TableComponentActions, TableComponentFilter } from '@app/core/components/table/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropostaDetalhesComponent } from '../proposta-detalhes/proposta-detalhes.component';
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

  buttons: TableComponentActions = [
    {
      action: 'ver-detalhes',
      text: 'VER DETALHES',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
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
    private route: ActivatedRoute,
    private modal: NgbModal
  ) { }

  async ngOnInit() {
    this.propostaEtapa = this.route.snapshot.data.propostaEtapaStatus;
    this.buttons = this.createButtons();

    // REMOVER
    await this.getData(20);
    //=====================
    this.gotoPage().then();

    // Fornecedor
    this.filters.push({
      field: 'nomeFornecedor',
      options: [
        {text: ' Todos os Fornecedores', value: ''},
        ...uniqBy(this.data.propostasAll, 'nomeFornecedor').map((v: any) => ({text: v.nomeFornecedor, value: v.nomeFornecedor}))
      ],
      value: ''
    });

    // Status
    this.filters.push({
      field: 'status',
      options: [
        {text: ' Todos os Status', value: ''},
        //...uniqBy(this.data.propostasAll, 'status').map((v: any) => ({text: v.status, value: v.status}))
      ],
      value: ''
    });
  }

  createButtons() {
    switch(this.propostaEtapa) {
      case 'recebidas':
        return [
          {action: 'ver-detalhes', text: 'VER DETALHES', icon: 'ta-edit', className: 'btn btn-primary'}
        ];
    }
  }

  async tableAction({ action, data }) {
    if (action === 'ver-detalhes') {
      const modalRef = this.modal.open(PropostaDetalhesComponent, {size: 'lg'});
      modalRef.componentInstance.proposta = data;

      try {
        await modalRef.result;

      } catch(e) {
        console.log(e);
      }
    }
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
      perPage
    };
  }

  getPropostas(page) {
    return {
      data: this.data.propostas[page - 1],
      page,
      perPage: this.data.perPage,
      totalItems: this.data.propostasAll.length,
      totalPages: this.data.propostas.length
    };
  }
  //==================================================

  _getPropostas(status) {
    switch(status) {
      case 'recebidas':
        return [
          {
            nomeFornecedor: 'XYZ Serviços',
            dataRecebimento: '25/01/2020',
            arquivos: ['Plano de Trabalho.pdf', 'Contrato - Base.pdf', 'Contrato - Co-Executor.pdf'],
            status: 'Minuta Contrato (<span class="text-green">Submetido</span>)<br>Plano de Trabalho (<span class="text-green">Submetido</span>)'
          },
          {
            nomeFornecedor: 'XYZ Serviços 3',
            dataRecebimento: '12/03/2020',
            arquivos: ['Plano de Trabalho.pdf', 'Contrato - Base.pdf', 'Contrato - Co-Executor.pdf'],
            status: 'Minuta Contrato (<span class="text-green">Submetido</span>)<br>Plano de Trabalho (<span class="text-green">Submetido</span>)'
          }
        ];

      case 'negadas':
        return [
          {
            nomeFornecedor: 'XYZ Serviços 7',
            dataRecebimento: '25/01/2020',
            arquivos: ['Plano de Trabalho 1.pdf', 'Contrato - Base 2.pdf', 'Contrato - Co-Executor 3.pdf'],
            status: 'Minuta Contrato (<span class="text-danger">Pendente</span>)<br>Plano de Trabalho (<span class="text-danger">Pendente</span>)'
          },
          {
            nomeFornecedor: 'XYZ Serviços 8',
            dataRecebimento: '08/07/2020',
            arquivos: ['Plano de Trabalho 1.pdf', 'Contrato - Base 2.pdf', 'Contrato - Co-Executor 3.pdf'],
            status: 'Minuta Contrato (<span class="text-danger">Pendente</span>)<br>Plano de Trabalho (<span class="text-danger">Pendente</span>)'
          }
        ];
    }
  }

}
