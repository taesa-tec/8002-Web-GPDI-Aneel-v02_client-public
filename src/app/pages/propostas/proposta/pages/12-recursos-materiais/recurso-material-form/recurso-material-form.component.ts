import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, Inject, OnInit} from '@angular/core';

import {AppService} from '@app/services/app.service';
import {PropostaNodeFormDirective} from '@app/pages/propostas/proposta/directives';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';

@Component({
  selector: 'app-recurso-material-form',
  templateUrl: './recurso-material-form.component.html',
  styleUrls: ['./recurso-material-form.component.scss']
})
export class RecursoMaterialFormComponent extends PropostaNodeFormDirective implements OnInit {

  form = this.fb.group({
    id: 0,
    nome: ['', Validators.required],
    categoriaContabilId: ['', Validators.required],
    valorUnitario: [0, Validators.required],
    especificacaoTecnica: ['', Validators.required]
  });
  categorias = [];

  constructor(@Inject(PROPOSTA_CAN_EDIT) canEdit: boolean, app: AppService, fb: FormBuilder, activeModal: NgbActiveModal,
              service: PropostaServiceBase) {
    super(canEdit, app, fb, activeModal, service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.categorias = this.route.snapshot.data.categorias;
  }

  async onSubmit() {

  }
}
