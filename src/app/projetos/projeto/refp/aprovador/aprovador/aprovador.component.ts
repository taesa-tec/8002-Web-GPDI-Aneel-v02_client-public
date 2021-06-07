import {Component, OnInit} from '@angular/core';
import {Registro, RegistroObservacao} from '@app/projetos/projeto/refp/registro';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingController} from '@app/services';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-aprovador',
  templateUrl: './aprovador.component.html',
  styles: []
})
export class AprovadorComponent implements OnInit {

  registro: Registro;
  observacoes: RegistroObservacao[] = [];

  constructor(public activeModal: NgbActiveModal, protected loading: LoadingController, protected file: FileService) {
  }

  ngOnInit(): void {
    if (!this.registro) {
      throw new Error('Registro não foi atribuido!');
    }
  }

  async downloadComprovante() {
    await this.file.urlToBlobDownload(`Projetos/${this.registro.projetoId}/RegistroFinanceiro/${this.registro.id}/Comprovante`, null);
  }
}
