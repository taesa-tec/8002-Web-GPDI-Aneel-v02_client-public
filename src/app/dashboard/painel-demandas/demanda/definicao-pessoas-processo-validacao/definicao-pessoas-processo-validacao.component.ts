import { PessoasTeste } from './../../gestao-de-demandas/demandas-teste';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-definicao-pessoas-processo-validacao',
  templateUrl: './definicao-pessoas-processo-validacao.component.html',
  styleUrls: ['./definicao-pessoas-processo-validacao.component.scss']
})
export class DefinicaoPessoasProcessoValidacaoComponent implements OnInit {

  pessoas = PessoasTeste;

  formDefinirPessoas: FormGroup;

  constructor() { }

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.formDefinirPessoas = new FormGroup({
      superiorDireto: new FormControl('A definir', [Validators.required]),
      gerente: new FormControl('A definir'),
      revisor: new FormControl('A definir'),
      diretor: new FormControl('A definir'),
      coordenador: new FormControl('A definir'),
    });
  }

  salvar() {
    console.log(this.formDefinirPessoas.value);
  }

}
