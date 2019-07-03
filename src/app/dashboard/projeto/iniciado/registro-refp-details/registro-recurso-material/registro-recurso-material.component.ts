import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

import * as moment from 'moment';
import {zip, Observable, of, timer} from 'rxjs';

import {AppService} from '@app/core/services/app.service';
import {RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto, Etapa, TextValue, RecursoMaterial, AppValidators, CategoriasContabeis, RegistroREFP, ResultadoResponse} from '@app/models';
import {ProjetoFacade} from '@app/facades/index';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {RegistroRecursoBase} from '../registro-recurso-base';
import {map} from 'rxjs/operators';

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

    @Input() registro: RegistroREFP;

    @Output() registroAlterado: EventEmitter<void> = new EventEmitter();

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get cnpjCpfMask(): string {
        const currentValue = this.form.get('cnpjBeneficiado').value;
        if (currentValue) {
            return currentValue.replace(/\D/, '').length < 12 ? '000.000.000-009' : '00.000.000/0000-00';
        }
        return '0';
    }

    get categoriaContabil() {
        return this.form.get(this.projeto.isPG ? 'catalogCategoriaContabilGestaoId' : 'categoriaContabil');
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

    get atividades() {
        if (this.projeto.isPD || this.form === undefined) {
            return [];
        }

        try {
            const c = this.categoriasContabeis.find(cc => String(cc.value) === String(this.categoriaContabil.value));

            return c ? c.atividades.map(a => {
                return {text: a.nome, value: a.id};
            }) : [];
        } catch (e) {

            return [];
        }

    }

    get observacoes() {
        return this.registro.obsInternas.filter(obs => obs.texto.trim().length > 0);
    }

    constructor(protected app: AppService) {
        super(app);
    }

    protected getRecursos(projeto: ProjetoFacade) {
        return projeto.REST.RecursoMateriais.listar();
    }

    buildForm() {
        super.buildForm();

        const mes = moment(this.registro.mes).format('YYYY-MM-DD');
        const dataDocumento = moment(this.registro.dataDocumento).format('YYYY-MM-DD');

        this.recurso = new FormControl(this.registro.recursoMaterialId, [Validators.required]);

        this.form = new FormGroup({
            id: new FormControl(this.registro.id),
            projetoId: new FormControl(this.projeto.id),
            tipo: new FormControl('RM'),
            tipoDocumento: new FormControl(this.registro.tipoDocumentoValor, [Validators.required]),
            numeroDocumento: new FormControl(this.registro.numeroDocumento, [Validators.required]),
            dataDocumento: new FormControl(dataDocumento, [Validators.required]),
            nomeItem: new FormControl(this.registro.nomeItem, [Validators.required]),
            recursoMaterialId: this.recurso,
            empresaFinanciadoraId: new FormControl(this.registro.empresaFinanciadoraId, [Validators.required]),
            // empresaRecebedoraId: new FormControl(this.registro.empresaRecebedoraId, [Validators.required]),
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

        if (this.projeto.isPG) {
            const catalogCategoriaContabilGestaoId = new FormControl(this.registro.catalogCategoriaContabilGestaoId || '', [Validators.required]);
            this.form.addControl('catalogCategoriaContabilGestaoId', catalogCategoriaContabilGestaoId);
            this.form.addControl('catalogAtividadeId', new FormControl(this.registro.atividade ? String(this.registro.atividade.id) : '', [Validators.required]));

            timer(100).subscribe(() => {
                catalogCategoriaContabilGestaoId.valueChanges.subscribe(v => {
                    this.form.get('catalogAtividadeId').setValue('');
                });
            });
        } else {
            this.form.addControl('categoriaContabil', new FormControl(this.registro.categoriaContabilValor || '', Validators.required));
            this.form.addControl('empresaRecebedoraId', new FormControl(this.registro.empresaRecebedoraId || '', Validators.required));
        }

        this.toggleMaterialPermanente(this.categoriaContabil.value === 'MP');

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
