import {Component, OnInit} from '@angular/core';
import {ResultadoBase} from '../resultado-base';
import {AppService} from '@app/services/app.service';
import {ResultadoPropriedadeIntelectualComponent as Editor} from '../../common/editors/resultado-propriedade-intelectual/resultado-propriedade-intelectual.component';
import {ResultadoPropriedade, PropriedadeIntelectual} from '@app/commons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-resultado-propriedade-intelectual',
    templateUrl: './resultado-propriedade-intelectual.component.html',
    styles: []
})
export class ResultadoPropriedadeIntelectualComponent extends ResultadoBase<ResultadoPropriedade> {

    readonly tiposPropriedades = PropriedadeIntelectual;

    constructor(app: AppService, modal: NgbModal) {
        super(app, modal, 'ResultadoIntelectual', Editor);
    }

    tipoPropriedade(tipo: string) {
        const t = this.tiposPropriedades.find(i => i.value === tipo);
        return t ? t.text : '';

    }

}
