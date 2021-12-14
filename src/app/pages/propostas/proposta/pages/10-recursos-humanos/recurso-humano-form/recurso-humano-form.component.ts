import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppValidators, Funcoes, Graduacoes, TextValue} from '@app/commons';
import {AppService} from '@app/services/app.service';
import {PropostaNodeFormDirective} from '@app/pages/propostas/proposta/directives';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-recurso-humano-form',
  templateUrl: './recurso-humano-form.component.html',
  styleUrls: ['./recurso-humano-form.component.scss']
})
export class RecursoHumanoFormComponent extends PropostaNodeFormDirective implements OnInit {

  documentoMask = '';
  form = this.fb.group({
    id: [0],
    empresaId: ['', [Validators.required]],
    nomeCompleto: ['', [Validators.required]],
    titulacao: ['', [Validators.required]],
    funcao: ['', [Validators.required]],
    nacionalidade: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    valorHora: ['', [Validators.required]],
    urlCurriculo: ['', [AppValidators.isUrl]],
  });
  empresas: Array<TextValue> = [];
  titulacoes = Graduacoes;
  funcoes = Funcoes;

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) canEdit: BehaviorSubject<boolean>,
    app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(canEdit, app, fb, activeModal, service);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.empresas = this.route.snapshot.data.empresas;

    this.form.get('nacionalidade').valueChanges.subscribe(v => {
      const brasileiro = v === 'Brasileiro';
      const control = this.form.get('documento');
      control.clearValidators();

      this.documentoMask = brasileiro ? '000.000.000-00' : 'A*';
      if (brasileiro) {
        control.setValidators([Validators.required, AppValidators.cpf]);
      } else {
        control.setValidators([Validators.required]);
      }

    });


  }

}
