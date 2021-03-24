import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {FormField} from '@app/commons/demandas';
import {ClassicEditor, ConfigEditor} from '@app/core/shared';


@Component({
  selector: 'app-form-field-control',
  templateUrl: 'form-field-control.component.html',
  styleUrls: ['form-field-control.component.scss']
})
export class FormFieldControlComponent implements OnInit {
  constructor() {
  }

  editor = ClassicEditor;
  @Input() form: AbstractControl;
  @Input() field: FormField;
  @Input() readonly = false;
  @Input() canRemove = false;
  configEditor = ConfigEditor;

  @Output() remove = new EventEmitter<any>();

  ngOnInit() {
  }
}
