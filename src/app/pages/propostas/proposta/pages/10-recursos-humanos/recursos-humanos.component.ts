import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {RecursoHumanoFormComponent} from './recurso-humano-form/recurso-humano-form.component';
import {Pagination} from '@app/commons/common';
import {at, chunk, uniqBy} from 'lodash-es';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {AppService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {RiscoFormComponent} from '@app/pages/propostas/proposta/pages/09-riscos/risco-form/risco-form.component';
import {Funcoes, Graduacoes} from '@app/commons';
import {ActionOpenItem, PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';

const tableCols: TableComponentCols = [
  {
    field: 'nomeCompleto',
    title: 'Nome Completo',
    order: true,
  },
  {
    field: 'empresa',
    title: 'Empresa',
    order: true,
  },
  {
    field: 'funcao',
    title: 'Função',
    value: rh => Funcoes.find(g => g.value === rh.funcao)?.text,
    order: true,
  },
  {
    field: 'titulacao',
    title: 'Titulação',
    value: rh => Graduacoes.find(g => g.value === rh.titulacao)?.text,
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
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
  styleUrls: ['./recursos-humanos.component.scss'],
  providers: [
    {provide: CRUD_EDITOR, useValue: RecursoHumanoFormComponent},
    {provide: TABLE_COLS, useValue: tableCols},
    ActionOpenItem,
  ]
})
export class RecursosHumanosComponent implements OnInit {

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    protected router: Router,
    protected route: ActivatedRoute,
    protected parent: PropostaComponent) {
  }

  async ngOnInit() {

  }

  async openForm(ref) {
    const cmp = ref.componentInstance as RecursoHumanoFormComponent;
    cmp.proposta = this.parent.proposta;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {

    }
    this.router.navigate([]).then();
  }

}
