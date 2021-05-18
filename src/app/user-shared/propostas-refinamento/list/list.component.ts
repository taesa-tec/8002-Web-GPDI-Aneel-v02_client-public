import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {SelecaoComponent} from '@app/user-shared/propostas-selecao/selecao/selecao.component';
import {Proposta} from '@app/commons';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  protected subscriptions: Array<Subscription> = [];
  protected events = new Subject<{ action: string; data: any; }>();
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [
    {field: 'captacao', title: 'Titulo Projeto'},
    {field: 'fornecedor', title: 'Fornecedor'},
  ];
  buttons: TableComponentActions = [{
    action: './proposta/${guid}',
    isLink: true,
    text: 'Refinamento',
    icon: 'ta-eye',
    className: 'btn btn-primary'
  }];

  filters: Array<TableComponentFilter> = [];

  propostas: Array<Proposta>;

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
    this.addListener('riscos', () => this._openModalSelecao());
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe(({propostas}: { propostas: Array<Proposta> }) => {
        this.propostas = propostas;
        //this.cols = captacaoTable.cols;
        //this.buttons = captacaoTable.buttons;
      }));
    this.addListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  tableAction(evt: { action: string; data: any; }) {
    this.events.next(evt);
  }

  private async _openModalSelecao() {
    const ref = this.modal.open(SelecaoComponent, {size: 'lg'});
    const cmp = ref.componentInstance as SelecaoComponent;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {
      console.error(e);
    }
    this.router.navigate([]).then();
  }

}
