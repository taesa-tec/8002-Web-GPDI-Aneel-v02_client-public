import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {FormField} from '@app/commons/demandas';
import {AbstractControl, FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-editor-field',
  templateUrl: './form-field.component.html',
  encapsulation: ViewEncapsulation.None
})

export class FormFieldComponent {

  protected _field: FormField;
  protected _form: AbstractControl;
  classname: string;
  children: FormGroup;
  @Input() readonly = false;

  @Input() set form(value: AbstractControl) {
    this._form = value;
  }

  get form() {
    return this._form;
  }

  get formArray(): FormArray {
    if (this.field && this.field.isArray) {
      return <FormArray>this.form || new FormArray([]);
    }
    return new FormArray([]);
  }


  @Input() set field(value: FormField) {
    this.classname = value && value.fieldType.toLowerCase() || '';
    this._field = value;
  }

  get field() {
    return this._field;
  }

  constructor(protected builder: FormBuilder) {
  }

  add() {
    if (this.field.isArray) {
      const formArray = <FormArray>this.form;
      formArray.push(this.builder.group({value: ''}));
    }
  }

  remove(idx: number) {
    if (this.field.isArray) {
      const formArray = <FormArray>this.form;
      formArray.removeAt(idx);
    }
  }

}
