import {Component, Inject, Input, OnInit} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {merge} from 'lodash-es';
import {Demanda} from '@app/commons/demandas';
import {DemandaEtapa, DemandaEtapaStatus} from '@app/user-shared/demandas/commons';
import {DemandaComponent} from '@app/user-shared/demandas/demanda/demanda.component';
import {ROOT_URL} from '@app/commons';
import {DEMANDA} from '@app/user-shared/demandas/demanda/providers';


@Component({
  selector: 'app-form-edit-template',
  styleUrls: ['form-editor.component.scss'],
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements OnInit {
  key: string;
  formValue: any;
  formValueDefault: any;
  demandaId: number;
  anexos: Array<any>;
  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;

  constructor(
    @Inject(DEMANDA) protected demanda: Demanda,
    @Inject(ROOT_URL) protected root_url: string,
    protected app: AppService,
    protected route: ActivatedRoute, protected parent: DemandaComponent) {
  }

  async ngOnInit() {
    try {
      this.key = this.route.snapshot.paramMap.get('form') || this.key;

      this.demandaId = parseFloat(this.route.snapshot.parent.paramMap.get('id')) || this.demandaId;
    } catch (e) {

    }

    if (this.key === undefined || this.key === null) {
      throw new Error('A key do formulário não foi informada');
    }
    const formValue = await this.app.demandas.getDemandaForm(this.demandaId, this.key).toPromise();
    this.anexos = formValue && formValue.files.map(file => file.file) || [];
    this.formValueDefault = await this.app.demandas.getFormValue(this.key).toPromise() || {};
    this.formValue = merge(this.formValueDefault, formValue && formValue.object || {});
  }

  async submit(data) {
    this.app.loading.show().then();
    try {
      await this.app.demandas.editarDemandaForm(this.demandaId, this.key, data).toPromise();
      this.app.alert('Formulário Salvo com sucesso!').then();
      this.app.router.navigate([this.root_url, 'demandas', this.demandaId, 'documento-aprovacoes']).then();
    } catch (e) {
      console.error(e);
    } finally {
      this.app.loading.hide();

    }
  }
}
