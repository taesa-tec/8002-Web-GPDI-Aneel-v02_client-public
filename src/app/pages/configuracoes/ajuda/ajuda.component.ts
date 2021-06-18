import {Component, Inject, OnInit} from '@angular/core';
import {TABLE_ACTIONS, TABLE_COLS} from '@app/core/components';
import {CRUD_EDITOR} from '@app/core/components/crud/crud.component';
import {AjudaFormComponent} from '@app/pages/configuracoes/ajuda/ajuda-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {KONAMI_CODE} from '@app/commons';
import {BehaviorSubject} from 'rxjs';


const tableCols = [
  {
    field: 'codigo',
    title: 'Codigo',
    order: true,
  },
  {
    field: 'nome',
    title: 'Nome',
    order: true,
  },
  {
    field: 'descricao',
    title: 'Descrição',
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
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  providers: [
    {provide: CRUD_EDITOR, useValue: AjudaFormComponent},
    {provide: TABLE_COLS, useValue: tableCols},
    {provide: TABLE_ACTIONS, useValue: buttons},
  ]
})
export class AjudaComponent implements OnInit {
  isCheating = false;

  constructor(protected route: ActivatedRoute, protected router: Router, @Inject(KONAMI_CODE) protected kc: BehaviorSubject<boolean>) {
  }

  ngOnInit(): void {
    this.kc.subscribe(ischeating => {
      this.isCheating = ischeating;
    });
  }

  async openForm(ref) {
    const cmp = ref.componentInstance as AjudaFormComponent;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {
      //console.error(e);
    }
    this.router.navigate([]).then();
  }

}
