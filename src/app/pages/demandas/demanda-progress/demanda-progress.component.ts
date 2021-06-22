import {Component, OnInit, Input, Inject} from '@angular/core';
import {DemandaEtapa, DemandaEtapaItem, DemandaEtapaItems, DemandaEtapaStatus} from '../commons';
import {Demanda} from '@app/commons/demandas';
import {ROOT_URL, User} from '@app/commons';
import {AppService} from '@app/services/app.service';

@Component({
  selector: 'app-demanda-progress',
  styleUrls: ['demanda-progress.component.scss'],
  templateUrl: 'demanda-progress.component.html',

})

export class DemandaProgressComponent implements OnInit {
  etapas: Array<DemandaEtapaItem> = DemandaEtapaItems;
  responsaveis: Array<User>;
  etapaAtualStatus: DemandaEtapaStatus = DemandaEtapaStatus.EmElaboracao;
  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;
  @Input() demanda: Demanda;
  @Input('equipe') equipePeD: any;
  root_url = '';


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

  constructor(protected app: AppService, @Inject(ROOT_URL) root_url) {
    this.root_url = root_url;
  }

  ngOnInit() {
    this.etapaAtualStatus = this.demanda.status;
    const {criador, superiorDireto, revisor} = this.demanda;
    const {coordenador, gerente, diretor} = this.equipePeD;
    this.responsaveis = [
      criador,
      superiorDireto,
      coordenador.nomeCompleto,
      revisor,
      coordenador.nomeCompleto,
      gerente.nomeCompleto,
      diretor.nomeCompleto
    ];
  }

  async enviarCaptacao(id) {
    if (await this.app.confirm('Enviar a demanda para captação?')) {
      this.app.showLoading();
      try {
        await this.app.demandas.enviarCaptacao(id);
        await this.app.router.navigate(['/demandas', 'enviadas-para-captacoes']);
      } catch (e) {
        this.app.alert('Não foi possível enviar para a captação', 'Erro!').then();
        console.error(e);
      }
      this.app.hideLoading();
    }
  }
}
