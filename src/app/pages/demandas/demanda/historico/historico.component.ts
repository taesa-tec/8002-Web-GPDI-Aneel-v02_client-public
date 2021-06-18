import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {SafeHtml} from '@angular/platform-browser';
import {DEMANDA} from '@app/pages/demandas/demanda/providers';
import {Demanda} from '@app/commons/demandas';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricoComponent implements OnInit {

  form: string;
  historico: Array<{ id: number; createdAt: string; revisao: number }> = [];
  revisaoId = 0;
  html: SafeHtml;
  revisaoAtual: string;
  lastUpdate: string;
  loading = false;
  demanda: Demanda;

  set compartivo(value: { revisaoAtual: string; html: string; lastUpdate: string }) {
    this.html = value.html;
    this.revisaoAtual = value.revisaoAtual;
    this.lastUpdate = value.lastUpdate;
  }

  constructor(
    public app: AppService, public activeModal: NgbActiveModal) {
  }


  async ngOnInit() {
    await this.loadHistoricos();
  }

  async loadHistoricos() {
    if (!this.form || !this.demanda) {
      this.activeModal.dismiss('Form ou demanda não informado');
      return;
    }
    this.loading = true;
    this.historico = await this.app.demandas.getDemandaFormHistorico(this.demanda.id, this.form);
    if (this.historico.length > 0) {
      this.revisaoId = this.historico[0].id;
      await this.loadDiff(this.revisaoId);
    }
    this.loading = false;
  }

  async loadDiff(revisaoId) {
    this.compartivo = {revisaoAtual: '', html: '', lastUpdate: ''};
    this.compartivo = await this.app.demandas.getDemandaFormHistoricoDiff(this.demanda.id, this.form, revisaoId);
  }

}
