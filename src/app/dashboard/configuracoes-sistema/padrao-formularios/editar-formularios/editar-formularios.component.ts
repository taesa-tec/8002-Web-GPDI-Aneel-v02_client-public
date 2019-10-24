import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '@app/core/shared/app-components/loading/loading.component';
import formSketch from "./form-base";
import { FormField, Form as DemandaForm } from '@app/models/demandas';

@Component({
  selector: 'app-editar-formularios',
  templateUrl: './editar-formularios.component.html',
  styleUrls: ['./editar-formularios.component.scss']
})
export class EditarFormulariosComponent implements OnInit {


  field = <FormField>formSketch;
  form: FormGroup;


  @ViewChild(LoadingComponent) loading;

  constructor(protected builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildForm(<DemandaForm>this.field);
  }

  buildControl(field: FormField) {

    const formControl = this.builder.group({});

    if (field.fieldType.match(/RichText|Text|Date|Options/)) {
      formControl.addControl("value", field.isArray ? new FormArray([]) : new FormControl("", [Validators.required]));
    }

    try {
      if (field.children) {
        let children;
        if (field.hasFixedSize) {
          children = this.builder.group({});
          field.children.forEach(child => {
            children.addControl(child.key, this.buildControl(child));
          });
        } else {
          children = this.builder.array([]);
          field.children.forEach(child => {
            children.push(this.buildControl(child));
          });

        }

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

  buildForm(field: DemandaForm) {

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



}
