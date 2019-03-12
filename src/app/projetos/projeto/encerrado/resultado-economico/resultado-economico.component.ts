import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-resultado-economico',
    templateUrl: './resultado-economico.component.html',
    styles: []
})
export class ResultadoEconomicoComponent extends ResultadoBase<any> {

    constructor(app: AppService) { super(app, "ResultadoEconomico"); }
}
