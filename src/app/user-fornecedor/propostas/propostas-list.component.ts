import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {CaptacaoEtapa} from '@app/user-suprimento/captacoes/commons';
import {TableComponentActions, TableComponentCols, TableComponentFilter} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {PropostaDetalhesComponent} from '@app/user-fornecedor/propostas/proposta-detalhes.component';

export interface CaptacaoTableConfig {
  captacoes: Array<any>;
  cols: TableComponentCols;
  buttons: TableComponentActions;
  captacaoEtapaStatus: CaptacaoEtapa;

  [prop: string]: any;
}

@Component({
  templateUrl: './propostas-list.component.html',
})
export class PropostasListComponent implements OnInit, OnDestroy {

  protected subscriptions: Array<Subscription> = [];
  protected events = new Subject<{ action: string; data: any }>();
  loading = false;
  cols: TableComponentCols = [
    {field: 'captacao', title: 'Título Resumido Projeto', order: true},
    {
      field: 'dataTermino', title: 'Data Término Captação', order: true,
      pipe: new DatePipe('pt-BR'),
      value: item => [item.dataTermino, 'shortDate']
    },
  ];
  buttons: TableComponentActions = [];
  propostas: Array<any>;


  constructor(
    protected route: ActivatedRoute,
    protected app: AppService,
    protected modal: NgbModal
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'encerradas') {
      this.buttons = [{
        text: 'Ver',
        action: 'ver',
        className: 'btn btn-primary'
      }];
    } else {
      this.buttons = [{
        isLink: true,
        text: 'Ver',
        action: '/fornecedor/proposta/${guid}',
        className: 'btn btn-primary'
      }];
    }
    this.subscriptions.push(this.route.data.subscribe(
      data => {
        this.propostas = data.propostas;
      }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async openPropostaDetalhes(evt: { action: string; data: any }) {
    const ref = this.modal.open(PropostaDetalhesComponent, {size: 'lg'});
    ref.componentInstance.proposta = evt.data;
    await ref.result;
  }

}
