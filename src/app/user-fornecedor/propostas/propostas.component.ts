import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {CaptacaoEtapa} from '@app/user-suprimento/captacoes/commons';
import {TableComponentActions, TableComponentCols, TableComponentFilter} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

export interface CaptacaoTableConfig {
  captacoes: Array<any>;
  cols: TableComponentCols;
  buttons: TableComponentActions;
  captacaoEtapaStatus: CaptacaoEtapa;

  [prop: string]: any;
}

@Component({
  selector: 'app-projetos-captacao',
  templateUrl: './propostas.component.html',
})
export class PropostasComponent implements OnInit, OnDestroy {

  protected subscriptions: Array<Subscription> = [];
  protected events = new Subject<{ action: string; data: any; }>();
  loading = false;
  cols: TableComponentCols = [
    {field: 'captacao', title: 'Título Resumido Projeto', order: true},
    {
      field: 'dataTermino', title: 'Data Término Captação', order: true,
      pipe: new DatePipe('pt-BR'),
      value: item => [item.dataTermino, 'shortDate']
    },
  ];
  buttons: TableComponentActions = [{
    isLink: true,
    text: 'Ver',
    action: '${captacaoId}',
    className: 'btn btn-primary'
  }];
  propostas: Array<any>;


  constructor(
    protected route: ActivatedRoute,
    protected app: AppService,
    protected modal: NgbModal
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.data.subscribe(
      data => {
        this.propostas = data.propostas;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  tableAction(evt: { action: string; data: any; }) {
    this.events.next(evt);
  }

}
