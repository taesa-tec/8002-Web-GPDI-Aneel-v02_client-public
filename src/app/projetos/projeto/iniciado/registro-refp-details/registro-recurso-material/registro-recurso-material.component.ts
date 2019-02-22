import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import * as moment from 'moment';
import { zip, Observable } from 'rxjs';

import { AppService } from '@app/app.service';
import { RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto, Etapa, TextValue, RecursoMaterial, AppValidators, CategoriasContabeis, RegistroREFP, ResultadoResponse } from '@app/models';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-registro-recurso-material',
    templateUrl: './registro-recurso-material.component.html',
    styles: []
})
export class RegistroRecursoMaterialComponent implements OnInit {
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

    get isPendente() {
        return this.registro.statusValor === 'Pendente';
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
        const mes = moment(this.registro.mes).format('YYYY-MM-DD');
        const dataDocumento = moment(this.registro.dataDocumento).format('YYYY-MM-DD');

        this.recurso = new FormControl(this.registro.recursoMaterialId, [Validators.required]);

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
            // 
            equiparLabExistente: new FormControl(this.registro.equiparLabExistente),
            equiparLabNovo: new FormControl(this.registro.equiparLabNovo),
            itemNacional: new FormControl(this.registro.itemNacional),
            //
            qtdItens: new FormControl(this.registro.qtdItens),
            mes: new FormControl(mes, [Validators.required]),
            valorUnitario: new FormControl(this.registro.valorUnitario, [Validators.required]),
            especificacaoTecnica: new FormControl(this.registro.especificacaoTecnica, [Validators.required]),
            funcaoRecurso: new FormControl(this.registro.funcaoRecurso, [Validators.required]),
        });
        
        if (this.isPendente) {
            this.form.disable();
        }

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
                this.loading.hide();
                if (result.sucesso) {
                    this.app.alert("Salvo com sucesso!");
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
            });
        }
    }

    saveStatus(status: 'aprovado' | 'reprovado') {
        const request = (): Observable<ResultadoResponse> => {
            switch (status) {
                case 'aprovado':
                    return this.projeto.relations.REFP.aprovarRegistro(this.registro.id);
                case 'reprovado':
                    return new Observable(subscribe => {
                        this.app.prompt('Motivo da reprovação (será adicionado as observações internas)', 'Reprovar Registro')
                            .then(motivo => {
                                this.projeto.relations.REFP.reprovarRegistro(this.registro.id, motivo)
                                    .subscribe(r => subscribe.next(r), e => subscribe.error(e));
                            }, error => {
                                subscribe.error(error);
                            });
                    });

            }
        };

        request().subscribe(result => {
            if (result.sucesso) {

                this.registroAlterado.emit();

                this.app.alert("Alterado com sucesso!");
            } else {
                this.app.alert(result.inconsistencias);
            }

        });
    }

    removerRegistro() {
        this.projeto.relations.REFP.removerRegistro(this.registro.id).subscribe(result => {
            if (result.sucesso) {
                this.app.alert("Excluído com sucesso!");
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
        });
    }

}
