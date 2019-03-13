import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';
import { ResultadoSocioambientalComponent as Editor } from '../../common/editors/resultado-socioambiental/resultado-socioambiental.component';

@Component({
    selector: 'app-resultado-socioambiental',
    templateUrl: './resultado-socioambiental.component.html',
    styles: []
})
export class ResultadoSocioambientalComponent extends ResultadoBase<any> {

    constructor(app: AppService) { super(app, "ResultadoSocioAmbiental", Editor); }


}