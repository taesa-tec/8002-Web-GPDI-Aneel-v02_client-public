import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {FormalizacaoDetalhesComponent} from '@app/user-shared/propostas-formalizacao/formalizacao-detalhes/formalizacao-detalhes.component';
import {FormalizacaoComponent} from '@app/user-shared/propostas-formalizacao/formalizacao/formalizacao.component';

export interface CaptacaoTableConfig {
  captacoes: Array<any>;
  cols: TableComponentCols;
  buttons: TableComponentActions;

  [prop: string]: any;
}

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  protected subscriptions: Array<Subscription> = [];
  protected events = new Subject<{ action: string; data: any; }>();
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [];
  buttons: TableComponentActions = [];

  filters: Array<TableComponentFilter> = [];

  captacoes: Array<any>;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected app: AppService,
    protected modal: NgbModal
  ) {
  }

  protected addListener(action, callback: (...args) => any) {
    this.subscriptions.push(this.events.pipe(filter(evt => evt.action === action)).subscribe(next => callback(next)));
  }

  protected addListeners() {
    this.addListener('formalizacao', () => this._openModalFormalizacao());
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe(({captacaoTable, captacoes}: { captacaoTable: CaptacaoTableConfig, captacoes: Array<any> }) => {
        this.captacoes = captacoes;
        this.cols = captacaoTable.cols;
        this.buttons = captacaoTable.buttons;
      }));
    this.route.fragment.subscribe(f => {
      const id = parseFloat(f);
      const path = this.route.snapshot.url[0].path;
      if (!isNaN(id)) {
        if (path === 'pendente') {
          this._openModalFormalizacao();
        } else {
          this._openModalDetalhes(id, path === 'formalizados');

        }
      }
    });
    this.addListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  tableAction(evt: { action: string; data: any; }) {
    this.events.next(evt);
  }

  private async _openModalFormalizacao() {
    const ref = this.modal.open(FormalizacaoComponent, {size: 'lg'});
    const cmp = ref.componentInstance as FormalizacaoComponent;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {
      console.error(e);
    }
    this.router.navigate([]).then();
  }

  private async _openModalDetalhes(id, aprovado) {
    const captacao = this.captacoes.find(c => c.id === id);
    const ref = this.modal.open(FormalizacaoDetalhesComponent, {size: 'lg'});
    const cmp = ref.componentInstance as FormalizacaoDetalhesComponent;
    cmp.captacao = captacao;
    cmp.aprovado = aprovado;

    try {
      await ref.result;
    } catch (e) {
      console.error(e);
    }
    this.router.navigate([]).then();
  }

}
