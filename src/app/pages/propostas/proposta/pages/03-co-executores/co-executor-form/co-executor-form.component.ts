import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {AppValidators} from '@app/commons';
import {PropostaNodeFormDirective} from '@app/pages/propostas/proposta/directives';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';

@Component({
  selector: 'app-co-executor-form',
  templateUrl: './co-executor-form.component.html',
  styleUrls: ['./co-executor-form.component.scss'],
  providers: []
})
export class CoExecutorFormComponent extends PropostaNodeFormDirective implements OnInit {
  coExecutor: any;
  form = this.fb.group({
    id: [0],
    cnpj: ['', [Validators.required, AppValidators.cnpj]],
    uf: ['', Validators.required],
    razaoSocial: ['', Validators.required],
    funcao: ['', Validators.required]
  });


  constructor(
    @Inject(PROPOSTA_CAN_EDIT) canEdit: boolean,
    app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(canEdit, app, fb, activeModal, service);
  }

  ngOnInit(): void {
    if (this.coExecutor) {
      this.form.patchValue(this.coExecutor);
    }
    if (!this.canEdit) {
      this.form.disable();
    }

  }


  async excluirEmpresa() {
    if (this.coExecutor && await this.app.confirm('Tem certeza que deseja excluir esta entidade?')) {
      try {

        await this.service.excluir(this.coExecutor.id);
        this.activeModal.close(true);
      } catch (e) {
        console.log(e);
        if (e.error && e.error.detail) {
          this.app.alert(e.error.detail, 'Erro').then();
        } else {
          this.app.alert('Erro ao remover entidade, tente novamente mais tarde', 'Erro').then();
        }
      }
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.salvar(this.form.value);
        this.activeModal.close(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

}
