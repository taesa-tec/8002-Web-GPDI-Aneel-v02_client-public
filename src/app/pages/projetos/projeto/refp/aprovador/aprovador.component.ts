import {Component, Inject, OnInit} from '@angular/core';
import {RegistroInfo, RegistroObservacao} from '@app/pages/projetos/projeto/refp/registroInfo';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadingController} from '@app/services';
import {FileService} from '@app/services/file.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {PROJETO_IS_RESPONSAVEL} from '@app/pages/projetos/projeto/projeto';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-aprovador',
  templateUrl: './aprovador.component.html',
  styles: []
})
export class AprovadorComponent implements OnInit {

  registro: RegistroInfo;
  observacoes: RegistroObservacao[] = [];
  observacao = this.fb.control('', Validators.required);
  formReprovacao = this.fb.group({
    observacao: this.observacao
  });
  isResponsavel = false;

  constructor(
    @Inject(PROJETO_IS_RESPONSAVEL) public isResponsavelProjeto: BehaviorSubject<boolean>,
    public activeModal: NgbActiveModal, protected modal: NgbModal,
    protected service: ProjetoService,
    protected loading: LoadingController, protected file: FileService,
    protected fb: FormBuilder) {
  }


  ngOnInit(): void {
    if (!this.registro) {
      throw new Error('Registro não foi atribuido!');
    }
    this.isResponsavelProjeto.subscribe(b => this.isResponsavel = b);
  }

  modalReprovar(template) {
    this.modal.open(template, {size: 'lg'});
  }

  async setStatusRegistro(modal, status: boolean, obs?: string) {
    this.loading.show().then();
    await this.service.setStatusRegistro(this.registro.projetoId, this.registro.id, status, obs);
    this.loading.hide();
    modal?.close();
    this.activeModal.close();
  }


  async downloadComprovante() {
    await this.file.urlToBlobDownload(`Projetos/${this.registro.projetoId}/RegistroFinanceiro/${this.registro.id}/Comprovante`, null);
  }
}
