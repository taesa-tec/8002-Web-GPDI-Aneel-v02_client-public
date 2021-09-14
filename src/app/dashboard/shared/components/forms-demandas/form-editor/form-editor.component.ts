import {Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {Demanda, FormField} from '@app/commons/demandas';
import {AbstractControl, FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {uniqBy} from 'lodash-es';
import {DemandasService} from '@app/services';


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
  @Input() formValue: { value: any; children?: any };
  @Input() anexos: Array<any> = [];
  @Input() canAppendFile = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Output() save: EventEmitter<object> = new EventEmitter<object>();
  demanda: Demanda;


  constructor(protected service: DemandasService, protected builder: FormBuilder, protected app: AppService, protected route: ActivatedRoute) {
  }

  async ngOnInit() {
    if (this.key === undefined || this.key === null) {
      throw new Error('Key form is undefined or null. Please give a key value');
    }
    this.demanda = this.service.getCurrentDemanda();
    this.anexos = this.anexos || [];
    this.formField = await this.app.demandas.getForm(this.key).toPromise();
    this.anexosFormArray = this.builder.array(this.anexos.map(item => item.id));
    this.form = this.buildForm(this.formField, this.formValue);
    if (this.formValue) {
      this.form.patchValue(this.formValue);
    }
    this.mainForm = this.builder.group({
      form: this.form,
      anexos: this.anexosFormArray
    });

    this.form.updateValueAndValidity();
    if (this.disabled || (this.demanda && this.demanda.superiorDiretoId == null)) {
      this.form.disable();
    }
  }

  async anexarArquivos() {
    try {
      const files = await this.app.uploadForm(this.anexos.map(f => f.id), `Demandas/${this.demandaId}/Files`);
      while (this.anexosFormArray.length > 0) {
        this.anexosFormArray.removeAt(0);
      }
      files.forEach(file => {
        this.anexosFormArray.push(this.builder.control(file.id));
      });
      this.anexos = files; // uniqBy([...this.anexos, ...files], item => item.id);
      console.log(files);
    } catch (e) {
      console.log(e);
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

  buildControl(field: FormField, controlValue?: any) {

    const formControl = this.builder.group({});

    if (field.fieldType.match(/RichText|Text|Date|Options|Temas/)) {
      //formControl.addControl("fieldValue", field.isArray ? new FormArray([]) : new FormControl("", [Validators.required]));

      formControl.addControl('value', new FormControl(controlValue?.value ?? '', [Validators.required]));
    }

    try {
      if (field.children) {
        const children = this.builder.group({});
        //

        field.children.forEach(child => {


          const value = controlValue?.children?.[child.key];
          if (child.isArray) {
            const childControls = (value as Array<{ value: any }> || [])?.map(v => this.builder.group(v));
            this.buildControl(child, value);
            if (childControls) {

              children.addControl(child.key, this.builder.array(childControls));
            }
          } else {
            const childControl = this.buildControl(child, value);
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

  buildForm(field: FormField, formValue: { value: any; children?: any }) {

    const formControl = this.builder.group({});

    try {
      if (field.children) {
        field.children.forEach(child => {
          const value = formValue?.children?.[child.key];
          formControl.addControl(child.key, this.buildControl(child, value));
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
