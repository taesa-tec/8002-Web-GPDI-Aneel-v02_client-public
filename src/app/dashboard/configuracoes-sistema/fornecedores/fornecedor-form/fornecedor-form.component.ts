import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app/services/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppValidators } from '@app/models';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent implements OnInit {

  fornecedor: any;
  status: boolean;

  formFornecedor: FormGroup;

  constructor(
    protected app: AppService, 
    private fb: FormBuilder, 
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    const fornecedor: any = this.fornecedor;
    this.status = this.fornecedor ? true:false;

    this.formFornecedor = this.fb.group({
      id: [fornecedor && fornecedor.id || ''],
      nome: [fornecedor && fornecedor.nome || '', [Validators.required]],
      cnpj: [fornecedor && fornecedor.cnpj || '', [Validators.required, AppValidators.cnpj]],
      nomeResponsavel: [{value: fornecedor && fornecedor.nomeResponsavel || '', disabled: this.status}, [Validators.required]],
      emailResponsavel: [{value: fornecedor && fornecedor.nomeResponsavel || '', disabled: this.status}, [Validators.email, Validators.required]],
      status: [fornecedor && fornecedor.status || true],
    });
  }

  trocarResponsavel(status) {
    if(status) {
      this.formFornecedor.get('nomeResponsavel').enable();
      this.formFornecedor.get('emailResponsavel').enable();
    } else {
      this.formFornecedor.get('nomeResponsavel').disable();
      this.formFornecedor.get('emailResponsavel').disable();
    }
  }

  async onSubmit() {
    if (this.formFornecedor.valid) {
      const fornecedor: any = this.formFornecedor.value;

      try {
        if (fornecedor.id) {
          // await this.app.fornecedores.editarFornecedor(fornecedor);
          this.app.alert('Fornecedor editado com sucesso');
        } else {
          //await this.app.fornecedores.criarFornecedor(fornecedor);
          this.app.alert('Fornecedor adicionado com sucesso');
        }
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o fornecedor');
        console.error(e);
      }
    }
  }

}
