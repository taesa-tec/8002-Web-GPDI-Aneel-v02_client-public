import {Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {FormField} from '@app/models/demandas';
import {AbstractControl, FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {uniqBy} from 'lodash-es';


@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FormEditorComponent implements OnInit {
  formField: FormField;
  form: FormGroup;
  mainForm: FormGroup;
  anexosFormArray: FormArray;
  @Input() key: string;
  @Input() demandaId: number;
  @Input() formValue: object;
  @Input() anexos: Array<any> = [];
  @Input() canAppendFile = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Output() save: EventEmitter<object> = new EventEmitter<object>();


  constructor(protected builder: FormBuilder, protected  app: AppService, protected route: ActivatedRoute) {
  }

  async ngOnInit() {
    if (this.key === undefined || this.key === null) {
      throw new Error('Key form is undefined or null. Please give a key value');
    }
    this.anexos = this.anexos || [];
    this.formField = await this.app.demandas.getForm(this.key).toPromise();
    this.anexosFormArray = this.builder.array(this.anexos.map(item => item.id));
    this.form = this.buildForm(this.formField);
    if (this.formValue) {
      this.form.patchValue(this.formValue);
    }
    this.mainForm = this.builder.group({
      form: this.form,
      anexos: this.anexosFormArray
    });

    this.form.updateValueAndValidity();
    if (this.disabled) {
      this.form.disable();
    }
  }

  async anexarArquivos() {
    try {
      const files = await this.app.uploadForm(this.anexos.map(f => f.id), `Demandas/${this.demandaId}/Files`);
      files.forEach(file => {
        this.anexosFormArray.push(this.builder.control(file.id));
      });
      this.anexos = files; // uniqBy([...this.anexos, ...files], item => item.id);
    } catch (e) {

    }
  }

  async download(anexo) {
    if (this.demandaId) {
      this.app.showLoading();
      try {
        await this.app.demandas.downloadAnexo(this.demandaId, anexo);
      } catch (e) {
        console.error(e);
      }
      this.app.hideLoading();
    } else {
      console.error('Sem demanda!');
    }
  }

  buildControl(field: FormField) {

    const formControl = this.builder.group({});

    if (field.fieldType.match(/RichText|Text|Date|Options|Temas/)) {
      //formControl.addControl("fieldValue", field.isArray ? new FormArray([]) : new FormControl("", [Validators.required]));
      formControl.addControl('value', new FormControl('', [Validators.required]));
    }

    try {
      if (field.children) {
        const children = this.builder.group({});
        //
        field.children.forEach(child => {
          const childControl = this.buildControl(child);
          if (child.isArray) {
            children.addControl(child.key, this.builder.array([childControl]));
          } else {
            children.addControl(child.key, childControl);
          }
        });

        if (field.fieldType === 'Form') {
          return children;
        }
        formControl.addControl('children', children);

      }
    } catch (error) {
      console.error(error);

    }
    return formControl;


  }

  buildForm(field: FormField) {

    const formControl = this.builder.group({});

    try {
      if (field.children) {
        field.children.forEach(child => {
          formControl.addControl(child.key, this.buildControl(child));
        });
      }
    } catch (error) {
      console.error(error);

    }

    const root = this.builder.group({
      key: field.key
    });
    root.addControl('children', formControl);

    return root;

  }


  saveData() {
    if (this.form.valid) {
      this.save.emit(this.mainForm.value);
    }
  }


}
