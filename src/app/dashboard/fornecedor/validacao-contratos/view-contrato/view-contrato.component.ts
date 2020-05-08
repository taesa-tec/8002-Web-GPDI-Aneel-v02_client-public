import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-view-contrato',
  templateUrl: './view-contrato.component.html',
  styleUrls: ['./view-contrato.component.scss']
})
export class ViewContratoComponent implements OnInit {

  formContrato: FormGroup;

  constructor(
    private app: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    const idControto = this.route.snapshot.params["id"]; 
    const contrato = this._getContrato(idControto);

    this.formContrato = this.fb.group({
      id: [contrato.id, [Validators.required]],
      texto: [contrato.texto, [Validators.required]]
    });
  }

  onSubmit() {
    if(this.formContrato.valid) {
      console.log(this.formContrato.value);
    }
  }

  _getContrato(id) {
    switch(id) {
      case "1": 
        return { id: 1, texto: "Contrato 1" } 
      case "2": 
        return { id: 2, texto: "Contrato 2" }
    }
  }

}
