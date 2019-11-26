import {Component, OnInit, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {FormField} from '@app/models/demandas';
import _configEditor from './config-editor';

@Component({
  selector: 'app-form-field-control',
  templateUrl: 'form-field-control.component.html'
})
export class FormFieldControlComponent implements OnInit {
  constructor() {
  }

  @Input() form: AbstractControl;
  @Input() field: FormField;
  @Input() readonly = false;
  configEditor = _configEditor;

  ngOnInit() {
  }
}
