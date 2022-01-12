import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {ServiceBase} from '@app/services/service-base.service';
import {ActivatedRoute} from '@angular/router';

interface Clausula {
  id: number;
  ordem: number;
  conteudo: string;
}

@Component({
  selector: 'app-contrato-base',
  templateUrl: './clausulas.component.html',
  styleUrls: ['./clausulas.component.scss']
})
export class ClausulasComponent implements OnInit {


  form: FormGroup = this.fb.group({
    clausulas: this.fb.array([])
  });

  get clausulas(): FormArray {
    return <FormArray>this.form.get('clausulas');
  }

  constructor(protected app: AppService, private fb: FormBuilder, protected service: ServiceBase<any>, protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    const clausulas = this.route.snapshot.data.clausulas;
    if (clausulas.length) {
      clausulas.forEach(item => this.addClausula(item));
    } else {
      this.addClausula();
    }
  }

  addClausula(clausula: Clausula = null) {
    const formGroup = this.fb.group({
      id: [0],
      ordem: ['0'],
      conteudo: ['', [Validators.required]],
    });
    this.clausulas.push(formGroup);

    if (clausula !== null) {
      formGroup.patchValue(clausula);
    }
  }

  removeClausula(i: number) {
    this.clausulas.removeAt(i);
  }

  move(idx, o) {
    const control = this.clausulas.controls.splice(idx, 1)[0];
    this.clausulas.controls.splice(idx + o, 0, control);
    this.clausulas.controls.map((item, i) => item.get('ordem').setValue(i + 1));
    this.form.updateValueAndValidity();
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        this.app.showLoading();
        await this.service.criar(this.clausulas.value);
      } catch (e) {
        console.error(e);
      } finally {
        this.app.hideLoading();
      }

    }
  }
}
