import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';

import { ResultadoEconomicoComponent as Editor } from '../../common/editors/resultado-economico/resultado-economico.component';

@Component({
    selector: 'app-resultado-economico',
    templateUrl: './resultado-economico.component.html',
    styles: []
})
export class ResultadoEconomicoComponent extends ResultadoBase<any> {

    constructor(app: AppService) { super(app, "ResultadoEconomico", Editor); }
}
