import {Component, OnInit} from '@angular/core';
import {Registro, RegistroInfo, RegistroObservacao} from '@app/projetos/projeto/refp/registroInfo';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService, LoadingController} from '@app/services';
import {FileService} from '@app/services/file.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-refp-editar',
  templateUrl: './editar.component.html',
  styles: []
})
export class EditarComponent implements OnInit {

  items: any;
  registro: Registro;
  observacoes: RegistroObservacao[] = [];
  form = this.fb.group({
    observacaoInterna: ['', Validators.required],
  });
  file: File = null;

  get valid() {
    return this.form.valid && (this.registro.comprovanteId != null || this.file != null);
  }

  constructor(public activeModal: NgbActiveModal,
              protected app: AppService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected modal: NgbModal,
              protected service: ProjetoService,
              protected loading: LoadingController,
              protected fileService: FileService,
              protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.registro) {
      throw new Error('Registro não foi atribuido!');
    }
  }

  fileChange(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this.file = files.length > 0 ? files.item(0) : null;
  }

  async setStatusRegistro(modal, status: boolean, obs?: string) {
    this.loading.show().then();
    await this.service.setStatusRegistro(this.registro.projetoId, this.registro.id, status, obs);
    this.loading.hide();
    modal.close();
    this.activeModal.close();
  }

  async downloadComprovante() {
    await this.fileService
      .urlToBlobDownload(`Projetos/${this.registro.projetoId}/RegistroFinanceiro/${this.registro.id}/Comprovante?t=${Date.now()}`, null);
  }

  async deletarComprovante() {
    this.registro.comprovanteId = null;
  }

  async submit() {
    if (!this.valid) {
      return;
    }
    try {
      this.loading.show().then();
      const tipo = this.registro.tipo === 'RegistroFinanceiroRh' ? 'RecursoHumano' : 'RecursoMaterial';
      await this.service.put(`${this.registro.projetoId}/RegistroFinanceiro/${tipo}/${this.registro.id}`, this.form.value);
      if (this.file) {
        await this.service.upload([this.file], `${this.registro.projetoId}/RegistroFinanceiro/${this.registro.id}/Comprovante`);
      }
      this.activeModal.close();
      this.app.alert('Registro Salvo com sucesso, obrigado').then();
      this.router.navigate(['./'], {relativeTo: this.route, fragment: null}).then();
    } catch (e) {
      console.error(e);
      this.app.alertError('Erro ao salvar o registro, tente novamente mais tarde').then();
    } finally {
      this.loading.hide();

    }
  }
}
