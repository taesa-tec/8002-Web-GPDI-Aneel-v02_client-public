import {Component, Input} from '@angular/core';
import {DemandaEtapa, DemandaEtapaItem, DemandaEtapaItems, DemandaEtapaStatus, DemandaEtapaStatusText} from '../../commons';
import {Demanda} from '@app/commons/demandas';


@Component({
  selector: 'app-demanda-progress-etapa',
  templateUrl: 'demanda-progress-etapa.component.html',
  styleUrls: ['demanda-progress-etapa.component.scss']
})

export class DemandaProgressEtapaComponent {
  constructor() {
  }

  @Input() etapa: DemandaEtapaItem;
  @Input() etapaDemanda: DemandaEtapaItem;
  @Input() etapaDemandaStatus: DemandaEtapaStatus;
  @Input() responsavel: string;
  @Input() demanda: Demanda;

  get ordemEtapa() {
    return DemandaEtapaItems.indexOf(this.etapa);
  }

  get ordemEtapaDemanda() {
    return DemandaEtapaItems.indexOf(this.etapaDemanda);
  }

  get etapaStatus(): DemandaEtapaStatus {
    if (this.demanda && this.demanda.etapaAtual === DemandaEtapa.Captacao) {
      return DemandaEtapaStatus.Concluido;
    }
    switch (true) {
      case this.ordemEtapa < this.ordemEtapaDemanda:
        return this.etapa.etapa === DemandaEtapa.Elaboracao ? DemandaEtapaStatus.Concluido : DemandaEtapaStatus.Aprovada;
      case this.ordemEtapa > this.ordemEtapaDemanda:
        switch (this.etapaDemandaStatus) {
          case DemandaEtapaStatus.Reprovada:
          case DemandaEtapaStatus.ReprovadaPermanente:
            return DemandaEtapaStatus.Cancelada;
          default:
            return DemandaEtapaStatus.Pendente;
        }
      default:

        return this.etapaDemandaStatus;
    }
  }

  get className() {

    switch (this.etapaStatus) {
      case DemandaEtapaStatus.Aprovada:
      case DemandaEtapaStatus.Concluido:
        return 'etapa-sucesso';
      case DemandaEtapaStatus.EmElaboracao:
        return 'etapa-elaboracao';
      case DemandaEtapaStatus.Pendente:
        return this.ordemEtapa === this.ordemEtapaDemanda ? 'etapa-elaboracao' : '';
      case DemandaEtapaStatus.Reprovada:
      case DemandaEtapaStatus.ReprovadaPermanente:
        return 'etapa-reprovada';
      case DemandaEtapaStatus.Cancelada:
        return 'etapa-cancelada';
      default:
        return '';
    }

  }

  get etapaStatusText() {
    if (this.etapa.etapa === DemandaEtapa.RevisorPendente && this.ordemEtapa < this.ordemEtapaDemanda) {
      return 'Definido';
    }
    return DemandaEtapaStatusText[this.etapaStatus];
  }

}
