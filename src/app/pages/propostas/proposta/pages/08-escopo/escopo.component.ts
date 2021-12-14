import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {AppValidators, Proposta} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-escopo',
  templateUrl: './escopo.component.html',
  styleUrls: ['./escopo.component.scss']
})
export class EscopoComponent implements OnInit {

  proposta: Proposta;
  metasArray = this.fb.array([]);
  form = this.fb.group({
    beneficioIndustria: ['', Validators.required],
    beneficioInstitucional: ['', Validators.required],
    beneficioSetorEletrico: ['', Validators.required],
    beneficioSociedade: ['', Validators.required],
    beneficioTaesa: ['', Validators.required],
    contrapartidas: ['', Validators.required],
    experienciaPrevia: ['', Validators.required],
    objetivo: ['', Validators.required],
    resultadoEsperado: ['', Validators.required],
    metas: this.metasArray
  });

  get maxNumMeses() {
    return this.proposta?.duracao || 0;
  }

  canEdit: boolean;

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
    private app: AppService,
    private fb: FormBuilder,
    protected route: ActivatedRoute, protected service: PropostasService) {
  }

  ngOnInit(): void {
    this.propostaCanEdit.subscribe(can => this.canEdit = can);
    if (this.route.snapshot.data.escopo) {
      this.form.patchValue(this.route.snapshot.data.escopo);
      const metas = this.route.snapshot.data.escopo.metas as Array<any>;
      if (metas.length > 0) {
        metas.forEach(meta => this.addMeta(meta));
      } else {
        this.addMeta();
      }
    }
    this.proposta = this.service.getProposta();
    this.metasArray.controls.forEach(ctrl => {
      const m = ctrl.get('meses');
      m.clearValidators();
      m.setValidators([Validators.required, Validators.min(1), Validators.max(this.proposta.duracao)]);
    });
    if (!this.canEdit) {
      this.form.disable();
    }

  }

  addMeta(meta?: { objetivo: string; meses: number; id: number }) {
    const formGroup = this.fb.group({
      id: [meta?.id || 0],
      objetivo: [meta?.objetivo || '', Validators.required],
      meses: [meta?.meses || 1, [Validators.required, Validators.min(1), Validators.max(this.maxNumMeses)]]
    });

    this.metasArray.push(formGroup);
  }

  removeMeta(index) {
    this.metasArray.removeAt(index);
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.saveEscopo(this.proposta.guid, this.form.value);
        this.app.alert('Escopo salvo com sucesso!').then();
      } catch (e) {
        this.app.alert('Não foi possível salvo o escopo').then();
        console.error(e);
      }
    }
  }

}
