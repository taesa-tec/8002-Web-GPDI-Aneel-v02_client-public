import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {Contrato} from '@app/proposta/pages/04-validacao-contratos/shared';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styles: []
})
export class HistoricoComponent implements OnInit {
  loading = false;
  contrato: Contrato;
  revisaoId;
  revisao: SafeHtml;
  revisoes: Array<any> = [];
  contratoId: number;
  captacaoId: number;

  constructor(public activeModal: NgbActiveModal, public service: PropostasService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    try {
      this.loading = true;
      this.revisoes = await this.service.getContratoRevisoes(this.captacaoId);
      if (this.revisoes.length > 0) {
        this.revisaoId = this.revisoes[0].id;
        await this.carregarRevisao(this.revisaoId);
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async carregarRevisao(id) {
    const html = await this.service.getContratoRevisaoDiff(this.captacaoId, id) as string;
    this.revisao = this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
