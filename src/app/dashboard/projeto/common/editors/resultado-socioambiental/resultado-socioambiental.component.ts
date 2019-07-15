import {Component, OnInit} from '@angular/core';
import {EditorResultado} from '../editor-resultado-base';
import {AppService} from '@app/core/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IndicadoresSocioambientais, ResultadoResponse, ResultadoSocialAmbiental} from '@app/models';
import {tap} from 'rxjs/operators';
import {isNil} from 'lodash-es';
import {Validators} from '@angular/forms';

@Component({
    selector: 'app-resultado-socioambiental',
    templateUrl: './resultado-socioambiental.component.html',
    styles: []
})
export class ResultadoSocioambientalComponent extends EditorResultado<ResultadoSocialAmbiental> {


    readonly formFields: string[] = ['tipo', 'desc', 'positivo'];

    get indicadoresSocioambientais() {
        const resultados = this.resultadosAtuais.map(r => r.tipoValor);
        return IndicadoresSocioambientais.filter(i => {
            return isNil(resultados.find(r => r === i.value)) || (this.editable && this.editable.tipoValor === i.value);
        });
    }

    protected resultadosAtuais: Array<ResultadoSocialAmbiental> = [];

    constructor(app: AppService, activeModal: NgbActiveModal) {
        super(app, activeModal, 'ResultadoSocioAmbiental');
    }

    configForm(): void {
        this.formFields.forEach(f => this.form.get(f).setValidators(Validators.required));
        if (this.sender) {
            this.resultadosAtuais = this.sender.resultados;
        }
    }

    sanitizedValue(field: string, editable?: ResultadoSocialAmbiental) {
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

