import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppValidators, Funcoes, Graduacoes, TextValue} from '@app/commons';
import {AppService} from '@app/services/app.service';
import {PropostaNodeFormDirective} from '@app/user-fornecedor/propostas/proposta/shared';
import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';

@Component({
  selector: 'app-recurso-humano-form',
  templateUrl: './recurso-humano-form.component.html',
  styleUrls: ['./recurso-humano-form.component.scss']
})
export class RecursoHumanoFormComponent extends PropostaNodeFormDirective implements OnInit {

  empresaCtrl = this.fb.control('', Validators.required);
  form = this.fb.group({
    id: [0],
    empresa: this.empresaCtrl,
    empresaId: [''],
    coExecutorId: [''],
    nomeCompleto: ['', [Validators.required]],
    titulacao: ['', [Validators.required]],
    funcao: ['', [Validators.required]],
    nacionalidade: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    valorHora: ['', [Validators.required]],
    urlCurriculo: ['', [Validators.required]],
  });
  empresas: Array<TextValue> = [];
  titulacoes = Graduacoes;
  funcoes = Funcoes;

  constructor(app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(app, fb, activeModal, service);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.empresas = this.route.snapshot.data.empresas;

    if (this.form.value.empresaId) {
      this.form.get('empresa').setValue(`e-${this.form.value.empresaId}`);
    } else if (this.form.value.coExecutorId) {
      this.form.get('empresa').setValue(`c-${this.form.value.coExecutorId}`);
    }
    this.empresaCtrl.valueChanges.subscribe(e => {
      this.form.get('empresaId').setValue('');
      this.form.get('coExecutorId').setValue('');
      const ee = e.split('-');
      const id = parseFloat(ee[1]);

      const ctrl = this.form.get(ee[0] === 'e' ? 'empresaId' : 'coExecutorId');
      ctrl.setValue(id);
    });


  }

}
