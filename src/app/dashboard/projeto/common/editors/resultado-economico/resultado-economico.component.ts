import {Component, OnInit} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EditorResultado} from '../editor-resultado-base';
import {IndicadoresEconomicos, ResultadoResponse} from '@app/models';
import {Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-resultado-economico',
    templateUrl: './resultado-economico.component.html',
    styles: []
})
export class ResultadoEconomicoComponent extends EditorResultado<any> {

    readonly formFields: string[] = ['tipo', 'desc', 'unidadeBase', 'valorIndicador', 'percentagem', 'valorBeneficio'];

    readonly indicadoresEconomicos = IndicadoresEconomicos;

    constructor(app: AppService, activeModal: NgbActiveModal) {
        super(app, activeModal, 'ResultadoEconomico');
    }

    configForm(): void {
        this.formFields.forEach(f => this.form.get(f).setValidators(Validators.required));
        this.form.updateValueAndValidity();
    }

    sanitizedValue(field: string, editable?: any) {
        if (editable) {
            switch (field) {
                case 'tipo':
                    return editable.tipoValor;
            }
        }
        return super.sanitizedValue(field, editable);
    }

    async afterSubmit(result: ResultadoResponse) {
        if (result && result.sucesso) {
            this.activeModal.close(true);
        }
        await super.afterSubmit(result);

    }

}

