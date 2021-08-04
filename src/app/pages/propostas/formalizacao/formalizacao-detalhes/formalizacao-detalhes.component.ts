import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {FileService} from '@app/services/file.service';
import {HttpResponse} from '@angular/common/http';

export interface CaptacaoFormalizacao {
  titulo: string;
  fornecedor: string;
  execucaoResponsavel: string;
  aprovacaoResponsavel: string;
  id: number;
  filename: string;
}

@Component({
  selector: 'app-proposta-detalhes',
  templateUrl: './formalizacao-detalhes.component.html'
})
export class FormalizacaoDetalhesComponent implements OnInit {

  route: ActivatedRoute;
  captacao: CaptacaoFormalizacao;
  progress: { type: number; loaded: number; total: number } = null;
  aprovado: boolean;

  constructor(public activeModal: NgbActiveModal, protected file: FileService, protected cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  protected resetProgress() {
    this.progress = {loaded: 0, total: 0, type: 0};
  }

  async download() {
    this.resetProgress();
    await this.file.urlToBlobDownload(`Captacoes/${this.captacao.id}/Formalizacao/Arquivo/`, '',
      progress => {
        if (!(progress instanceof HttpResponse)) {
          this.progress = progress;
          this.cdr.detectChanges();
        }
      });
    this.progress = null;
  }
}
