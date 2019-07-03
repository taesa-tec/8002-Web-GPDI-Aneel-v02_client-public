import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/core/services/app.service';
import { LoadingComponent } from '@app/core/shared/app-components/loading/loading.component';
import { ResultadoBase } from '../resultado-base';
import { ResultadoCapacitacaoComponent as Editor } from '../../common/editors/resultado-capacitacao/resultado-capacitacao.component';
import { ResultadoCapacitacao, TiposCapacitacao } from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-resultado-capacitacao',
    templateUrl: './resultado-capacitacao.component.html',
    styleUrls: []
})
export class ResultadoCapacitacaoComponent extends ResultadoBase<ResultadoCapacitacao> {
    constructor(app: AppService, modal: NgbModal) {
        super(app, modal, "ResultadoCapacitacao", Editor); }

    capacitacao(v: string) {
        const tc = TiposCapacitacao.find(c => c.value === v);
        return tc ? tc.text : '';
    }
}
