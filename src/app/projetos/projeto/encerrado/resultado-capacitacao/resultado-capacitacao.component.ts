import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { ResultadoBase } from '../resultado-base';

@Component({
    selector: 'app-resultado-capacitacao',
    templateUrl: './resultado-capacitacao.component.html',
    styleUrls: []
})
export class ResultadoCapacitacaoComponent extends ResultadoBase<any> {
    constructor(app: AppService) { super(app, "ResultadoCapacitacao"); }
}
