import {Component, Input, OnInit} from '@angular/core';
import {Demanda} from '@app/models/demandas';
import {DemandaEtapaStatus} from '@app/dashboard/demandas/commons';

@Component({
  selector: 'app-enviar-proxima-etapa',
  templateUrl: './enviar-proxima-etapa.component.html',
  styleUrls: ['./enviar-proxima-etapa.component.scss']
})
export class EnviarProximaEtapaComponent implements OnInit {
  readonly STATUS_VALUES = DemandaEtapaStatus;

  @Input() demanda: Demanda;

  constructor() {
  }

  ngOnInit() {
  }

}
