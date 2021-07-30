import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {AppValidators} from '@app/commons';
import {PropostaNodeFormDirective} from '@app/pages/propostas/proposta/directives';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

interface Empresa {
  required: boolean;
  cnpj: string;
  uf: null | string;
  razaoSocial: string;
  funcao: string;
  codigo: null | string;
  propostaId: number;
  id: number;
}

@Component({
  selector: 'app-co-executor-form',
  templateUrl: './co-executor-form.component.html',
  styleUrls: ['./co-executor-form.component.scss'],
  providers: []
})
export class CoExecutorFormComponent extends PropostaNodeFormDirective implements OnInit {
  coExecutor: Empresa;
  funcaoCtrl = this.fb.control('', Validators.required);
  cnpjCtrl = this.fb.control('');
  ufCtrl = this.fb.control('');
  codigoCtrl = this.fb.control('');
  form = this.fb.group({
    id: [0],
    funcao: this.funcaoCtrl,
    cnpj: this.cnpjCtrl,
    uf: this.ufCtrl,
    razaoSocial: ['', Validators.required],
    codigo: this.codigoCtrl
  });


  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
    app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(propostaCanEdit, app, fb, activeModal, service);
  }

  ngOnInit(): void {

    this.funcaoCtrl.valueChanges.subscribe(funcao => {
      this.ufCtrl.clearValidators();
      this.cnpjCtrl.clearValidators();
      this.codigoCtrl.clearValidators();
      switch (funcao) {
        case 'Executora':
          this.codigoCtrl.setValue('');
          this.ufCtrl.setValidators(Validators.required);
          this.cnpjCtrl.setValidators([Validators.required, AppValidators.cnpj]);
          break;
        case 'Cooperada':
          this.ufCtrl.setValue('');
          this.cnpjCtrl.setValue('');
          this.codigoCtrl.setValidators(Validators.required);
          break;
      }
      this.form.updateValueAndValidity();
    });


    if (this.coExecutor) {
      this.form.patchValue(this.coExecutor);
      if (this.coExecutor.required) {
        this.form.disable();
      }
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
