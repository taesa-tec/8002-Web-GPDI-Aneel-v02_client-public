import {Component, Inject, OnInit} from '@angular/core';
import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {RiscoFormComponent} from './risco-form/risco-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/proposta/proposta.component';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';

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
    {provide: TABLE_ACTIONS, useValue: buttons},
  ]
})
export class RiscosComponent implements OnInit {

  loading = false;


  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected parent: PropostaComponent) {
  }

  async ngOnInit() {

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
