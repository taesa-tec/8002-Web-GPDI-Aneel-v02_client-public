import {Component, Inject, OnInit} from '@angular/core';
import {TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {RiscoFormComponent} from './risco-form/risco-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {ActionOpenItem, PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

const tableCols = [
  {
    field: 'item',
    title: 'Item',
    order: true,
  },
  {
    field: 'classificacao',
    title: 'Classificação',
    order: true,
  },
  {
    field: 'probabilidade',
    title: 'Probabilidade',
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
  selector: 'app-riscos',
  templateUrl: './riscos.component.html',
  styleUrls: ['./riscos.component.scss'],
  providers: [
    {provide: CRUD_EDITOR, useValue: RiscoFormComponent},
    {provide: TABLE_COLS, useValue: tableCols},
    ActionOpenItem,
  ]
})
export class RiscosComponent implements OnInit {

  loading = false;

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
    const cmp = ref.componentInstance as RiscoFormComponent;
    cmp.proposta = this.parent.proposta;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {

    }
    this.router.navigate([]).then();
  }
}
