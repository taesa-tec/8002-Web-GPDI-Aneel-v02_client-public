import { Component, OnInit } from '@angular/core';
import { EtapasList, TodasDemandas } from "@app/dashboard/demandas/demandas-teste";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppService } from '@app/services/app.service';
import { DemandaEtapaStatus } from '../commons';
import { filter } from 'rxjs/operators';
import { Demanda } from '@app/models/demandas';

@Component({
  selector: 'app-demandas-list',
  templateUrl: './demandas-list.component.html',
  styleUrls: ['./demandas-list.component.scss']
})
export class DemandasListComponent implements OnInit {

  list = EtapasList;
  demandas: Array<Demanda> = [];


  constructor(protected route: ActivatedRoute, protected router: Router, protected app: AppService) { }

  async ngOnInit() {

    const data = this.route.snapshot.data;
    if (data.demandaEtapaStatus !== undefined) {
      const status: DemandaEtapaStatus = data.demandaEtapaStatus;
      this.getDemandas(status);
    } else if (data.demandaEtapaCaptacao) {
      this.getDemandas('Captacao');
    }

  }

  async getDemandas(status: DemandaEtapaStatus | 'Captacao') {


    let _status: 'Reprovadas' | 'Aprovadas' | 'EmElaboracao' | 'Captacao' = "EmElaboracao";

    switch (status) {
      case DemandaEtapaStatus.EmElaboracao:
        _status = "EmElaboracao";
        break;
      case DemandaEtapaStatus.ReprovadaPermanente:
      case DemandaEtapaStatus.Reprovada:

        _status = "Reprovadas";
        break;
      case DemandaEtapaStatus.Aprovada:
        _status = "Aprovadas";
        break;
      case 'Captacao':
        _status = 'Captacao';

    }
    this.demandas = await this.app.demandas.getDemandasByStatus(_status).toPromise();

  }
}

