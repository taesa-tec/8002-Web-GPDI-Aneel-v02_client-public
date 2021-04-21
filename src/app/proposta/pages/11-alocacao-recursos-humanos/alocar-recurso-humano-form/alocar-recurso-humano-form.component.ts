import {Component, Inject, Input, OnInit} from '@angular/core';
import {AppService} from '@app/services';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropostaNodeFormDirective} from '@app/proposta/directives';
import {PropostaServiceBase} from '@app/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';

@Component({
  selector: 'app-alocar-recurso-humano-form',
  templateUrl: './alocar-recurso-humano-form.component.html',
  styleUrls: ['./alocar-recurso-humano-form.component.scss']
})
export class AlocarRecursoHumanoFormComponent extends PropostaNodeFormDirective implements OnInit {

  empresas = [];
  etapas = [];
  recursos = [];

  etapaCtrl = this.fb.control('', Validators.required);
  recursoCtrl = this.fb.control('', Validators.required);
  empresaFinanciadora = this.fb.control('', Validators.required);
  formMeses = this.fb.group({});

  form = this.fb.group({
    id: 0,
    recursoId: this.recursoCtrl,
    etapaId: this.etapaCtrl,
    empresaFinanciadora: this.empresaFinanciadora,
    empresaFinanciadoraId: [''],
    coExecutorFinanciadorId: [''],
    justificativa: ['', Validators.required],
    horaMeses: this.formMeses,
  });


  private _meses: Array<number> = [];
  private _mesesPrev: Array<number> = [];

  get meses() {
    return this._meses;
  }

  set meses(value) {
    this._mesesPrev = this._meses;
    this._meses = value.filter(n => !isNaN(n));
    this._mesesPrev.forEach(m => this.formMeses.removeControl(m.toString()));
    this._meses.forEach(m => {
      this.formMeses.addControl(m.toString(), this.fb.control('', [Validators.required, Validators.min(0), Validators.max(this.max)]));
    });
  }

  @Input() max = 172;

  constructor(@Inject(PROPOSTA_CAN_EDIT) canEdit: boolean, app: AppService, fb: FormBuilder, activeModal: NgbActiveModal, service: PropostaServiceBase) {
    super(canEdit, app, fb, activeModal, service);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.empresas = this.route.snapshot.data.empresas;
    this.etapas = this.route.snapshot.data.etapas;
    this.recursos = this.route.snapshot.data.recursos;

    const mesesMount = (v, d = null) => {
      const etapa = this.etapas.find(e => e.id === parseFloat(v));
      if (etapa) {
        this._mesesPrev = this.meses;
        this.meses = etapa.meses;
        if (d) {
          this.formMeses.patchValue(d);
        }
      }
    };
    const maxMeses = recursoId => {
      const r = this.recursos.find(_r => _r.id === parseFloat(recursoId));
      this.max = r?.empresaId === 1 ? 160 : 172;
    };

    if (this.route.snapshot.data.item) {
      const item = this.route.snapshot.data.item;

      mesesMount(item.etapaId, item.horaMeses);
      maxMeses(item.recursoId);
      if (item.coExecutorFinanciadorId) {
        this.empresaFinanciadora.setValue(`c-${item.coExecutorFinanciadorId}`);
      } else {
        this.empresaFinanciadora.setValue(`e-${item.empresaFinanciadoraId}`);
      }
    }

    this.etapaCtrl.valueChanges.subscribe(v => {
      mesesMount(v);
    });
    this.recursoCtrl.valueChanges.subscribe(id => {
      maxMeses(id);
    });
    this.empresaFinanciadora.valueChanges.subscribe(e => {
      this.form.get('empresaFinanciadoraId').setValue('');
      this.form.get('coExecutorFinanciadorId').setValue('');
      const ee = e.split('-');
      const id = parseFloat(ee[1]);

      const ctrl = this.form.get(ee[0] === 'e' ? 'empresaFinanciadoraId' : 'coExecutorFinanciadorId');
      ctrl.setValue(id);
    });

  }
}
