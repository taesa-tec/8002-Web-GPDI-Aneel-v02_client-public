import {Component, OnInit} from '@angular/core';
import {EditorResultado} from '../editor-resultado-base';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/core/services/app.service';
import {PropriedadeIntelectual, RecursoHumano, Empresa, EmpresaProjeto, AppValidators, ResultadoPropriedade, ResultadoResponse} from '@app/models';
import {Observable, zip} from 'rxjs';
import {FormGroup, FormArray, FormControl, Validators, ValidationErrors} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-resultado-propriedade-intelectual',
    templateUrl: './resultado-propriedade-intelectual.component.html',
    styles: []
})
export class ResultadoPropriedadeIntelectualComponent extends EditorResultado<ResultadoPropriedade> {

    readonly formFields: string[] = ['tipo', 'dataPedido', 'numeroPedido', 'titulo'];
    readonly tiposPropriedades = PropriedadeIntelectual;

    recursosHumanos: Array<RecursoHumano>;
    empresas: Array<EmpresaProjeto>;

    inventoresGroup: FormArray;
    depositantesGroup: FormArray;

    get depositantePercentual() {
        const entidades = this.depositantesGroup.controls.map(c => c.get('entidade'));
        const values = entidades.map(e => {
            const v = parseFloat(e.value);
            return isNaN(v) ? 0 : v;
        });
        if (values.length > 0) {
            return values.reduce((prev, curr) => {
                return prev + curr;
            });
        } else {

        }
        return 0;
    }

    constructor(app: AppService, activeModal: NgbActiveModal) {
        super(app, activeModal, 'ResultadoIntelectual');
    }

    load() {
        return new Observable<void>(observer => {
            const recursosHumanos$ = this.projeto.REST.RecursoHumanos.listar<Array<RecursoHumano>>();
            const empresas$ = this.projeto.REST.Empresas.listar<Array<EmpresaProjeto>>();
            zip(recursosHumanos$, empresas$).subscribe(([recursosHumanos, empresas]) => {
                this.recursosHumanos = recursosHumanos;
                this.empresas = empresas;
                observer.next();
            }, error => {
                console.error(error);
                observer.error(error);
            });
        });
    }

    sanitizedValue(field: string, editable?: ResultadoPropriedade) {
        if (editable) {
            switch (field) {
                case 'tipo':
                    return editable.tipoValor;
                case 'dataPedido':
                    return editable.dataPedido.substr(0, 10);
            }
        }
        return super.sanitizedValue(field, editable);
    }

    configForm(): void {
        this.formFields.forEach(f => this.form.get(f).setValidators(Validators.required));
        this.inventoresGroup = new FormArray([], this.validarInventores);
        this.depositantesGroup = new FormArray([], this.validarDepositante);
        this.form.addControl('inventores', this.inventoresGroup);
        this.form.addControl('depositantes', this.depositantesGroup);

        if (this.editable) {
            this.editable.inventores.forEach(i => {
                this.adicionarInventor(i.recursoHumanoId);
            });
            this.editable.depositantes.forEach(d => {
                this.adicionarDepositante(d.empresaId, d.entidade);
            });
        }
    }

    filtrarInventor(atual = null) {
        const pid = atual ? parseInt(atual.value.recursoHumanoId, 10) : 0;
        const list = (this.inventoresGroup.value as Array<{ recursoHumanoId: any }>)
            .map(p => parseInt(p.recursoHumanoId, 10));
        return this.recursosHumanos.filter(p => (list.indexOf(p.id) === -1 || p.id === pid));
    }

    adicionarInventor(recursoHumanoId: any = '') {
        this.inventoresGroup.push(new FormGroup({recursoHumanoId: new FormControl(String(recursoHumanoId), Validators.required)}));
    }

    removerInvetor(idx: number) {
        this.inventoresGroup.removeAt(idx);
    }

    adicionarDepositante(empresaId: any = '', entidade: any = '') {
        this.depositantesGroup.push(new FormGroup({
            empresaId: new FormControl(String(empresaId), Validators.required),
            entidade: new FormControl(String(entidade), Validators.required)
        }));
    }

    removerDepositante(idx: number) {
        this.depositantesGroup.removeAt(idx);
    }

    filtrarDepositante(atual = null) {
        const pid = atual ? parseInt(atual.value.empresaId, 10) : 0;
        const list = (this.depositantesGroup.value as Array<{ empresaId: any }>)
            .map(e => parseInt(e.empresaId, 10));
        return this.empresas.filter(e => (list.indexOf(e.id) === -1 || e.id === pid));
    }

    validarDepositante(control: FormArray): ValidationErrors | null {
        const entidades = control.controls.map(c => c.get('entidade'));

        const values = entidades.map(e => {
            const v = parseFloat(e.value);
            return isNaN(v) ? 0 : v;
        });

        if (values.length > 0) {
            const total = values.reduce((prev, curr) => prev + curr);
            if (total !== 100) {
                return {maxPercent: total};
            }
            return null;
        } else {
            return {required: true};
        }
    }

    validarInventores(control: FormArray): ValidationErrors | null {
        if (control.controls.length === 0) {
            return {required: true};
        }
        return null;
    }

    async afterSubmit(result?: ResultadoResponse) {
        if (result && result.sucesso) {
            this.activeModal.close(true);
        }
        await super.afterSubmit();
    }
}

