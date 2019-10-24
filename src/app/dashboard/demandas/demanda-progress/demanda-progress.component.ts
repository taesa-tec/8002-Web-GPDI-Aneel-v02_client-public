
import { Component, OnInit, Input } from '@angular/core';
import { DemandaEtapa, DemandaEtapaItem, DemandaEtapaItems, DemandaEtapaStatus } from '../commons';
import { Demanda } from '@app/models/demandas';

@Component({
  selector: 'app-demanda-progress',
  styleUrls: ['demanda-progress.component.scss'],
  templateUrl: 'demanda-progress.component.html'
})

export class DemandaProgressComponent implements OnInit {
  etapas: Array<DemandaEtapaItem> = DemandaEtapaItems;
  etapaAtualStatus: DemandaEtapaStatus = DemandaEtapaStatus.EmElaboracao;
  @Input() demanda: Demanda;

  get etapaAtual() {
    return DemandaEtapaItems[this.demanda.etapaAtual];
  }

  get demandaId() {
    return this.demanda.id.toString().padStart(3, '0');
  }
  constructor() { }

  ngOnInit() { }
}
