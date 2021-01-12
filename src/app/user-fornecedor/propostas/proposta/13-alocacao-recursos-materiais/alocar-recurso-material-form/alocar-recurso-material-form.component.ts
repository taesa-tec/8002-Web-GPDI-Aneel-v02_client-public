import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-alocar-recurso-material-form',
  templateUrl: './alocar-recurso-material-form.component.html',
  styleUrls: ['./alocar-recurso-material-form.component.scss']
})
export class AlocarRecursoMaterialFormComponent implements OnInit {

  alocarRecurso: object;
  status: boolean = false;

  formAlocarRecurso: FormGroup;

  // DADOS DE TESTE
  empresasFinanciadoras = [
    {nome: 'Empresa Financiadora 1'},
    {nome: 'Empresa Financiadora 2'}
  ]

  empresasRecebedoras = [
    {nome: 'Empresa Recebedora 1'},
    {nome: 'Empresa Recebedora 2'}
  ]

  etapas = [
    {nome: 'Etapa 1'},
    {nome: 'Etapa 2'}
  ]; 

  recursosMateriais = [
    {nome: 'Compra  Laptop'},
    {nome: 'Despesas Aéreas'}
  ];
  //--------------------------

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formAlocarRecurso = this.fb.group({
      recursoMaterial: ['', [Validators.required]],
      empresaFinanciadora: ['', [Validators.required]],
      empresaRecebedora: ['', [Validators.required]],
      etapa: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      justificativa: ['', [Validators.required]],
    });

    if(this.alocarRecurso){
      this.formAlocarRecurso.patchValue(this.alocarRecurso);
      this.status = true;
    }
  }

  async onSubmit() {
    if (this.formAlocarRecurso.valid) {
      const alocarRecurso = this.formAlocarRecurso.value;
      
      try {
        if (this.alocarRecurso) {
          console.log(alocarRecurso, 'Editar');
          this.app.alert('Recurso editado com sucesso');
        } else {
          console.log(alocarRecurso, 'Criar');
          this.app.alert('Recurso adicionado com sucesso');
        }
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o recurso');
        console.error(e);
      }
    }
  }

}
