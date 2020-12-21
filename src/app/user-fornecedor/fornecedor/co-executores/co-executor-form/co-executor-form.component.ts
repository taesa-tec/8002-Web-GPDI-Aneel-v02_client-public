import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '@app/services/app.service';
import { AppValidators } from '@app/commons';
import { ViewContratoComponent } from '../view-contrato/view-contrato.component';

@Component({
  selector: 'app-co-executor-form',
  templateUrl: './co-executor-form.component.html',
  styleUrls: ['./co-executor-form.component.scss']
})
export class CoExecutorFormComponent implements OnInit {

  coExecutor: any;
  status: boolean = false;

  formCoExecutor: FormGroup;

  // DADOS DE TESTE
  ufs = [
    {nome: 'RJ'},
    {nome: 'SP'},
    {nome: 'CE'}
  ];

  modelosContratos = [
    {nome: 'Contrato 1'},
    {nome: 'Contrato 2'},
    {nome: 'Contrato 3'}
  ];

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    private modal: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formCoExecutor = this.fb.group({
      cnpj: ['', [Validators.required, AppValidators.cnpj]],
      uf: ['', [Validators.required]],
      razaoSocial: ['', [Validators.required]],
      contrato: ['', [Validators.required]]
    });

    if(this.coExecutor){
      this.formCoExecutor.patchValue(this.coExecutor);
      this.status = true;
    }

  }

  async abrirContrato() {
    console.log(this.formCoExecutor.get('contrato').value);

    const modalRef = this.modal.open(ViewContratoComponent, {size: 'lg'});
    modalRef.componentInstance.contrato = this.formCoExecutor.get('contrato').value;

    try {
      await modalRef.result;

    } catch(e) {
      console.log(e);
    }
  }

  excluirEmpresa() {
    console.log("Excluir Empresa");
  }

  async onSubmit() {
    if (this.formCoExecutor.valid) {
      const coExecutor = this.formCoExecutor.value;

      try {
        if (this.coExecutor) {
          console.log(coExecutor, 'Editar');
          this.app.alert('Co-Executor editado com sucesso');
        } else {
          console.log(coExecutor, 'Criar');
          this.app.alert('Co-Executor adicionado com sucesso');
        }
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o Co-Executor');
        console.error(e);
      }
    }
  }

}
