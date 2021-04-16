import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

import {AppService} from '@app/services/app.service';
import {PropostaNodeFormDirective} from '@app/proposta/directives';
import {PropostaServiceBase} from '@app/proposta/services/proposta-service-base.service';

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

  constructor(app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(app, fb, activeModal, service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.categorias = this.route.snapshot.data.categorias;
  }
}
