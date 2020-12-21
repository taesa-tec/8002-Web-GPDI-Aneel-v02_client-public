import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-clausula-form',
  templateUrl: './clausula-form.component.html',
  styleUrls: ['./clausula-form.component.scss']
})
export class ClausulaFormComponent implements OnInit {

  clausula: any;
  formClausula: FormGroup;

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formClausula = this.fb.group({
      texto: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(this.formClausula.valid) {
      console.log(this.formClausula.value);
      //this.app.alert('Produto adicionado com sucesso');
      this.activeModal.close();
    }
  }

}
