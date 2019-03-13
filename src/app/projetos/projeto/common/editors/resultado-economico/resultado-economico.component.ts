import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorResultado } from '../editor-resultado-base';

@Component({
  selector: 'app-resultado-economico',
  templateUrl: './resultado-economico.component.html',
  styles: []
})
export class ResultadoEconomicoComponent extends EditorResultado<any> {

    readonly formFields: string[] = [];

    constructor(app: AppService, activeModal: NgbActiveModal) { super(app, activeModal, "ResultadoEconomico"); }

    configForm(): void { }

}

