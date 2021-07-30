import {Component, Inject, OnInit} from '@angular/core';

import {TABLE_COLS, TABLE_ACTIONS, TableComponentCols} from '@app/core/components/table/table';
import {RecursoMaterialFormComponent} from './recurso-material-form/recurso-material-form.component';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {ActionOpenItem, PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

const tableCols: TableComponentCols = [
  {
    field: 'nome',
    title: 'Nome Recurso',
    order: true,
  },
  {
    field: 'categoriaContabil',
    title: 'Categoria Contabil',
    order: true,
  },
  {
    field: 'valorUnitario',
    title: 'Valor Unitário',
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
  selector: 'app-recursos-materiais',
  templateUrl: './recursos-materiais.component.html',
  styleUrls: ['./recursos-materiais.component.scss'],
  providers: [
    {provide: CRUD_EDITOR, useValue: RecursoMaterialFormComponent},
    {provide: TABLE_COLS, useValue: tableCols},
    ActionOpenItem,
  ]
})
export class RecursosMateriaisComponent implements OnInit {
  canEdit: boolean;
  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
    protected router: Router,
    protected route: ActivatedRoute,
    protected parent: PropostaComponent) {
  }

  async ngOnInit() {
    this.propostaCanEdit.subscribe(can => this.canEdit = can);
  }

  async openForm(ref) {
    const cmp = ref.componentInstance as RecursoMaterialFormComponent;
    cmp.proposta = this.parent.proposta;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {

    }
    this.router.navigate([]).then();
  }

}
