import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AppService} from '@app/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppValidators} from '@app/commons';
import {ServiceBase} from '@app/services/service-base.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent implements OnInit {

  private _fornecedor: any;

  get fornecedor(): any {
    return this._fornecedor;
  }

  set fornecedor(value: any) {
    if (value) {
      this._fornecedor = value;
      this.form.patchValue(value);
      const nomeCtrl = this.form.get('responsavelNome');
      const emailCtrl = this.form.get('responsavelEmail');
      nomeCtrl.clearValidators();
      emailCtrl.clearValidators();
      nomeCtrl.disable();
      emailCtrl.disable();
    }
  }

  form = this.fb.group({
    id: [0, Validators.required],
    ativo: [true],
    nome: ['', Validators.required],
    cnpj: ['', [Validators.required, AppValidators.cnpj]],
    responsavelNome: [''],
    responsavelEmail: [''],
    trocarResponsavel: [false]
  });

  constructor(
    protected app: AppService,
    protected service: ServiceBase<any>,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.form.get('trocarResponsavel').valueChanges.subscribe(trocar => {
      if (trocar) {
        this.form.get('responsavelNome').enable();
        this.form.get('responsavelEmail').enable();
      } else {
        this.form.get('responsavelNome').disable();
        this.form.get('responsavelEmail').disable();
      }
    });
  }


  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.salvar(this.form.value);
        await this.app.alert('Fornecedor salvo com sucesso').then();
        this.activeModal.close(true);

      } catch (e) {
        this.app.alert('Não foi possível salvar o Fornecedor').then();
        console.error(e);
      }
    }
  }

}
