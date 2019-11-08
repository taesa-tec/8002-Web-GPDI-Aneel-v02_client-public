import { Component, OnInit, Input } from '@angular/core';
import { FormField } from '@app/models/demandas';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-demanda',
  templateUrl: 'form-demanda.component.html'
})

export class FormDemandaComponent implements OnInit {




  constructor(protected builder: FormBuilder) { }

  ngOnInit() {

  }


}
