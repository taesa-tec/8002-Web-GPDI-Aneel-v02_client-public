import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {CaptacaoEtapa} from '../commons';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Subject, Subscription} from 'rxjs';
import {CriarComponent} from '@app/pages/captacao/criar/criar.component';
import {EnviarComponent} from '@app/pages/captacao/enviar/enviar.component';
import {filter} from 'rxjs/operators';

export interface CaptacaoTableConfig {
  captacoes: Array<any>;
  cols: TableComponentCols;
  buttons: TableComponentActions;
  captacaoEtapaStatus: CaptacaoEtapa;

  [prop: string]: any;
}

@Component({
  selector: 'app-projetos-captacao-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  protected subscriptions: Array<Subscription> = [];
  protected events = new Subject<{ action: string; data: any }>();
  captacaoEtapa: CaptacaoEtapa;
  loading = false;
  hidePagination = false;

  cols: TableComponentCols = [];
  buttons: TableComponentActions = [];

  filters: Array<TableComponentFilter> = [];

  captacoes: Array<any>;

  // REMOVER
  data: any;

  //========

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
    this.addListener('criar', ({data}) => this.criarCaptacao(data));
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.route.data.subscribe(({captacaoTable, captacoes}: { captacaoTable: CaptacaoTableConfig; captacoes: Array<any> }) => {
        this.captacoes = captacoes;
        this.captacaoEtapa = captacaoTable.captacaoEtapaStatus;
        this.cols = captacaoTable.cols;
        this.buttons = captacaoTable.buttons;
      }));
    this.addListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  tableAction(evt: { action: string; data: any }) {
    this.events.next(evt);
  }

  async criarCaptacao(data) {
    const modalRef = this.modal.open(CriarComponent, {size: 'lg'});
    const criar = modalRef.componentInstance as CriarComponent;
    criar.id = data.id;
    await modalRef.result;
    this.router.navigate(['./'], {
      relativeTo: this.route, queryParams: {
        update: Date.now()
      }
    }).then();
  }

  actionAberta({action, data}) {
    // Redirecionar para outra tela
    console.log(data);
  }

  actionEncerrada({action, data}) {
    if (action === 'enviar-para-riscos') {
      const modalRef = this.modal.open(EnviarComponent, {size: 'lg'});
      modalRef.componentInstance.projeto = data;
    }
  }
}
