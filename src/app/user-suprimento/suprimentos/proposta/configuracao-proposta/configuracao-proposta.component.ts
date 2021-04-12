import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '@app/services/app.service';
import { ViewContratoComponent } from '../../../../user-shared/components/view-contrato/view-contrato.component';

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
  ) { }

  ngOnInit() {
    this.configForm();
  }

  async configForm() {
    //this.contratos = await this.app.fornecedores.getContratos();
    //this.fornecedores = await this.app.fornecedores.getFornecedores();
    this.contratos = this.getDataContratos();
    this.fornecedores = this.getDataFornecedores();

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
    if(this.formConfig.valid) {
      console.log(this.formConfig.value);
      console.log(this.uploads);
      this.app.alert('Configuração da proposta salva com sucesso');
    }
  }

  getDataContratos() {
    return [
      {
        id: '1',
        titulo: 'Contrato 1',
        categoria: 'Fornecedor',
        texto: '<p>Lorem Ipsum 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n'
      },
      {
        id: '2',
        titulo: 'Contrato 2',
        categoria: 'Executor',
        texto: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>'
      },
      {
        id: '3',
        titulo: 'Contrato 3',
        categoria: 'Executor',
        texto: '<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.</p>'
      },
      {
        id: '4',
        titulo: 'Contrato 4',
        categoria: 'Executor',
        texto: '<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from</p>'
      },
      {
        id: '5',
        titulo: 'Contrato 5',
        categoria: 'Fornecedor',
        texto: '<p class=\'text-danger\'>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with</p>\n'
      }
    ];
  }

  getDataFornecedores() {
    return [
      {
        id: '1',
        nome: 'Nome Fornecedor',
        cnpj: '05.254.665/0001-45',
        nomeResponsavel: 'Nome Responsável',
        emailResponsavel: 'responsavel@gmail.com',
        status: true
      },
      {
        id: '2',
        nome: 'Nome Fornecedor 2',
        cnpj: '24.177.202/0001-71',
        nomeResponsavel: 'Nome Responsável',
        emailResponsavel: 'responsavel@gmail.com',
        status: true
      },
      {
        id: '3',
        nome: 'Nome Fornecedor 3',
        cnpj: '10.874.254/0001-92',
        nomeResponsavel: 'Nome Responsável 3',
        emailResponsavel: 'responsavel3@gmail.com',
        status: true
      }
    ];
  }

}
