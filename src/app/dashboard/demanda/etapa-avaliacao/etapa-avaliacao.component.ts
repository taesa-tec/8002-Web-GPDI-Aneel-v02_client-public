import {Component, OnInit} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/models/demandas';
import {DemandaEtapa, DemandaEtapaStatus} from '@app/dashboard/demandas/commons';
import {environment} from '@env/environment';

@Component({
  selector: 'app-etapa-avaliacao',
  templateUrl: './etapa-avaliacao.component.html',
  styleUrls: []
})
export class EtapaAvaliacaoComponent implements OnInit {

  constructor(protected  app: AppService, protected route: ActivatedRoute) {
  }

  protected $demanda: Demanda;
  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;
  anexos = [];
  formKey = 'especificacao-tecnica';
  pdfUrl = null;


  get demanda(): Demanda {
    return this.$demanda;
  }

  set demanda(value: Demanda) {
    this.pdfUrl = `${environment.api_url}/Demandas/${value.id}/Form/${this.formKey}/Pdf`;
    this.$demanda = value;
  }

  async ngOnInit() {
    this.demanda = this.route.parent.snapshot.data.demanda;
    this.anexos = await this.app.demandas.getAnexos(this.demanda.id);
  }

  async download(anexo) {
    console.log(anexo);
    if (this.demanda.id) {
      this.app.showLoading();
      try {
        await this.app.demandas.downloadAnexo(this.demanda.id, anexo);
      } catch (e) {
        console.error(e);
      }
      this.app.hideLoading();
    } else {
      console.error('Sem demanda!');
    }
  }

}
