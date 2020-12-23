import {Component, OnInit} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-form-edit-template',
  templateUrl: './form-editor.component.html'
})
export class FormEditorComponent implements OnInit {
  key: string;
  formValue: any;

  constructor(protected app: AppService, protected route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    if (this.key === undefined || this.key === null) {
      throw new Error('Key form is undefined or null. Please give a key value');
    }
    this.formValue = await this.app.demandas.getFormValue(this.key).toPromise() || {value: ''};
  }

  async submit(data) {
    this.app.loading.show();
    try {
      await this.app.demandas.saveFormValue(this.key, data.form).toPromise();
      this.app.alert('Formulário Salvo com sucesso!');
    } catch (e) {
      console.log(e);
    }
    this.app.loading.hide();
  }
}
