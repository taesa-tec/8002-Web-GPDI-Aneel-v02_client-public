import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AppService } from '@app/services/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-criar-captacao',
  templateUrl: './criar-captacao.component.html',
  styleUrls: ['./criar-captacao.component.scss']
})
export class CriarCaptacaoComponent implements OnInit {

  projeto: any;
  fornecedores: Array<any> = [];

  formCaptacao: FormGroup;
  arrayFornecedores = new FormArray([]);

  constructor(
    protected app: AppService, 
    private fb: FormBuilder, 
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.configForm();
  }

  async configForm() {
    //this.fornecedores = await this.app.fornecedores.getFornecedores();
    this.fornecedores = await this._getFornecedores();

    this.formCaptacao = this.fb.group({
      idProjeto: [this.projeto.id, [Validators.required]],
      fornecedores: this.arrayFornecedores,
      observacoes: [''],
    });

    this.addFornecedor();
  }

  getFornecedores(current: string) {
    const selecteds = this.arrayFornecedores.value;
    return this.fornecedores.filter(item => selecteds.indexOf(item.id) === -1 || item.id === current);
  }

  addFornecedor(id = ''){
    this.arrayFornecedores.push(this.fb.control(id));
  }

  removeFornecedor(index) {
    this.arrayFornecedores.removeAt(index);
  }

  async onSubmit() {
    if (this.formCaptacao.valid) {
      const projeto: any = this.formCaptacao.value;

      try {
        //await this.app.captacao.criarCaptacao(projeto);
        this.app.alert('Captação criada com sucesso!', 'Sucesso');
        this.activeModal.close();
      } catch (error) {
        console.error(error);
      }
    }
  }

  _getFornecedores() {
    return [
      {
        id: "1",
        nome: "Nome Fornecedor",
        cnpj: "05.254.665/0001-45",
        nomeResponsavel: "Nome Responsável",
        emailResponsavel: "responsavel@gmail.com",
        status: true
      },
      {
        id: "2",
        nome: "Nome Fornecedor 2",
        cnpj: "24.177.202/0001-71",
        nomeResponsavel: "Nome Responsável",
        emailResponsavel: "responsavel@gmail.com",
        status: true
      },
      {
        id: "3",
        nome: "Nome Fornecedor 3",
        cnpj: "10.874.254/0001-92",
        nomeResponsavel: "Nome Responsável 3",
        emailResponsavel: "responsavel3@gmail.com",
        status: true
      }
    ];
  }

}
