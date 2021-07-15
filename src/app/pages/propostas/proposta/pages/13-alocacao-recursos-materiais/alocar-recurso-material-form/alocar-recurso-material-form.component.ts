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
    empresaFinanciadoraId: this.empresaFinanciadoraCtrl,
    empresaRecebedoraId: this.empresaRecebedoraCtrl,
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

    this.empresaFinanciadoraCtrl.valueChanges.subscribe(e => {
      this.updateFinanciadora();
    });

    this.empresaRecebedoraCtrl.valueChanges.subscribe(e => {

    });
    this.updateFinanciadora();
  }

  updateFinanciadora() {
    this.empresaFinanciadora = this.empresas.find(e => e.id === parseFloat(this.empresaFinanciadoraCtrl.value));
    const recebedora = this.empresas.find(e => e.id === parseFloat(this.empresaRecebedoraCtrl.value));
    console.log(this.empresaFinanciadora, recebedora);
    if (this.empresaFinanciadora?.funcao === 'Executora' && recebedora?.funcao === 'Cooperada') {
      this.empresaRecebedoraCtrl.setValue('');
    }
  }
}
