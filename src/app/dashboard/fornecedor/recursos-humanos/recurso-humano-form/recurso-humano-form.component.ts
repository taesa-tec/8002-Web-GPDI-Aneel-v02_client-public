import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppValidators } from '@app/commons';
import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-recurso-humano-form',
  templateUrl: './recurso-humano-form.component.html',
  styleUrls: ['./recurso-humano-form.component.scss']
})
export class RecursoHumanoFormComponent implements OnInit {

  recursoHumano: object;
  status: boolean = false;

  formRecursoHumano: FormGroup;

  // DADOS DE TESTE
  empresas = [
    {nome: 'Ivision Sistemas de Imagem e Visão S.A'},
    {nome: 'TAESA (7527)'},
  ];

  titulacoes = [
    {nome: 'Doutor'},
    {nome: 'Mestre'},
  ];

  funcoes = [
    {nome: 'Coodernador'},
    {nome: 'Gerente'},
  ]
  //-------------------------------------------------

  get cnpjCpfMask(): string {
    const currentValue = this.formRecursoHumano.get('cpf').value;
    if (currentValue) {
        return currentValue.replace(/\D/, '').length < 12 ? '000.000.000-009' : '00.000.000/0000-00';
    }
    return '0';
  }

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formRecursoHumano = this.fb.group({
      empresa: ['', [Validators.required]],
      valorHora: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      titulacao: ['', [Validators.required]],
      funcao: ['', [Validators.required]],
      brasileiro: ['', [Validators.required]],
      cpf: ['', [Validators.required, AppValidators.cnpjOrCpf]],
      curriculoLattes: ['', [Validators.required]],
    });

    if(this.recursoHumano){
      this.formRecursoHumano.patchValue(this.recursoHumano);
      this.status = true;
    }
  }

  async onSubmit() {
    if (this.formRecursoHumano.valid) {
      const recursoHumano = this.formRecursoHumano.value;

      try {
        if (this.recursoHumano) {
          console.log(recursoHumano, 'Editar');
          this.app.alert('Recurso humano editado com sucesso');
        } else {
          console.log(recursoHumano, 'Criar');
          this.app.alert('Recurso humano adicionado com sucesso');
        }
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o recurso humano');
        console.error(e);
      }
    }
  }

}
