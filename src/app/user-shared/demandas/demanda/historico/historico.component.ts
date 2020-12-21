import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricoComponent implements OnInit {

  form: string;
  demandaId: number;
  historico: Array<{ id: number, createdAt: string, revisao: number }> = [];
  revisaoId = 0;
  html: SafeHtml;
  revisaoAtual: string;
  lastUpdate: string;
  loading = false;

  set compartivo(value: { revisaoAtual: string, html: string, lastUpdate: string }) {
    this.html = value.html;
    this.revisaoAtual = value.revisaoAtual;
    this.lastUpdate = value.lastUpdate;
  }

  constructor(public app: AppService, public activeModal: NgbActiveModal) {
  }


  async ngOnInit() {
    await this.loadHistoricos();
  }

  async loadHistoricos() {
    if (!this.form || !this.demandaId) {
      this.activeModal.dismiss('Form ou demanda não informado');
      return;
    }
    this.loading = true;
    this.historico = await this.app.demandas.getDemandaFormHistorico(this.demandaId, this.form);
    if (this.historico.length > 0) {
      this.revisaoId = this.historico[0].id;
      await this.loadDiff(this.revisaoId);
    }
    this.loading = false;
  }

  async loadDiff(revisaoId) {
    this.compartivo = {revisaoAtual: '', html: '', lastUpdate: ''};
    this.compartivo = await this.app.demandas.getDemandaFormHistoricoDiff(this.demandaId, this.form, revisaoId);
  }

}
