import {Component, OnInit, Input} from '@angular/core';
import {DemandaEtapa, DemandaEtapaItem, DemandaEtapaItems, DemandaEtapaStatus} from '../commons';
import {Demanda} from '@app/models/demandas';
import {User} from '@app/models';
import {AppService} from '@app/services/app.service';

@Component({
  selector: 'app-demanda-progress',
  styleUrls: ['demanda-progress.component.scss'],
  templateUrl: 'demanda-progress.component.html'
})

export class DemandaProgressComponent implements OnInit {
  etapas: Array<DemandaEtapaItem> = DemandaEtapaItems;
  responsaveis: Array<User>;
  etapaAtualStatus: DemandaEtapaStatus = DemandaEtapaStatus.EmElaboracao;
  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;
  @Input() demanda: Demanda;
  @Input('equipe') equipePeD: any;


  get captacao() {
    return this.demanda.etapaAtual === this.ETAPAS_VALUES.Captacao;
  }

  get canEdit() {
    return this.demanda.status !== this.ETAPAS_STATUS.ReprovadaPermanente
      && this.demanda.status === this.ETAPAS_STATUS.Pendente
      || this.demanda.status === this.ETAPAS_STATUS.EmElaboracao;
  }


  get etapaAtual() {
    return DemandaEtapaItems[this.demanda.etapaAtual];
  }

  get demandaId() {
    return this.demanda.id.toString().padStart(3, '0');
  }

  constructor(protected app: AppService) {

  }

  ngOnInit() {
    this.etapaAtualStatus = this.demanda.status;
    const {criador, superiorDireto, revisor} = this.demanda;
    const {coordenador, gerente, diretor} = this.equipePeD;
    this.responsaveis = [criador, superiorDireto, coordenador.nomeCompleto, revisor, coordenador.nomeCompleto, gerente.nomeCompleto, diretor.nomeCompleto];
  }

  async enviarCaptacao(id) {
    if (await this.app.confirm('Enviar a demanda para captação?')) {
      this.app.showLoading();
      try {
        await this.app.demandas.enviarCaptacao(id);
        await this.app.router.navigate(['/dashboard', 'demandas', 'enviadas-para-captacao']);
      } catch (e) {
        this.app.alert('Não foi possível enviar para a captação', 'Erro!');
        console.error(e);
      }
      this.app.hideLoading();
    }
  }
}
