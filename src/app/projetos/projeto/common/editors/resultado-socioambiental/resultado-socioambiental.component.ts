import { Component, OnInit } from '@angular/core';
import { EditorResultado } from '../editor-resultado-base';
import { AppService } from '@app/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicadoresSocioambientais, ResultadoResponse, ResultadoSocialAmbiental } from '@app/models';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-resultado-socioambiental',
    templateUrl: './resultado-socioambiental.component.html',
    styles: []
})
export class ResultadoSocioambientalComponent extends EditorResultado<ResultadoSocialAmbiental> {


    readonly formFields: string[] = ['tipo', 'desc', 'positivo'];

    readonly indicadoresSocioambientais = IndicadoresSocioambientais;

    constructor(app: AppService, activeModal: NgbActiveModal) { super(app, activeModal, "ResultadoSocioAmbiental"); }

    configForm(): void { }

    sanitizedValue(field: string, editable?: ResultadoSocialAmbiental) {
        if (editable) {
            switch (field) {
                case 'tipo':
                    return editable.tipoValor;

            }
        }
        return super.sanitizedValue(field, editable);
    }
    afterSubmit(result: ResultadoResponse) {
        return super.afterSubmit().pipe(tap(r => {
            if (result && result.sucesso) {
                this.activeModal.close(true);
            }
        }));

    }

}

