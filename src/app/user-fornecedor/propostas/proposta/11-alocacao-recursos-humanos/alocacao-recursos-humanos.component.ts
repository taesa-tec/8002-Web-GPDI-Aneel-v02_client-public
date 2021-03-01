import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit} from '@angular/core';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {AlocarRecursoHumanoFormComponent} from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {Pagination} from '@app/commons/common';
import {at, chunk, uniqBy} from 'lodash-es';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {RecursoHumanoFormComponent} from '@app/user-fornecedor/propostas/proposta/10-recursos-humanos/recurso-humano-form/recurso-humano-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';

const tableCols = [
  {
    field: 'recursoHumano',
    title: 'Nome',
    order: true,
  },
  {
    field: 'etapa',
    title: 'Etapa',
    order: true,
  },
  {
    field: 'empresaFinanciadora',
    title: 'Empresa Financiadora',
    order: true,
  },
  {
    field: 'valor',
    title: 'Valor',
    order: true,
  }
];
const buttons = [
  {
    isLink: true,
    action: './#${id}',
    text: 'EDITAR',
    icon: 'ta-edit',
    className: 'btn btn-primary'
  }
];

@Component({
  selector: 'app-alocacao-recursos-humanos',
  templateUrl: './alocacao-recursos-humanos.component.html',
  styleUrls: ['./alocacao-recursos-humanos.component.scss'],
  providers: [
    {provide: CRUD_EDITOR, useValue: AlocarRecursoHumanoFormComponent},
    {provide: TABLE_COLS, useValue: tableCols},
    {provide: TABLE_ACTIONS, useValue: buttons},
  ]
})
export class AlocacaoRecursosHumanosComponent implements OnInit {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected parent: PropostaComponent) {
  }

  async ngOnInit() {

  }

}
