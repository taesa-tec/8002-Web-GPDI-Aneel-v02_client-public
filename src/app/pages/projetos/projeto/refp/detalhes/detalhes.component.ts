import {Component, OnInit} from '@angular/core';
import {RegistroInfo, RegistroObservacao} from '@app/pages/projetos/projeto/refp/registroInfo';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingController} from '@app/services';
import {FileService} from '@app/services/file.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';

@Component({
  selector: 'app-refp-detalhes',
  templateUrl: './detalhes.component.html',
  styles: []
})
export class DetalhesComponent implements OnInit {

  registro: RegistroInfo;
  observacoes: RegistroObservacao[] = [];
  observacao = this.fb.control('', Validators.required);
  formReprovacao = this.fb.group({
    observacao: this.observacao
  });

  constructor(public activeModal: NgbActiveModal, protected modal: NgbModal,
              protected service: ProjetoService,
              protected loading: LoadingController, protected file: FileService,
              protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.registro) {
      throw new Error('Registro não foi atribuido!');
    }
  }

  modalReprovar(template) {
    this.modal.open(template, {size: 'lg'});
  }

  async setStatusRegistro(modal, status: boolean, obs?: string) {
    this.loading.show().then();
    await this.service.setStatusRegistro(this.registro.projetoId, this.registro.id, status, obs);
    this.loading.hide();
    modal.close();
    this.activeModal.close();
  }


  async downloadComprovante() {
    await this.file.urlToBlobDownload(`Projetos/${this.registro.projetoId}/RegistroFinanceiro/${this.registro.id}/Comprovante`, null);
  }
}
