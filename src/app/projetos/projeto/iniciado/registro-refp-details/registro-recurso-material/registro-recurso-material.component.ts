import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import * as moment from 'moment';
import { zip, Observable } from 'rxjs';

import { AppService } from '@app/app.service';
import { RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto, Etapa, TextValue, RecursoMaterial, AppValidators, CategoriasContabeis, RegistroREFP, ResultadoResponse } from '@app/models';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { RegistroRecursoBase } from '../registro-recurso-base';

@Component({
    selector: 'app-registro-recurso-material',
    templateUrl: './registro-recurso-material.component.html',
    styles: []
})
export class RegistroRecursoMaterialComponent extends RegistroRecursoBase {

    recursos: Array<RecursoMaterial>;
    recurso: FormControl;

    empresas: Array<{ id: number; nome: string; classificacao: string; }>;
    empresasFinanciadoras: Array<{ id: number; nome: string; classificacao: string; }>;
    empresasRecebedoras: Array<{ id: number; nome: string; classificacao: string; }>;
    tipoDocs = TiposDoc;
    form: FormGroup;
    obsInternas: FormGroup;
    mesesRef: Array<TextValue>;
    categoriasContabeis = CategoriasContabeis;

    @Input() registro: RegistroREFP;

    @Output() registroAlterado: EventEmitter<void> = new EventEmitter();

    @ViewChild(LoadingComponent) loading: LoadingComponent;



    get categoriaContabil() {
        return this.form.get('categoriaContabil');
    }
    get qtdItens() {
        return this.form.get('qtdItens');
    }
    get valorUnitario() {
        return this.form.get('valorUnitario');
    }

    get valorFinal() {
        if (this.qtdItens && this.valorUnitario) {
            return parseFloat(this.qtdItens.value) * parseFloat(this.valorUnitario.value);
        }
        return 0;
    }



    constructor(protected app: AppService) {
        super(app);
    }

    protected getRecursos(projeto: ProjetoFacade) {
        return projeto.relations.recursosMateriais.get();
    }

    buildForm() {
        super.buildForm();

        const mes = moment(this.registro.mes).format('YYYY-MM-DD');
        const dataDocumento = moment(this.registro.dataDocumento).format('YYYY-MM-DD');

        this.recurso = new FormControl(this.registro.recursoMaterialId, [Validators.required]);

        this.form = new FormGroup({
            id: new FormControl(this.registro.id),
            projetoId: new FormControl(this.projeto.id),
            tipo: new FormControl("RM"),
            tipoDocumento: new FormControl(this.registro.tipoDocumentoValor, [Validators.required]),
            numeroDocumento: new FormControl(this.registro.numeroDocumento, [Validators.required]),
            dataDocumento: new FormControl(dataDocumento, [Validators.required]),
            nomeItem: new FormControl(this.registro.nomeItem, [Validators.required]),
            recursoMaterialId: this.recurso,
            empresaFinanciadoraId: new FormControl(this.registro.empresaFinanciadoraId, [Validators.required]),
            empresaRecebedoraId: new FormControl(this.registro.empresaRecebedoraId, [Validators.required]),
            beneficiado: new FormControl(this.registro.beneficiado, [Validators.required]),
            cnpjBeneficiado: new FormControl(this.registro.cnpjBeneficiado, [Validators.required, AppValidators.cnpj]),
            categoriaContabil: new FormControl(this.registro.categoriaContabilValor),
            qtdItens: new FormControl(this.registro.qtdItens),
            mes: new FormControl(mes, [Validators.required]),
            valorUnitario: new FormControl(this.registro.valorUnitario, [Validators.required]),
            especificacaoTecnica: new FormControl(this.registro.especificacaoTecnica, [Validators.required]),
            funcaoRecurso: new FormControl(this.registro.funcaoRecurso, [Validators.required]),
            // 
            equiparLabExistente: new FormControl(this.registro.equiparLabExistente),
            equiparLabNovo: new FormControl(this.registro.equiparLabNovo),
            itemNacional: new FormControl(this.registro.itemNacional),
            //
        });

        if (!this.isEditable) {
            this.form.disable();
        } else {
            this.obsInternas = new FormGroup({
                texto: new FormControl('', Validators.required)
            });
            this.form.addControl('obsInternas', new FormArray([this.obsInternas]));
        }

        this.categoriaContabil.valueChanges.subscribe(value => {

            this.toggleMaterialPermanente(value === 'MP');
            this.form.updateValueAndValidity();

        });

        this.form.updateValueAndValidity();
    }


    protected toggleMaterialPermanente(ativo: boolean) {
        if (ativo) {
            this.form.addControl('equiparLabExistente', new FormControl('', [Validators.required]));
            this.form.addControl('equiparLabNovo', new FormControl('', [Validators.required]));
            this.form.addControl('itemNacional', new FormControl('', [Validators.required]));
        } else {
            this.form.removeControl('equiparLabExistente');
            this.form.removeControl('equiparLabNovo');
            this.form.removeControl('itemNacional');
        }
    }

    editarRegistro() {
        this.toggleMaterialPermanente(this.categoriaContabil.value === 'MP');
        super.editarRegistro();
    }

}
