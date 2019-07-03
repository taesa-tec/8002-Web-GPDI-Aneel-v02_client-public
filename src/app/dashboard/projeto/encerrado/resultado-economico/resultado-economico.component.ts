import {Component, OnInit} from '@angular/core';
import {ResultadoBase} from '../resultado-base';
import {AppService} from '@app/core/services/app.service';

import {ResultadoEconomicoComponent as Editor} from '../../common/editors/resultado-economico/resultado-economico.component';
import {IndicadoresEconomicos, ResultadoEconomico} from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-resultado-economico',
    templateUrl: './resultado-economico.component.html',
    styles: []
})
export class ResultadoEconomicoComponent extends ResultadoBase<ResultadoEconomico> {

    constructor(app: AppService, modal: NgbModal) {
        super(app, modal, 'ResultadoEconomico', Editor);
    }

    indicador(i) {
        const indicador = IndicadoresEconomicos.find(x => x.value === i);
        return indicador ? indicador.text : '';
    }
}
