import {AppService} from '@app/services/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrls: []
})
export class DemandaComponent implements OnInit {

  DemandaId: string;
  DemandaTitulo: string;
  DemandaEtapa: string;

  protected $demanda: any;

  get demanda() {
    return this.$demanda;
  }

  set demanda(value) {
    this.$demanda = value;
    if (!this.$demanda == null || this.$demanda == undefined) {
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
    this.demanda = this.route.snapshot.data.demanda;
    this.menu = [
      {text: 'Definição Pessoas Processo Validação', icon: 'ta-user-id', path: 'equipe-validacao'},
      {text: 'Especificação Técnica', icon: 'ta-capacete', path: 'formulario/especificacao-tecnica'},
      {text: 'Documento e Aprovações', icon: 'ta-projeto', path: 'avaliacao'},
      // {text: 'Processo Aprovação Demanda', icon: 'ta-projeto', path: 'pre-aprovacao'},
      {text: 'Central Administrativa', icon: 'ta-central-admin', path: 'central-administrativa'},
      {text: 'Log Projeto', icon: 'ta-log', path: 'log-projeto'},
    ];
  }

}
