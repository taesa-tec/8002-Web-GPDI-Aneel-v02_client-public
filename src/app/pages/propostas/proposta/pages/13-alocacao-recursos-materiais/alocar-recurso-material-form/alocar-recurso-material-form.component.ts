import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {PropostaNodeFormDirective} from '@app/pages/propostas/proposta/directives';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';

@Component({
  selector: 'app-alocar-recurso-material-form',
  templateUrl: './alocar-recurso-material-form.component.html',
  styleUrls: ['./alocar-recurso-material-form.component.scss']
})
export class AlocarRecursoMaterialFormComponent extends PropostaNodeFormDirective implements OnInit {

  empresas = [];
  etapas = [];
  recursos = [];
  empresaFinanciadoraCtrl = this.fb.control('', Validators.required);
  empresaFinanciadora: any;
  empresaRecebedoraCtrl = this.fb.control('', Validators.required);
  form = this.fb.group({
    id: 0,
    recursoId: ['', Validators.required],
    etapaId: ['', Validators.required],
    empresaFinanciadora: this.empresaFinanciadoraCtrl,
    empresaFinanciadoraId: [''],
    coExecutorFinanciadorId: [''],
    empresaRecebedora: this.empresaRecebedoraCtrl,
    empresaRecebedoraId: [''],
    coExecutorRecebedorId: [''],
    justificativa: ['', Validators.required],
    quantidade: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(@Inject(PROPOSTA_CAN_EDIT) canEdit: boolean, app: AppService, fb: FormBuilder, activeModal: NgbActiveModal,
              service: PropostaServiceBase) {
    super(canEdit, app, fb, activeModal, service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.empresas = this.route.snapshot.data.empresas;
    this.etapas = this.route.snapshot.data.etapas;
    this.recursos = this.route.snapshot.data.recursos;
    if (this.route.snapshot.data.item) {
      const item = this.route.snapshot.data.item;

      if (item.coExecutorFinanciadorId) {
        this.empresaFinanciadoraCtrl.setValue(`c-${item.coExecutorFinanciadorId}`);
      } else {
        this.empresaFinanciadoraCtrl.setValue(`e-${item.empresaFinanciadoraId}`);
      }

      if (item.coExecutorRecebedorId) {
        this.empresaRecebedoraCtrl.setValue(`c-${item.coExecutorRecebedorId}`);
      } else {
        this.empresaRecebedoraCtrl.setValue(`e-${item.empresaRecebedoraId}`);
      }
    }

    this.empresaFinanciadoraCtrl.valueChanges.subscribe(e => {
      this.form.get('empresaFinanciadoraId').setValue('');
      this.form.get('coExecutorFinanciadorId').setValue('');
      const ee = e.split('-');
      const id = parseFloat(ee[1]);

      const ctrl = this.form.get(ee[0] === 'e' ? 'empresaFinanciadoraId' : 'coExecutorFinanciadorId');
      ctrl.setValue(id);
      this.updateFinanciadora();
    });

    this.empresaRecebedoraCtrl.valueChanges.subscribe(e => {
      this.form.get('empresaRecebedoraId').setValue('');
      this.form.get('coExecutorRecebedorId').setValue('');
      const ee = e.split('-');
      const id = parseFloat(ee[1]);

      const ctrl = this.form.get(ee[0] === 'e' ? 'empresaRecebedoraId' : 'coExecutorRecebedorId');
      ctrl.setValue(id);
    });
    this.updateFinanciadora();
  }

  updateFinanciadora() {
    this.empresaFinanciadora = this.empresas.find(e => e.value === this.empresaFinanciadoraCtrl.value);
    const recebedora = this.empresas.find(e => e.value === this.empresaRecebedoraCtrl.value);
    if (this.empresaFinanciadora?.type !== 't' && recebedora?.type === 't') {
      this.empresaRecebedoraCtrl.setValue('');
    }
  }
}
