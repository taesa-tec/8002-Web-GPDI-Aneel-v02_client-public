import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {DemandaEtapa, DemandaEtapaStatus} from '../commons';
import {Demanda} from '@app/models/demandas';
import {EquipePeD} from '@app/models';

@Component({
  selector: 'app-demandas-list',
  templateUrl: './demandas-list.component.html',
  styleUrls: ['./demandas-list.component.scss']
})
export class DemandasListComponent implements OnInit {

  list = [
    {value: DemandaEtapa.Elaboracao, text: 'Elaboração'},
    {value: DemandaEtapa.PreAprovacao, text: 'Pré - Aprovação Superior Direto'},
    {value: DemandaEtapa.RevisorPendente, text: 'Revisor Pendente'},
    {value: DemandaEtapa.AprovacaoRevisor, text: 'Aprovação Revisor'},
    {value: DemandaEtapa.AprovacaoCoordenador, text: 'Aprovação Coordenador P&D'},
    {value: DemandaEtapa.AprovacaoGerente, text: 'Aprovação Gerente P&D'},
    {value: DemandaEtapa.AprovacaoDiretor, text: 'Aprovação Diretor P&D'},
  ];
  demandas: Array<Demanda> = [];
  _demandas: Array<Demanda> = [];
  etapaFilter = '';
  equipe: EquipePeD;


  constructor(protected route: ActivatedRoute, protected router: Router, protected app: AppService) {
  }

  async ngOnInit() {
    const data = this.route.snapshot.data;
    this.equipe = await this.app.sistema.getEquipePeD();
    if (data.demandaEtapaStatus !== undefined) {
      const status: DemandaEtapaStatus = data.demandaEtapaStatus;
      this.getDemandas(status);
    } else if (data.demandaEtapaCaptacao) {
      this.getDemandas('Captacao');
    }

  }

  filter() {
    if (this.etapaFilter === '') {
      this.demandas = this._demandas;
    } else {
      this.demandas = this._demandas.filter(demanda => demanda.etapaAtual === parseFloat(this.etapaFilter));
    }
  }


  async getDemandas(status: DemandaEtapaStatus | 'Captacao') {


    let _status: 'Reprovadas' | 'Aprovadas' | 'EmElaboracao' | 'Captacao' = 'EmElaboracao';

    switch (status) {
      case DemandaEtapaStatus.EmElaboracao:
        _status = 'EmElaboracao';
        break;
      case DemandaEtapaStatus.ReprovadaPermanente:
      case DemandaEtapaStatus.Reprovada:

        _status = 'Reprovadas';
        break;
      case DemandaEtapaStatus.Aprovada:
        _status = 'Aprovadas';
        break;
      case 'Captacao':
        _status = 'Captacao';

    }
    this._demandas = await this.app.demandas.getDemandasByStatus(_status).toPromise();
    this.filter();
  }
}

