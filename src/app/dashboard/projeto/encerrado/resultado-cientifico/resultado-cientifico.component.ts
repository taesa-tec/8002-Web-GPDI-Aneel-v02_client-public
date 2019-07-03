import {Component, OnInit} from '@angular/core';
import {ResultadoBase} from '../resultado-base';
import {AppService} from '@app/core/services/app.service';

import {ResultadoCientificoComponent as Editor} from '../../common/editors/resultado-cientifico/resultado-cientifico.component';
import {TiposProducaoTC} from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-resultado-cientifico',
    templateUrl: './resultado-cientifico.component.html',
    styleUrls: []
})
export class ResultadoCientificoComponent extends ResultadoBase<any> {

    constructor(app: AppService, modal: NgbModal) {
        super(app, modal, 'ResultadoProducao', Editor);
    }

    producao(v: string) {
        const tc = TiposProducaoTC.find(c => c.value === v);
        return tc ? tc.text : '';
    }

}

