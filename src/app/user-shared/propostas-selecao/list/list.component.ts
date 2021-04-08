import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {SelecaoComponent} from '@app/user-shared/propostas-selecao/selecao/selecao.component';

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
    this.addListener('selecao', () => this._openModalSelecao());
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe(({captacaoTable, captacoes}: { captacaoTable: CaptacaoTableConfig, captacoes: Array<any> }) => {
        this.captacoes = captacoes;
        this.cols = captacaoTable.cols;
        this.buttons = captacaoTable.buttons;
      }));
    this.addListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  tableAction(evt: { action: string; data: any; }) {
    this.events.next(evt);
  }

  private _openModalSelecao() {
    const ref = this.modal.open(SelecaoComponent, {size: 'lg'});
  }

}
