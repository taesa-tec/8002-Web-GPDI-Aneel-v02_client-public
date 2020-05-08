import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AppService } from '@app/services/app.service';

interface Clausula {
  id: number;
  ordem: number;
  clausula: string;
}

@Component({
  selector: 'app-contrato-base',
  templateUrl: './contrato-base.component.html',
  styleUrls: ['./contrato-base.component.scss']
})
export class ContratoBaseComponent implements OnInit {

  clausulas: Array<Clausula> = [];

  formContrato: FormGroup = this.fb.group({
    clausulas: this.fb.array([])
  });

  get _clausulas(): FormArray {
    return <FormArray>this.formContrato.get('clausulas');
  }

  constructor(
    protected app: AppService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm();
  }
  
  async configForm() {
    this.clausulas = this.getContratoBase.clausulas;

    if (this.clausulas.length) {
      this.clausulas.map(item => this.addClausula(item));
    } else {
      this.addClausula();
    }
  }

  addClausula(clausula: Clausula = null) {
    const formGroup = this.fb.group({
      id: [0],
      ordem: [this._clausulas.length + 1],
      clausula: ['', [Validators.required]],
    });

    if (clausula !== null) {
      formGroup.patchValue(clausula);
    }
    this._clausulas.push(formGroup);
  }

  removeClausula(i: number) {
    this._clausulas.removeAt(i);
  }

  move(i, o) {
    const control = this._clausulas.controls.splice(i, 1)[0];
    this._clausulas.controls.splice(i + o, 0, control);
    this._clausulas.controls.map((item, i) => item.get('ordem').setValue(i + 1));
    this.formContrato.updateValueAndValidity();
  }

  async onSubmit() {
    if (this.formContrato.valid) {
      const contratoBase: Array<Clausula> = this.formContrato.value;

      try {
        console.log(contratoBase);
        this.app.alert('Contrato salvo com sucesso');

      } catch (e) {
        this.app.alert('Não foi possível salvar o contrato');
        console.log(e);
      }
    }
  }

  getContratoBase = {
    clausulas: [
      {
        id: 10,
        ordem: 1,
        clausula: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        id: 20,
        ordem: 2,
        clausula: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
      }
    ]
  }

}
