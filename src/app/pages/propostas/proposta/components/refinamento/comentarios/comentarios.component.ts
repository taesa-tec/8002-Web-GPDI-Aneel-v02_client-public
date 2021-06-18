import {Component, Input, OnInit} from '@angular/core';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {Proposta} from '@app/commons';
import {ContratoService} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() type: 'Contrato' | 'Plano';
  proposta: Proposta;
  comentarios: Array<any>;

  constructor(protected service: PropostasService, protected contratoService: ContratoService, protected fileService: FileService) {
  }

  ngOnInit(): void {
    this.service.proposta.subscribe(p => {
      this.proposta = p;
      this.loadComentarios().then();
    });
  }

  async loadComentarios() {
    switch (this.type) {
      case 'Contrato':
        this.comentarios = await this.contratoService.obter('Comentarios');
        break;
      case 'Plano':
        this.comentarios = await this.service.comentarios(this.proposta.guid);
        break;

    }
  }

  async downloadFile(file, comentario) {
    switch (this.type) {
      case 'Contrato':
        await this.fileService
          .urlToBlobDownload(
            `Propostas/${this.proposta.guid}/Contrato/Comentario/${comentario.id}/Arquivo/${file.id}`, file.name);
        break;
      case 'Plano':
        await this.fileService
          .urlToBlobDownload(
            `Propostas/Comentario/${comentario.id}/Arquivo/${file.id}`, file.name);
        break;

    }
  }

}
