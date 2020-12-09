import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormField } from '@app/models/demandas';
import _configEditor from './config-editor';

@Component({
  selector: 'app-form-field-control',
  templateUrl: 'form-field-control.component.html',
  styleUrls: ['form-field-control.component.scss']
})
export class FormFieldControlComponent implements OnInit {
  constructor() {
  }

  @Input() form: AbstractControl;
  @Input() field: FormField;
  @Input() readonly = false;
  @Input() canRemove = false;
  configEditor = _configEditor;

  @Output() remove = new EventEmitter<any>();

  ngOnInit() {
  }
}
