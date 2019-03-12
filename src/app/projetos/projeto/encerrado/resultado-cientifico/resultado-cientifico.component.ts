import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-resultado-cientifico',
    templateUrl: './resultado-cientifico.component.html',
    styleUrls: []
})
export class ResultadoCientificoComponent extends ResultadoBase<any> {

    constructor(app: AppService) { super(app, "ResultadoProducao"); }

}

