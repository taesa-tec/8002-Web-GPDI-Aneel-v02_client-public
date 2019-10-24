import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormField } from '@app/models/demandas';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ["./form-editor.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class FormEditorComponent implements OnInit {
  @Input() formField: FormField;
  form: FormGroup;

  constructor(protected builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildForm(this.formField);
    this.form.updateValueAndValidity();
    console.log(this.form);
  }

  buildControl(field: FormField) {

    const formControl = this.builder.group({});

    if (field.fieldType.match(/RichText|Text|Date|Options/)) {
      //formControl.addControl("fieldValue", field.isArray ? new FormArray([]) : new FormControl("", [Validators.required]));
      formControl.addControl("value", new FormControl("", [Validators.required]));
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

        if (field.fieldType === "Form") {
          return children;
        }
        formControl.addControl("children", children);

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
    return formControl;


  }

  submit() {
    console.log(this.form.value);
  }


}
