import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorResultado } from '../editor-resultado-base';

@Component({
    selector: 'app-resultado-cientifico',
    templateUrl: './resultado-cientifico.component.html',
    styleUrls: []
})
export class ResultadoCientificoComponent extends EditorResultado<any> {


    readonly formFields: string[] = [];

    constructor(app: AppService, activeModal: NgbActiveModal) { super(app, activeModal, "ResultadoProducao"); }

    configForm(): void { }

}

