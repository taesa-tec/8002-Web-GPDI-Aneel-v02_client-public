import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Inject, OnInit} from '@angular/core';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {AlocarRecursoHumanoFormComponent} from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {ActionOpenItem, PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';

const tableCols: TableComponentCols = [
  {
    field: 'recurso',
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
    type: 'currency',
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
    ActionOpenItem,
  ]
})
export class AlocacaoRecursosHumanosComponent implements OnInit {

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    protected router: Router,
    protected route: ActivatedRoute,
    protected parent: PropostaComponent) {
  }

  async ngOnInit() {

  }

  async openForm(ref) {
    const cmp = ref.componentInstance as AlocarRecursoHumanoFormComponent;
    cmp.proposta = this.parent.proposta;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {

    }
    this.router.navigate([]).then();
  }

}
