import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {Proposta} from '@app/commons';
import {PropostaNodeFormDirective} from '@app/pages/propostas/proposta/directives';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';

@Component({
  selector: 'app-risco-form',
  templateUrl: './risco-form.component.html',
  styleUrls: ['./risco-form.component.scss']
})
export class RiscoFormComponent extends PropostaNodeFormDirective implements OnInit {

  route: ActivatedRoute;
  proposta: Proposta;
  risco: any;

  form = this.fb.group({
    id: 0,
    item: ['', Validators.required],
    classificacao: ['', Validators.required],
    justificativa: ['', Validators.required],
    probabilidade: ['', Validators.required],

  });

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

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) canEdit: boolean,
    app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(canEdit, app, fb, activeModal, service);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
