import {Component, Input, OnInit} from '@angular/core';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {Proposta} from '@app/commons';
import {ContratoService} from '@app/proposta/services/proposta-service-base.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() type: 'Contrato' | 'Plano';
  proposta: Proposta;
  comentarios: Array<any>;

  constructor(protected service: PropostasService, protected contratoService: ContratoService) {
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
        break;

    }
  }

}
