import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-resultado-infra-estrutura',
    templateUrl: './resultado-infra-estrutura.component.html',
    styles: []
})
export class ResultadoInfraEstruturaComponent extends ResultadoBase<any> {

    constructor(app: AppService) { super(app, "ResultadoInfra"); }

}