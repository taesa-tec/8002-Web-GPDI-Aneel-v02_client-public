import { Component, OnInit, Input } from '@angular/core';
import { DemandaEtapa, DemandaEtapaStatus, DemandaEtapaItem, DemandaEtapaItems, DemandaEtapaStatusText } from '../../commons';




@Component({
  selector: 'app-demanda-progress-etapa',
  templateUrl: 'demanda-progress-etapa.component.html',
  styleUrls: ['demanda-progress-etapa.component.scss']
})

export class DemandaProgressEtapaComponent implements OnInit {
  constructor() { }
  @Input() etapa: DemandaEtapaItem;
  @Input() etapaDemanda: DemandaEtapaItem;
  @Input() etapaDemandaStatus: DemandaEtapaStatus;
  @Input() responsavel: string = "Responsavel";

  get ordemEtapa() {
    return DemandaEtapaItems.indexOf(this.etapa);
  }
  get ordemEtapaDemanda() {
    return DemandaEtapaItems.indexOf(this.etapaDemanda);
  }

  get etapaStatus(): DemandaEtapaStatus {
    switch (true) {
      case this.ordemEtapa < this.ordemEtapaDemanda:
        return this.etapa.etapa === DemandaEtapa.Elaboracao ? DemandaEtapaStatus.Concluido : DemandaEtapaStatus.Aprovada;
      case this.ordemEtapa > this.ordemEtapaDemanda:
        return this.etapaDemandaStatus === DemandaEtapaStatus.Reprovada ? DemandaEtapaStatus.Cancelada : DemandaEtapaStatus.Pendente;
      default:
        return this.etapaDemandaStatus;
    }
  }
  get className() {
    switch (this.etapaStatus) {
      case DemandaEtapaStatus.Aprovada:
      case DemandaEtapaStatus.Concluido:
        return "etapa-sucesso";
      case DemandaEtapaStatus.EmElaboracao:
        return "etapa-elaboracao";
      case DemandaEtapaStatus.Reprovada:
      case DemandaEtapaStatus.ReprovadaPermanente:
        return "etapa-reprovada";
      default:
        return "";
    }

  }
  get etapaStatusText() {
    return DemandaEtapaStatusText[this.etapaStatus];
  }
  ngOnInit() { }
}
