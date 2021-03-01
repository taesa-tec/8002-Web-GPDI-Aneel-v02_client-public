import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {RecursoMaterialFormComponent} from './recurso-material-form/recurso-material-form.component';
import {Pagination} from '@app/commons/common';
import {at, chunk, uniqBy} from 'lodash-es';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {RecursoHumanoFormComponent} from '@app/user-fornecedor/propostas/proposta/10-recursos-humanos/recurso-humano-form/recurso-humano-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';

const tableCols = [
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
  selector: 'app-recursos-materiais',
  templateUrl: './recursos-materiais.component.html',
  styleUrls: ['./recursos-materiais.component.scss'],
  providers: [
    {provide: CRUD_EDITOR, useValue: RecursoMaterialFormComponent},
    {provide: TABLE_COLS, useValue: tableCols},
    {provide: TABLE_ACTIONS, useValue: buttons},
  ]
})
export class RecursosMateriaisComponent implements OnInit {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected parent: PropostaComponent) {
  }

  async ngOnInit() {

  }

}
