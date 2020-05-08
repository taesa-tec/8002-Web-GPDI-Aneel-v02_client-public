import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-risco-form',
  templateUrl: './risco-form.component.html',
  styleUrls: ['./risco-form.component.scss']
})
export class RiscoFormComponent implements OnInit {

  risco: object;
  status: boolean = false;

  formRisco: FormGroup;

  // DADOS DE TESTE
  classificacoes = [
    {nome: 'Técnico/Científico'},
    {nome: 'Financeiro'},
    {nome: 'Atraso no Cronograma'}
  ]; 

  probabilidades = [
    {nome: 'Alto'},
    {nome: 'Médio'},
    {nome: 'Baixo'}
  ]; 
  //----------------------

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formRisco = this.fb.group({
      item: ['', [Validators.required]],
      classificacao: ['', [Validators.required]],
      probabilidade: ['', [Validators.required]],
      justificativa: ['', [Validators.required]],
    });

    if(this.risco){
      this.formRisco.patchValue(this.risco);
      this.status = true;
    }
  }

  async onSubmit() {
    if (this.formRisco.valid) {
      const risco = this.formRisco.value;
      
      try {
        if (this.risco) {
          console.log(risco, 'Editar');
          this.app.alert('Risco editado com sucesso');
        } else {
          console.log(risco, 'Criar');
          this.app.alert('Risco adicionado com sucesso');
        }
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o risco');
        console.error(e);
      }
    }
  }

}
