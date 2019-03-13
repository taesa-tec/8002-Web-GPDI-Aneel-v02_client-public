import { Component, OnInit } from '@angular/core';
import { EditorResultado } from '../editor-resultado-base';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-resultado-propriedade-intelectual',
    templateUrl: './resultado-propriedade-intelectual.component.html',
    styles: []
})
export class ResultadoPropriedadeIntelectualComponent extends EditorResultado<any> {


    readonly formFields: string[] = [];

    constructor(app: AppService, activeModal: NgbActiveModal) { super(app, activeModal, "ResultadoIntelectual"); }

    configForm(): void { }

}

