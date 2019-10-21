
import { Component, OnInit } from '@angular/core';
import { DemandaEtapa, DemandaEtapaItem, DemandaEtapaItems, DemandaEtapaStatus } from '../commons';

@Component({
  selector: 'app-demanda-progress',
  styleUrls: ['demanda-progress.component.scss'],
  templateUrl: 'demanda-progress.component.html'
})

export class DemandaProgressComponent implements OnInit {
  etapas: Array<DemandaEtapaItem> = DemandaEtapaItems;
  etapaAtual = DemandaEtapaItems[5];
  etapaAtualStatus: DemandaEtapaStatus = DemandaEtapaStatus.EmElaboracao;
  constructor() { }

  ngOnInit() { }
}
