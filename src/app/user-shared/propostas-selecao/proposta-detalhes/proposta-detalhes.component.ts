import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-proposta-detalhes',
  templateUrl: './proposta-detalhes.component.html',
  styleUrls: ['./proposta-detalhes.component.scss']
})
export class PropostaDetalhesComponent implements OnInit {

  route: ActivatedRoute;
  proposta: any;
  progress: { type: number; loaded: number; total: number } = null;

  constructor(public activeModal: NgbActiveModal, protected file: FileService, protected cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.proposta = this.route.snapshot.data.proposta;
  }

  protected resetProgress() {
    this.progress = {loaded: 0, total: 0, type: 0};
  }

  async download(file) {
    this.resetProgress();
    //@todo Mudar o link do download
    const url = await this.file.download(`Captacoes/Suprimento/${this.proposta.captacaoId}/Propostas/${this.proposta.id}/${file}`,
      progress => {
        this.progress = progress;
        this.cdr.detectChanges();
      });
    this.file.downloadBlob(url, `${file}.pdf`);
    this.progress = null;
  }
}
