import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';
import { ResultadoPropriedadeIntelectualComponent as Editor } from '../../common/editors/resultado-propriedade-intelectual/resultado-propriedade-intelectual.component';

@Component({
    selector: 'app-resultado-propriedade-intelectual',
    templateUrl: './resultado-propriedade-intelectual.component.html',
    styles: []
})
export class ResultadoPropriedadeIntelectualComponent extends ResultadoBase<any> {

    constructor(app: AppService) { super(app, "ResultadoIntelectual", Editor); }

}