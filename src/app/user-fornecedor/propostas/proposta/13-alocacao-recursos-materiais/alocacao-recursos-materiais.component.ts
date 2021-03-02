import {Component, OnInit} from '@angular/core';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {
  AlocarRecursoMaterialFormComponent
} from '@app/user-fornecedor/propostas/proposta/13-alocacao-recursos-materiais/alocar-recurso-material-form/alocar-recurso-material-form.component';
import {
  AlocarRecursoHumanoFormComponent
} from '@app/user-fornecedor/propostas/proposta/11-alocacao-recursos-humanos/alocar-recurso-humano-form/alocar-recurso-humano-form.component';

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
    {provide: TABLE_ACTIONS, useValue: buttons},
  ]
})
export class AlocacaoRecursosMateriaisComponent implements OnInit {
  constructor(
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
