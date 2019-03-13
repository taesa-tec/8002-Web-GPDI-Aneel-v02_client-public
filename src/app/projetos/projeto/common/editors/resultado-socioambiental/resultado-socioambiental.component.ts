import { Component, OnInit } from '@angular/core';
import { EditorResultado } from '../editor-resultado-base';
import { AppService } from '@app/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-resultado-socioambiental',
    templateUrl: './resultado-socioambiental.component.html',
    styles: []
})
export class ResultadoSocioambientalComponent extends EditorResultado<any> {


    readonly formFields: string[] = [];

    constructor(app: AppService, activeModal: NgbActiveModal) { super(app, activeModal, "ResultadoSocioAmbiental"); }

    configForm(): void { }

}

