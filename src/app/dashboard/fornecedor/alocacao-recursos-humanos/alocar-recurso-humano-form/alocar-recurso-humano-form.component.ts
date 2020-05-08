import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@app/services/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-alocar-recurso-humano-form',
  templateUrl: './alocar-recurso-humano-form.component.html',
  styleUrls: ['./alocar-recurso-humano-form.component.scss']
})
export class AlocarRecursoHumanoFormComponent implements OnInit {

  alocarRecurso: object;
  status: boolean = false;
  mesInicial: moment.Moment = moment();
  totalMeses: number = 6;

  formAlocarRecurso: FormGroup;

  // DADOS DE TESTE
  empresasFinanciadoras = [
    {nome: 'Empresa Financiadora 1'},
    {nome: 'Empresa Financiadora 2'}
  ] ;

  etapas = [
    {nome: 'Etapa 1'},
    {nome: 'Etapa 2'}
  ]; 

  recursosHumanos = [
    {nome: 'Frederico Souto dos Santos'},
    {nome: 'Carlos das Silva'}
  ];
  //-------------------------------------

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.mesInicial = moment('2019-05-01T00:00:00');
    this.configForm();
  }

  configForm() {
    this.formAlocarRecurso = this.fb.group({
      recursoHumano: ['', [Validators.required]],
      empresaFinanciadora: ['', [Validators.required]],
      etapa: ['', [Validators.required]],
      horasAlocadas: this.getHorasAlocadas(),
      justificativa: ['', [Validators.required]],
    });

    if(this.alocarRecurso){
      this.formAlocarRecurso.patchValue(this.alocarRecurso);
      this.status = true;
    }
  }

  getHorasAlocadas() {
    let formGroup = this.fb.group([]);

    for(let x = 1; x <= this.totalMeses; x++) {
      formGroup.addControl(`mes-${x}`, this.fb.control('', Validators.required));
    }

    return formGroup;
  }

  getMesAnoAt(i) {
    if (this.mesInicial) {
      return this.mesInicial.clone().add(i - 1, 'months').format('MMM YYYY');
    }
    return `Mês ${i}`;
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
