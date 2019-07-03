import {Component, OnInit} from '@angular/core';
import {ResultadoBase} from '../resultado-base';
import {AppService} from '@app/core/services/app.service';
import {ResultadoInfraEstruturaComponent as Editor} from '../../common/editors/resultado-infra-estrutura/resultado-infra-estrutura.component';
import {ResultadoInfra} from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-resultado-infra-estrutura',
    templateUrl: './resultado-infra-estrutura.component.html',
    styles: []
})
export class ResultadoInfraEstruturaComponent extends ResultadoBase<ResultadoInfra> {

    constructor(app: AppService, modal: NgbModal) {
        super(app, modal, 'ResultadoInfra', Editor);
    }

}
