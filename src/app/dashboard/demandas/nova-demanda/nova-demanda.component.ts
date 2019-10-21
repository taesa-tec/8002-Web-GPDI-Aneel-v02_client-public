import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { CriarDemanda } from '../../painel-demandas/conf-padrao/services/criar-demanda.service';

@Component({
  selector: 'app-nova-demanda',
  templateUrl: './nova-demanda.component.html',
  styleUrls: ['./nova-demanda.component.scss']
})

export class NovaDemandaComponent implements OnInit {

  formNovaDemanda: FormGroup;
  statuscad: any;
  constructor(private fb: FormBuilder,public activeModal: NgbActiveModal, private add: CriarDemanda) { }

  ngOnInit() {
    this.formNovaDemanda = this.fb.group({
      tituloDemanda: ['Nova Demanda', [Validators.required]],
    });
  }

  async onSubmit(){
    this.statuscad = await this.add.novademanda(this.formNovaDemanda.value);

  }

}
