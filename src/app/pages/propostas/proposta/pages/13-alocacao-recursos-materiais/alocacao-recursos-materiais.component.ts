import {Component, Inject, OnInit} from '@angular/core';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {
  AlocarRecursoMaterialFormComponent
} from '@app/pages/propostas/proposta/pages/13-alocacao-recursos-materiais/alocar-recurso-material-form/alocar-recurso-material-form.component';
import {
  AlocarRecursoHumanoFormComponent
} from '@app/pages/propostas/proposta/pages/11-alocacao-recursos-humanos/alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {ActionOpenItem, PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

const tableCols: TableComponentCols = [
  {
    field: 'recurso',
    title: 'Nome Recurso',
    order: true,
  },
  {
    field: 'recursoCategoria',
    title: 'Cat. Contábil',
    order: true,
  },
  {
    field: 'quantidade',
    title: 'Quantidade',
    order: true,
  },
  {
    field: 'valor',
    title: 'Valor Total',
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
  selector: 'app-alocacao-recursos-materiais',
  templateUrl: './alocacao-recursos-materiais.component.html',
  styleUrls: ['./alocacao-recursos-materiais.component.scss'],
  providers: [
    {provide: CRUD_EDITOR, useValue: AlocarRecursoMaterialFormComponent},
    {provide: TABLE_COLS, useValue: tableCols},
    ActionOpenItem,
  ]
})
export class AlocacaoRecursosMateriaisComponent implements OnInit {
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
    const cmp = ref.componentInstance as AlocarRecursoHumanoFormComponent;
    cmp.proposta = this.parent.proposta;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {
// Modais lançam erros quando fechandos com a função dimiss
    }
    this.router.navigate([]).then();
  }


}
