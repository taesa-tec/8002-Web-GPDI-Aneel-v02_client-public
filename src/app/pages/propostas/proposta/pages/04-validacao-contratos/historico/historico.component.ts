import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {Contrato} from '@app/pages/propostas/proposta/pages/04-validacao-contratos/shared';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Proposta} from '@app/commons';


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
  proposta: Proposta;

  constructor(public activeModal: NgbActiveModal, public service: PropostasService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    this.service.proposta.subscribe(async p => {
      this.proposta = p;
      try {
        this.loading = true;
        this.revisoes = await this.service.getContratoRevisoes(this.proposta.guid);
        if (this.revisoes.length > 0) {
          this.revisaoId = this.revisoes[0].id;
          await this.carregarRevisao(this.revisaoId);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    });
  }

  async carregarRevisao(id) {
    const html = await this.service.getContratoRevisaoDiff(this.proposta.guid, id) as string;
    this.revisao = this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
