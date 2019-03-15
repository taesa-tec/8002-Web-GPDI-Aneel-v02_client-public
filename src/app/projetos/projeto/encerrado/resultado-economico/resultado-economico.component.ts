import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';

import { ResultadoEconomicoComponent as Editor } from '../../common/editors/resultado-economico/resultado-economico.component';
import { IndicadoresEconomicos, ResultadoEconomico } from '@app/models';

@Component({
    selector: 'app-resultado-economico',
    templateUrl: './resultado-economico.component.html',
    styles: []
})
export class ResultadoEconomicoComponent extends ResultadoBase<ResultadoEconomico> {

    constructor(app: AppService) { super(app, "ResultadoEconomico", Editor); }

    indicador(i) {
        const indicador = IndicadoresEconomicos.find(x => x.value === i);
        return indicador ? indicador.text : '';
    }
}
