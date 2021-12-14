import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Pagination} from '@app/commons/common';

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
      field: 'id',
      title: 'Id'
    },
    {
      field: 'titulo',
      title: 'Título do Contrato',
      order: true
    }
  ];

  buttons: TableComponentActions = [
    {
      action: 'editar/${id}',
      text: 'EDITAR',
      icon: 'ta-edit',
      isLink: true,
      className: 'btn btn-primary'
    }
  ];

  filters: Array<TableComponentFilter> = [];

  data: any;

  constructor(
    protected app: AppService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.data = this.route.snapshot.data.contratos;
    // Contratos
    this.filters.push({
      field: 'titulo',
      options: [
        {text: ' Todos os Contratos', value: ''},
      ],
      value: ''
    });

    // Categorias
    this.filters.push({
      field: 'categoria',
      options: [
        {text: ' Todas as Categorias', value: ''},
      ],
      value: ''
    });
  }

  tableAction({action, data}) {
    if (action === 'editar') {
      this.app.router.navigate(['../contratos-padrao/editar/', data.id], {relativeTo: this.route});
    }
  }

}
