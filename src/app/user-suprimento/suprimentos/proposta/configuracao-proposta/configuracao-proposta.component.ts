import {Component, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from '@app/services/app.service';
import {ViewContratoComponent} from '../../../../user-shared/components/view-contrato/view-contrato.component';

@Component({
  selector: 'app-configuracao-proposta',
  templateUrl: './configuracao-proposta.component.html',
  styleUrls: ['./configuracao-proposta.component.scss']
})
export class ConfiguracaoPropostaComponent implements OnInit {

  contratos: Array<any>;
  fornecedores: Array<any>;
  uploads: Array<File> = [];

  formConfig: FormGroup;
  arrayContratos = new FormArray([]);
  arrayFornecedores = new FormArray([]);

  constructor(
    protected app: AppService,
    private fb: FormBuilder,
    private modal: NgbModal
  ) {
  }

  ngOnInit() {
    this.configForm();
  }

  async configForm() {


    this.formConfig = this.fb.group({
      contratos: this.arrayContratos,
      consideracoes: ['', [Validators.required]],
      dataProposta: ['', [Validators.required]],
      fornecedores: this.arrayFornecedores
    });

    this.addContrato();
    this.addFornecedor();
  }

  getContratos(current: string) {
    const selecteds = this.arrayContratos.value;
    return this.contratos.filter(item => selecteds.indexOf(item.id) === -1 || item.id === current);
  }

  abrirContrato(id: number) {
    const modalRef = this.modal.open(ViewContratoComponent, {size: 'lg'});
    modalRef.componentInstance.contrato = this.contratos.find(item => item.id === id);
  }

  addContrato(id = '') {
    this.arrayContratos.push(this.fb.control(id, [Validators.required]));
  }

  removeContrato(index: number) {
    this.arrayContratos.removeAt(index);
  }

  getFornecedores(current: string) {
    const selecteds = this.arrayFornecedores.value;
    return this.fornecedores.filter(item => selecteds.indexOf(item.id) === -1 || item.id === current);
  }

  addFornecedor(id = '') {
    this.arrayFornecedores.push(this.fb.control(id, [Validators.required]));
  }

  removeFornecedor(index: number) {
    this.arrayFornecedores.removeAt(index);
  }

  changeFile(e) {
    this.uploads.push(e.target.files.item(0));
  }

  deletarArquivo(index) {
    this.uploads.splice(index, 1);
  }

  onSubmit() {
    if (this.formConfig.valid) {
      console.log(this.formConfig.value);
      console.log(this.uploads);
      this.app.alert('Configuração da proposta salva com sucesso');
    }
  }
}
