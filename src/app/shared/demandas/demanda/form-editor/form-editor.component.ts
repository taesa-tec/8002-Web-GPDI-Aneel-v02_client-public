import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {merge} from 'lodash-es';
import {Demanda} from '@app/commons/demandas';
import {DemandaEtapa, DemandaEtapaStatus} from '@app/shared/demandas/commons';


@Component({
  selector: 'app-form-edit-template',
  styleUrls: ['form-editor.component.scss'],
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements OnInit {
  demanda: Demanda;
  key: string;
  formValue: any;
  formValueDefault: any;
  demandaId: number;
  anexos: Array<any>;
  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;

  constructor(protected app: AppService, protected route: ActivatedRoute) {
  }

  async ngOnInit() {
    try {
      this.key = this.route.snapshot.paramMap.get('form') || this.key;
      this.demanda = this.route.parent.snapshot.data.demanda.demanda || this.demanda;
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
    this.app.loading.show();
    try {
      await this.app.demandas.editarDemandaForm(this.demandaId, this.key, data).toPromise();
      this.app.loading.hide();
      await this.app.alert('Formulário Salvo com sucesso!');
      this.app.router.navigate(['/dashboard', 'demanda', this.demandaId, 'documento-aprovacoes']);
    } catch (e) {
      console.error(e);
      this.app.loading.hide();
    }
  }
}
