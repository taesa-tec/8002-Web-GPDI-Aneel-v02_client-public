import {ChangeDetectorRef, Component} from '@angular/core';
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
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent{

  route: ActivatedRoute;
  captacao: any;
  progress: { type: number; loaded: number; total: number } = null;

  constructor(public activeModal: NgbActiveModal, protected file: FileService, protected cdr: ChangeDetectorRef) {
  }


  protected resetProgress() {
    this.progress = {loaded: 0, total: 0, type: 0};
  }

  async download() {
    this.resetProgress();
    const url = await this.file.download(`Captacoes/${this.captacao.id}/IdentificaoRisco/Arquivo`,
      progress => {
        this.progress = progress;
        this.cdr.detectChanges();
      });
    this.file.downloadBlob(url, `${this.captacao.titulo}-(Riscos).pdf`);
    this.progress = null;
  }
}
