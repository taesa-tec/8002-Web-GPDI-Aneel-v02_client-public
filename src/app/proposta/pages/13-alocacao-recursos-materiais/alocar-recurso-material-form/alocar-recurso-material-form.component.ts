import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {PropostaNodeFormDirective} from '@app/proposta/directives';
import {PropostaServiceBase} from '@app/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';

@Component({
  selector: 'app-alocar-recurso-material-form',
  templateUrl: './alocar-recurso-material-form.component.html',
  styleUrls: ['./alocar-recurso-material-form.component.scss']
})
export class AlocarRecursoMaterialFormComponent extends PropostaNodeFormDirective implements OnInit {

  empresas = [];
  etapas = [];
  recursos = [];
  empresaFinanciadora = this.fb.control('', Validators.required);
  empresaRecebedora = this.fb.control('', Validators.required);
  form = this.fb.group({
    id: 0,
    recursoId: ['', Validators.required],
    etapaId: ['', Validators.required],
    empresaFinanciadora: this.empresaFinanciadora,
    empresaFinanciadoraId: [''],
    coExecutorFinanciadorId: [''],
    empresaRecebedora: this.empresaRecebedora,
    empresaRecebedoraId: [''],
    coExecutorRecebedorId: [''],
    justificativa: ['', Validators.required],
    quantidade: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(@Inject(PROPOSTA_CAN_EDIT) canEdit: boolean, app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
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
        this.empresaFinanciadora.setValue(`c-${item.coExecutorFinanciadorId}`);
      } else {
        this.empresaFinanciadora.setValue(`e-${item.empresaFinanciadoraId}`);
      }

      if (item.coExecutorRecebedorId) {
        this.empresaRecebedora.setValue(`c-${item.coExecutorRecebedorId}`);
      } else {
        this.empresaRecebedora.setValue(`e-${item.empresaRecebedoraId}`);
      }
    }

    this.empresaFinanciadora.valueChanges.subscribe(e => {
      this.form.get('empresaFinanciadoraId').setValue('');
      this.form.get('coExecutorFinanciadorId').setValue('');
      const ee = e.split('-');
      const id = parseFloat(ee[1]);

      const ctrl = this.form.get(ee[0] === 'e' ? 'empresaFinanciadoraId' : 'coExecutorFinanciadorId');
      ctrl.setValue(id);
    });

    this.empresaRecebedora.valueChanges.subscribe(e => {
      this.form.get('empresaRecebedoraId').setValue('');
      this.form.get('coExecutorRecebedorId').setValue('');
      const ee = e.split('-');
      const id = parseFloat(ee[1]);

      const ctrl = this.form.get(ee[0] === 'e' ? 'empresaRecebedoraId' : 'coExecutorRecebedorId');
      ctrl.setValue(id);
    });
  }
}
