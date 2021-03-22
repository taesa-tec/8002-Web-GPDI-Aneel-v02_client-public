import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-proposta-detalhes',
  templateUrl: './proposta-detalhes.component.html',
  styleUrls: []
})
export class PropostaDetalhesComponent implements OnInit {

  proposta: any;
  progress: { type: number; loaded: number; total: number } = null;

  constructor(public activeModal: NgbActiveModal, protected file: FileService, protected cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  protected resetProgress() {
    this.progress = {loaded: 0, total: 0, type: 0};
  }

  async download(file) {
    try {
      this.resetProgress();
      const url = await this.file.download(`Fornecedor/Propostas/${this.proposta.captacaoId}/Download/${file}`,
        progress => {
          this.progress = progress;
          this.cdr.detectChanges();
        });
      this.file.downloadBlob(url, `${file}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      this.progress = null;

    }
  }
}
