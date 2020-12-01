import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import _configEditor from '@app/core/config-editor';
import {ServiceBase} from '@app/services/service-base.service';

@Component({
  selector: 'app-contrato-padrao-form',
  templateUrl: './contrato-padrao-form.component.html',
  styleUrls: ['./contrato-padrao-form.component.scss']
})
export class ContratoPadraoFormComponent implements OnInit {

  form: FormGroup;
  categorias: Array<string>;
  configEditor = _configEditor;

  constructor(
    protected app: AppService,
    protected service: ServiceBase<any>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      id: '0',
      titulo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      conteudo: ['', Validators.required]
    });
    if (this.route.snapshot.data.contrato) {
      this.form.patchValue(this.route.snapshot.data.contrato);
    }
    this.form.updateValueAndValidity();
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.salvar(this.form.value);
        this.app.alert('Contrato salvo com sucesso').then();
      } catch (e) {
        this.app.alert('Não foi possível salvar o contrato').then();
        console.error(e);
      }
    }
  }

}
