import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {RecursoHumano} from '@app/models';
import {ProjetoFacade} from '@app/facades/index';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import * as moment from 'moment';
import {RegistroRecursoBase} from '../registro-recurso-base';

@Component({
    selector: 'app-registro-recurso-humano',
    templateUrl: './registro-recurso-humano.component.html',
    styles: []
})
export class RegistroRecursoHumanoComponent extends RegistroRecursoBase {


    recursos: Array<RecursoHumano>;
    qtdHrs: FormControl;

    constructor(protected app: AppService) {
        super(app);
    }

    get valorFinal() {
        if (this.recurso) {
            const qtdHrs = this.qtdHrs.value;
            const recursoHumanoId = parseInt(this.recurso.value, 10);
            const recurso = this.recursos.find(r => {
                return r.id === recursoHumanoId;
            });
            if (recurso && qtdHrs > 0) {
                return qtdHrs * recurso.valorHora;
            }
        }
        return 0;
    }

    get observacoes() {
        return this.registro.obsInternas.filter(obs => obs.texto != null && obs.texto.length > 0);
    }

    protected getRecursos(projeto: ProjetoFacade) {
        return projeto.REST.RecursoHumanos.listar();
    }

    buildForm() {
        super.buildForm();

        const mes = moment(this.registro.mes).format('YYYY-MM-DD');
        const dataDocumento = moment(this.registro.dataDocumento).format('YYYY-MM-DD');

        this.recurso = new FormControl(this.registro.recursoHumanoId, [Validators.required]);

        this.qtdHrs = new FormControl(this.registro.qtdHrs, [Validators.required]);


        this.form = new FormGroup({
            id: new FormControl(this.registro.id),
            projetoId: new FormControl(this.projeto.id),
            tipo: new FormControl('RH'),
            recursoHumanoId: this.recurso,
            empresaFinanciadoraId: new FormControl(this.registro.empresaFinanciadoraId, [Validators.required]),
            mes: new FormControl(mes, [Validators.required]),
            qtdHrs: this.qtdHrs,
            tipoDocumento: new FormControl(this.registro.tipoDocumentoValor, [Validators.required]),
            numeroDocumento: new FormControl(this.registro.numeroDocumento, [Validators.required]),
            dataDocumento: new FormControl(dataDocumento, [Validators.required]),
            atividadeRealizada: new FormControl(this.registro.atividadeRealizada, [Validators.required])
        });

        if (!this.isEditable) {
            this.form.disable();
        } else {
            this.buildFormObs();
        }
    }

}
