import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-recurso-material-form',
  templateUrl: './recurso-material-form.component.html',
  styleUrls: ['./recurso-material-form.component.scss']
})
export class RecursoMaterialFormComponent implements OnInit {

  recursoMaterial: object;
  status: boolean = false;

  formRecursoMaterial: FormGroup;

  // DADOS DE TESTE
  categoriasContabil = [
    {nome: 'Categoria 1'},
    {nome: 'Categoria 2'}
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
    this.formRecursoMaterial = this.fb.group({
      nome: ['', [Validators.required]],
      categoriaContabil: ['', [Validators.required]],
      valorUnitario: ['', [Validators.required]],
      especificacao: ['', [Validators.required]],
    });

    if(this.recursoMaterial){
      this.formRecursoMaterial.patchValue(this.recursoMaterial);
      this.status = true;
    }
  }

  async onSubmit() {
    if (this.formRecursoMaterial.valid) {
      const recursoMaterial = this.formRecursoMaterial.value;
      
      try {
        if (this.recursoMaterial) {
          console.log(recursoMaterial, 'Editar');
          this.app.alert('Recurso material editado com sucesso');
        } else {
          console.log(recursoMaterial, 'Criar');
          this.app.alert('Recurso material adicionado com sucesso');
        }
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o recurso material');
        console.error(e);
      }
    }
  }

}
