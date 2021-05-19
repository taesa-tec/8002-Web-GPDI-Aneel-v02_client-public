import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {FileService} from '@app/services/file.service';

export interface CaptacaoSelecao {
  titulo: string;
  proposta: string;
  responsavel: string;
  dataAlvo: Date;
  id: number;
}

@Component({
  selector: 'app-proposta-detalhes',
  templateUrl: './formalizacao-detalhes.component.html'
})
export class FormalizacaoDetalhesComponent implements OnInit {

  route: ActivatedRoute;
  captacao: CaptacaoSelecao;
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
    const url = await this.file.download(`Captacoes/${this.captacao.id}/Formalizacao/Arquivo/`,
      progress => {
        this.progress = progress;
        this.cdr.detectChanges();
      });
    this.file.downloadBlob(url, `${this.captacao.titulo}(Formalização).pdf`);
    this.progress = null;
  }
}
