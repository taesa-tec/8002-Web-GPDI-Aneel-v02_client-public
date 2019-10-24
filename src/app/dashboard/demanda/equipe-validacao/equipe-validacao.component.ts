import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-definicao-pessoas-processo-validacao',
  templateUrl: './equipe-validacao.component.html',
  styleUrls: []
})
export class EquipeValidacaoComponent implements OnInit {

  formDefinirPessoas: FormGroup;

  constructor() { }

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.formDefinirPessoas = new FormGroup({
      superiorDireto: new FormControl('', [Validators.required]),
      gerente: new FormControl(''),
      revisor: new FormControl(''),
      diretor: new FormControl(''),
      coordenador: new FormControl(''),
    });
  }

  salvar() {
    console.log(this.formDefinirPessoas.value);
  }

}
