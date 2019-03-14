import { Component, OnInit } from '@angular/core';
import { ResultadoBase } from '../resultado-base';
import { AppService } from '@app/app.service';
import { ResultadoSocioambientalComponent as Editor } from '../../common/editors/resultado-socioambiental/resultado-socioambiental.component';
import { ResultadoSocialAmbiental, IndicadoresSocioambientais } from '@app/models';

@Component({
    selector: 'app-resultado-socioambiental',
    templateUrl: './resultado-socioambiental.component.html',
    styles: []
})
export class ResultadoSocioambientalComponent extends ResultadoBase<ResultadoSocialAmbiental> {
    constructor(app: AppService) { super(app, "ResultadoSocioAmbiental", Editor); }

    indicador(tipo: string) {
        const t = IndicadoresSocioambientais.find(i => i.value === tipo);
        return t ? t.text : '';

    }

}