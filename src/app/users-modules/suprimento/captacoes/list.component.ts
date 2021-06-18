import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {CaptacaoEtapa} from '@app/users-modules/suprimento/captacoes/commons';
import {TableComponentActions, TableComponentCols, TableComponentFilter} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {filter} from 'rxjs/operators';
import {CriarComponent} from '@app/pages/captacao/criar/criar.component';
import {EnviarComponent} from '@app/pages/captacao/enviar/enviar.component';
import {CaptacaoTableConfig} from '@app/users-modules/suprimento/captacoes/captacoes.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
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

  ngOnInit() {

    this.subscriptions.push(this.route.data.subscribe(
      ({captacaoTable, captacoes}: { captacaoTable: CaptacaoTableConfig; captacoes: Array<any> }) => {
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

  criarCaptacao(data) {
    console.log(data);
    const modalRef = this.modal.open(CriarComponent, {size: 'lg'});
    const criar = modalRef.componentInstance as CriarComponent;
    criar.id = data.id;
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
