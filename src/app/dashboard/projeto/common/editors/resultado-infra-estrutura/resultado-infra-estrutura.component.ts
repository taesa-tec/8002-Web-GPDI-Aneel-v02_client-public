import {Component, OnInit} from '@angular/core';
import {EditorResultado} from '../editor-resultado-base';
import {AppService} from '@app/core/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ResultadoInfra, TiposInfraestrutura, AppValidators, ResultadoResponse} from '@app/models';
import {Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-resultado-infra-estrutura',
    templateUrl: './resultado-infra-estrutura.component.html',
    styles: []
})
export class ResultadoInfraEstruturaComponent extends EditorResultado<ResultadoInfra> {

    readonly formFields: string[] = ['tipo', 'cnpjReceptora', 'nomeLaboratorio', 'areaPesquisa', 'listaMateriais'];
    readonly tiposInfras = TiposInfraestrutura;

    constructor(app: AppService, activeModal: NgbActiveModal) {
        super(app, activeModal, 'ResultadoInfra');
    }

    configForm(): void {
        this.formFields.forEach(f => this.form.get(f).setValidators(Validators.required));
        this.form.get('cnpjReceptora').setValidators([Validators.required, AppValidators.cnpj]);
        this.form.updateValueAndValidity();
    }

    sanitizedValue(field: string, editable?: ResultadoInfra) {
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
