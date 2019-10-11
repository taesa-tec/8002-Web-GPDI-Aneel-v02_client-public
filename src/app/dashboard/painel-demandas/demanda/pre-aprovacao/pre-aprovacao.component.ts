import { AppService } from '@app/core/services/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-pre-aprovacao',
  templateUrl: './pre-aprovacao.component.html',
  styleUrls: ['./pre-aprovacao.component.scss']
})
export class PreAprovacaoComponent implements OnInit {

  status = true;
  formReprovado: FormGroup;
  formRevisor: FormGroup;
  reprovado = false;
  aprovou = false;
  constructor(private app: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.status;
    this.configForm();
  }

  configForm() {
    this.formReprovado = this.fb.group({
      motivoReprovacao: ['', Validators.required],
      definirProximaEtapa: ['', Validators.required]
    });
    this.formRevisor = this.fb.group({
      revisorDemanda: ['', Validators.required],
    });
  }

  aprovar() {
    const r = this.app.confirm('Deseja confirmar a aprovação desta Demanda?', 'CONFIRMAR APROVAÇÃO',
      [{ text: 'Cancelar', value: true, cssClass: 'btn btn-link' },
      { text: 'Aprovar Demanda', value: true, cssClass: 'btn btn-success' }]
    );
    r.then(success => {
      this.aprovou = !this.aprovou;
      this.status = !this.status;
      localStorage.setItem('demandaConfirmada', 'Demanda confirmada');
      console.log('erro then 2');
    }).catch(err => {
      console.log('erro');

    });

    console.log(this.formReprovado.value);
  }

  definirRevisor() {
    var revi = this.formRevisor.value.revisorDemanda;
    console.log('Revisor Definido ' + revi);
    const r = this.app.confirm('Revisor Definido ' + revi, 'Revisor definido',
      [{ text: 'Cancelar', value: true, cssClass: 'btn btn-link' },
      { text: 'Aprovar Demanda', value: true, cssClass: 'btn btn-success' }]);
    r.then(suc => {
      localStorage.setItem('revisor', revi);
    })
  }




  reprovar() {
    this.reprovado = !this.reprovado;
    this.status = !this.status;
  }

  confirmReprovacao() {
    const r = this.app.alert('reprovado com sucesso e enviado para alguma etapa');
    r.then(success => {
      console.log(r);
      localStorage.setItem('demandaReprovada', this.formReprovado.value.motivoReprovacao);
    });
    console.log(this.formReprovado.value);

  }
}
