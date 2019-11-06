import {Component, OnInit} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/models/demandas';
import {DemandaEtapa, DemandaEtapaStatus} from '@app/dashboard/demandas/commons';

@Component({
  selector: 'app-etapa-avaliacao',
  templateUrl: './etapa-avaliacao.component.html',
  styleUrls: ['./etapa-avaliacao.component.scss']
})
export class EtapaAvaliacaoComponent implements OnInit {

  constructor(protected  app: AppService, protected route: ActivatedRoute) {
  }

  protected $demanda: Demanda;
  readonly ETAPAS_VALUES = DemandaEtapa;


  get demanda(): Demanda {
    return this.$demanda;
  }

  set demanda(value: Demanda) {
    this.$demanda = value;
  }

  ngOnInit() {
    this.demanda = this.route.parent.snapshot.data.demanda;
  }

}
