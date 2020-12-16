import {AppService} from '@app/services/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrls: ['demanda.component.scss'],
  providers: []
})
export class DemandaComponent implements OnInit {

  DemandaId: string;
  DemandaTitulo: string;
  DemandaEtapa: string;

  protected $demanda: Demanda;

  get demanda() {
    return this.$demanda;
  }

  set demanda(value) {
    this.$demanda = value;
    if (!this.$demanda == null || this.$demanda === undefined) {
      return;
    }
    if (this.$demanda.id) {
      const id = String(this.$demanda.id).padStart(3, '0');
      this.DemandaId = `ID-${id}`;
    }
    this.DemandaTitulo = this.$demanda.titulo || '';
    this.DemandaEtapa = this.ETAPAS[this.$demanda.etapaAtual] || '';
  }

  menu: Array<any>;

  readonly ETAPAS = {
    0: 'Elaboracao',
    1: 'PreAprovacao',
    2: 'RevisorPendente',
    3: 'AprovacaoRevisor',
    4: 'AprovacaoCoordenador',
    5: 'AprovacaoGerente',
    6: 'AprovacaoDiretor',
    7: 'Captacao'
  };

  constructor(private app: AppService, protected modal: NgbModal, protected route: ActivatedRoute) {

  }

  ngOnInit() {
    const dataResolved = this.route.snapshot.data['demanda'];
    this.demanda = dataResolved.demanda;
    this.menu = dataResolved.menu;

    if (dataResolved.defaultPage && this.route.children.length === 0) {
      this.app.router.navigate(dataResolved.defaultPage.split('/'), {relativeTo: this.route, skipLocationChange: false});
    }

    // this.Subscriptions.push(fromEvent(window, 'popstate').subscribe((event) => this.historyBack(event)));
  }

}
