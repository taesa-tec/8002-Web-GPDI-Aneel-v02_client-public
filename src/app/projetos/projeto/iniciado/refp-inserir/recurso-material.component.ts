import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import * as moment from 'moment';
import { zip, of } from 'rxjs';

import { AppService } from '@app/app.service';
import { RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto, Etapa, TextValue, RecursoMaterial, AppValidators, CategoriasContabeis, NoRequest } from '@app/models';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-recurso-material',
    templateUrl: './recurso-material.component.html',
    styles: []
})
export class RecursoMaterialComponent implements OnInit {

    etapas: Array<Etapa>;
    projeto: ProjetoFacade;
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

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild('file') file: ElementRef;



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

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {

            this.projeto = projeto;

            const recursos$ = this.projeto.relations.recursosMateriais.get();
            const empresas$ = this.projeto.relations.empresas.get();
            const etapas$ = this.projeto.relations.etapas.get();

            this.loading.show(1000);
            zip(recursos$, empresas$, etapas$).subscribe(([recursos, empresas, etapas]) => {
                this.etapas = etapas;
                this.recursos = recursos;
                this.empresas = empresas.map(e => {

                    return {
                        id: e.id,
                        nome: e.catalogEmpresaId ? `${e.catalogEmpresa.nome} - ${e.catalogEmpresa.valor}` : e.razaoSocial,
                        classificacao: e.classificacaoValor
                    };


                });
                this.empresasFinanciadoras = this.empresas.filter(e => e.classificacao !== "Executora");
                this.empresasRecebedoras = this.empresas;

                this.buildForm();
            });
            // const empresas = this.app.projetos

        });
    }

    buildForm() {
        this.obsInternas = new FormGroup({
            texto: new FormControl('')
        });

        this.recurso = new FormControl('', [Validators.required]);

        this.mesesRef = [];

        this.etapas.map(etapa => {
            let start = moment(etapa.dataInicio);
            const end = moment(etapa.dataFim);

            while (start.isBefore(end)) {
                this.mesesRef.push({
                    text: start.format('MMMM YYYY'),
                    value: start.format('YYYY-MM-DD')
                });
                start.add(1, 'M');
                if (this.mesesRef.length > 10) {
                    break;
                }

            }
        });

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id),
            tipo: new FormControl("RM"),
            tipoDocumento: new FormControl('', [Validators.required]),
            numeroDocumento: new FormControl('', [Validators.required]),
            dataDocumento: new FormControl('', [Validators.required]),
            nomeItem: new FormControl('', [Validators.required]),
            recursoMaterialId: this.recurso,
            empresaFinanciadoraId: new FormControl('', [Validators.required]),
            empresaRecebedoraId: new FormControl('', [Validators.required]),
            beneficiado: new FormControl('', [Validators.required]),
            cnpjBeneficiado: new FormControl('', [Validators.required, AppValidators.cnpj]),
            categoriaContabil: new FormControl(''),
            // 
            equiparLabExistente: new FormControl(''),
            equiparLabNovo: new FormControl(''),
            itemNacional: new FormControl(''),
            //
            qtdItens: new FormControl(''),
            mes: new FormControl('', [Validators.required]),
            valorUnitario: new FormControl('', [Validators.required]),
            especificacaoTecnica: new FormControl('', [Validators.required]),
            funcaoRecurso: new FormControl('', [Validators.required]),
            obsInternas: new FormArray([this.obsInternas])
        });

        this.categoriaContabil.valueChanges.subscribe(value => {
            if (value === 'MP') {
                this.form.addControl('equiparLabExistente', new FormControl('', [Validators.required]));
                this.form.addControl('equiparLabNovo', new FormControl('', [Validators.required]));
                this.form.addControl('itemNacional', new FormControl('', [Validators.required]));
            } else {
                this.form.removeControl('equiparLabExistente');
                this.form.removeControl('equiparLabNovo');
                this.form.removeControl('itemNacional');
            }
            this.form.updateValueAndValidity();
        });

        this.form.updateValueAndValidity();
    }

    submit() {
        if (this.form.valid) {
            this.loading.show();
            this.app.projetos.criarRegistroREFP(this.form.value).subscribe(result => {

                if (result.sucesso) {
                    this.sendFile(result.id).subscribe(_result => {
                        this.loading.hide();
                        this.form.reset();
                        this.app.alert("Salvo com sucesso!");
                    });
                } else {
                    this.loading.hide();
                    this.app.alert(result.inconsistencias.join(', '));
                }
            });
        }
    }
    changeFile(event) { }

    sendFile(id?) {
        const el = this.file.nativeElement as HTMLInputElement;

        if (el.files.length > 0) {
            return this.app.file.upload(el.files.item(0), new FormGroup({
                RegistroFinanceiroId: new FormControl(id),
            })).pipe(tap(result => {
                if (result.sucesso) {
                    this.file.nativeElement.value = "";
                }
            }));
        }

        return of(NoRequest);
    }

}
