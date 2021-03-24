import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {Proposta} from '@app/commons';
import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';
import {PropostaNodeFormDirective} from '@app/user-fornecedor/propostas/proposta/shared';

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

  constructor(app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(app, fb, activeModal, service);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
