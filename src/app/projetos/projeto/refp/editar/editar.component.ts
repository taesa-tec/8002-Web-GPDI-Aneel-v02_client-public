import {Component, OnInit} from '@angular/core';
import {Registro, RegistroInfo, RegistroObservacao} from '@app/projetos/projeto/refp/registroInfo';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingController} from '@app/services';
import {FileService} from '@app/services/file.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';

@Component({
  selector: 'app-refp-editar',
  templateUrl: './editar.component.html',
  styles: []
})
export class EditarComponent implements OnInit {

  items: any;
  registro: Registro;
  observacoes: RegistroObservacao[] = [];
  observacao = this.fb.control('', Validators.required);
  form = this.fb.group({});

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

  formChange(value) {
    console.log(value);
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
