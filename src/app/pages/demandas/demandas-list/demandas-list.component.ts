import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {DemandaEtapa, DemandaEtapaStatus} from '../commons';
import {Demanda} from '@app/commons/demandas';
import {EquipePeD} from '@app/commons';
import {GestaoDeDemandasComponent} from '@app/pages/demandas/demandas.component';

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
    {value: DemandaEtapa.AprovacaoCoordenador, text: 'Aprovação Coordenador PDI'},
    {value: DemandaEtapa.AprovacaoGerente, text: 'Aprovação Gerente PDI'},
    {value: DemandaEtapa.AprovacaoDiretor, text: 'Aprovação Diretor PDI'},
  ];
  demandas: Array<Demanda> = [];
  _demandas: Array<Demanda> = [];
  etapaFilter = '';
  equipe: EquipePeD;


  constructor(protected route: ActivatedRoute, protected router: Router,
              protected app: AppService,
              protected parent: GestaoDeDemandasComponent) {
  }

  async ngOnInit() {
    this.equipe = this.parent.equipe;
    this.route.data.subscribe(data => {
      this._demandas = data.demandas;
      this.filter();
    });

  }

  filter() {
    if (this.etapaFilter === '') {
      this.demandas = this._demandas;
    } else {
      this.demandas = this._demandas.filter(demanda => demanda.etapaAtual === parseFloat(this.etapaFilter));
    }
  }

}

