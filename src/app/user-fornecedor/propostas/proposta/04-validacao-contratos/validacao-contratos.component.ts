import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Pagination} from '@app/commons/common';
import {at, chunk, uniqBy} from 'lodash-es';

@Component({
  selector: 'app-validacao-contratos',
  templateUrl: './validacao-contratos.component.html',
  styleUrls: ['./validacao-contratos.component.scss']
})
export class ValidacaoContratosComponent implements OnInit {
  contratos: Array<any>;
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {
      field: 'titulo',
      title: 'Listagem Contratos',
      order: true,
    },
    {
      field: 'status',
      title: 'Status',
      order: true,
      type: 'template',
      value: i => i,
      template: item => item.finalizado ? '<span class="text-success">Marcado como finalizado</span>'
        : '<span class="text-danger">Pendente</span>',

    }
  ];

  buttons: TableComponentActions = [
    {
      action: '${parentId}',
      isLink: true,
      text: 'VER DETALHES',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];

  constructor(
    private app: AppService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.contratos = data.contratos;
    });

  }

  tableAction({action, data}) {
    if (action === 'ver-detalhes') {
      this.app.router.navigate(['../', data.id], {relativeTo: this.route});
    }
  }


}
