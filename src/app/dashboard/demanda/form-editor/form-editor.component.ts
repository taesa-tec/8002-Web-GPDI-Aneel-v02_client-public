import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {merge} from 'lodash-es';


@Component({
  selector: 'app-form-edit-template',
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements OnInit {
  key: string;
  formValue: any;
  formValueDefault: any;
  demandaId: number;
  anexos: Array<any>;


  constructor(protected app: AppService, protected route: ActivatedRoute) {
  }

  async ngOnInit() {

    this.key = this.route.snapshot.paramMap.get('form');
    this.demandaId = parseFloat(this.route.snapshot.parent.paramMap.get('id'));

    if (this.key === undefined || this.key === null) {
      throw new Error('Key form is undefined or null. Please give a key value');
    }

    const formValue = await this.app.demandas.getDemandaForm(this.demandaId, this.key).toPromise();
    this.anexos = formValue.files.map(file => file.file);
    this.formValueDefault = await this.app.demandas.getFormValue(this.key).toPromise() || {};
    this.formValue = merge(this.formValueDefault, formValue.object);
  }

  async submit(data) {
    this.app.loading.show();
    console.log(data);
    try {
      await this.app.demandas.editarDemandaForm(this.demandaId, this.key, data).toPromise();
      this.app.alert('Formulário Salvo com sucesso!');
    } catch (e) {
      console.log(e);
    }
    this.app.loading.hide();
  }
}
