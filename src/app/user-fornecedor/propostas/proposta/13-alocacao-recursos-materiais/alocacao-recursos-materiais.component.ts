import {Component, OnInit} from '@angular/core';

import {TableComponentCols, TableComponentActions, TableComponentFilter, TABLE_COLS, TABLE_ACTIONS} from '@app/core/components/table/table';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {RecursoHumanoFormComponent} from
    '@app/user-fornecedor/propostas/proposta/10-recursos-humanos/recurso-humano-form/recurso-humano-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {AlocarRecursoMaterialFormComponent} from '@app/user-fornecedor/propostas/proposta/13-alocacao-recursos-materiais/alocar-recurso-material-form/alocar-recurso-material-form.component';

const tableCols = [
  {
    field: 'recursoMaterial',
    title: 'Nome Recurso',
    order: true,
  },
  {
    field: 'categoriaContabil',
    title: 'Cat. Contábil',
    order: true,
  },
  {
    field: 'valorTotal',
    title: 'Valor Total',
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

}
