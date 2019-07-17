import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RecursoMaterial, Projeto, AlocacaoRM, Empresa, EmpresaProjeto} from '@app/models';
import {AppService} from '@app/core/services/app.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {zip, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {EmpresaProjetoFacade, ProjetoFacade} from '@app/facades/index';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-alocar-recurso-material-form',
    templateUrl: './alocar-recurso-material-form.component.html',
    styles: []
})
export class AlocarRecursoMaterialFormComponent implements OnInit {

    recursosMaterias: Array<any>;
    empresasFinanciadoras: Array<EmpresaProjetoFacade>;
    empresasCatalog: Array<Empresa>;
    empresas: Array<EmpresaProjetoFacade>;
    etapas: Array<any>;
    alocacao: AlocacaoRM;
    projeto: ProjetoFacade;
    form: FormGroup;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) {
    }

    get modalTitle() {
        return typeof this.alocacao.id !== 'undefined' ? 'Editar Alocação Recurso Material' : 'Alocar Recurso Material';
    }

    get buttonAction() {
        return typeof this.alocacao.id !== 'undefined' ? {text: 'Salvar Alterações', icon: 'ta-save'} :
            {text: 'Alocar Recurso Material', icon: 'ta-plus-circle'};
    }

    get empresasRecebedoras(): Array<EmpresaProjetoFacade> {
        if (this.empresas === undefined) {
            return [];
        }
        return this.empresas.filter(empresa => {
            if (empresa.classificacaoValor.match(/(Energia|Proponente)/)) {
                const financiadora = this.form.get('empresaFinanciadoraId');
                return empresa.id === parseInt(financiadora.value, 10);
            } else {
                return empresa.classificacaoValor === 'Executora';
            }
        });
    }

    ngOnInit() {
        this.loadData();
    }


    loadData() {

        this.loading.show();

        const recm$ = this.app.projetos.getRecursoMaterial(this.projeto.id);
        const empresa$ = this.projeto.REST.Empresas.listar<Array<EmpresaProjeto>>();
        const etapa$ = this.projeto.isPD ? this.projeto.relations.etapas.get() : of([]);
        const empresasCatalog$ = this.app.catalogo.empresas();

        zip(recm$, empresa$, etapa$, empresasCatalog$).subscribe(([recursosMaterias, empresas, etapas, empresasCatalog]) => {

            this.empresas = empresas.map(e => new EmpresaProjetoFacade(e));

            this.recursosMaterias = recursosMaterias || [];
            if (etapas) {
                this.etapas = etapas.map((etapa, i) => {
                    etapa.numeroEtapa = i + 1;
                    return etapa;
                });
            }

            this.empresasCatalog = empresasCatalog;

            this.empresasFinanciadoras = this.empresas.filter(item => item.classificacaoValor !== 'Executora');

            this.setup();

            this.loading.hide();
        });
    }

    setup() {

        const empresaFinanciadoraControl = new FormControl(this.alocacao.empresaFinanciadoraId || '', [Validators.required]);
        const empresaRecebedoraControl = new FormControl(this.alocacao.empresaRecebedoraId || '', [Validators.required]);

        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            recursoMaterialId: new FormControl(this.alocacao.recursoMaterialId || '', [Validators.required]),
            empresaFinanciadoraId: empresaFinanciadoraControl,
            qtd: new FormControl(this.alocacao.qtd || '', [Validators.required]),
            justificativa: new FormControl(this.alocacao.justificativa || '', [Validators.required]),
        });


        if (this.alocacao.id !== undefined) {
            this.form.addControl('id', new FormControl(this.alocacao.id));
        }
        if (this.projeto.isPD) {

            this.form.addControl('etapaId', new FormControl(this.alocacao.etapaId || '', [Validators.required]));
            this.form.addControl('empresaRecebedoraId', empresaRecebedoraControl);
        }

        empresaFinanciadoraControl.valueChanges.subscribe(v => {
            empresaRecebedoraControl.setValue('');
            this.form.updateValueAndValidity();
        });


    }


    submit() {
        if (this.form.valid) {

            const request = this.alocacao.id ? this.app.projetos.editarAlocacaoRM(this.form.value) : this.app.projetos.criarAlocacaoRM(this.form.value);
            this.loading.show();
            request.subscribe(result => {

                if (result.sucesso) {
                    // this.logProjeto("Alocação de recursos Materias");
                    this.activeModal.close(result);
                    if (this.alocacao.id) {
                        this.logger.saveUpdate();
                    } else {
                        this.logger.saveCreate();
                    }
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
                this.loading.hide();
            });
        }
    }


    excluir() {
        this.app.confirm('Tem certeza que deseja excluir esta alocação do recurso material?', 'Confirmar Exclusão')
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delAlocacaoRM(this.alocacao.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
                            // this.logProjeto("Alocação de recursos Materias", "Delete");
                            this.activeModal.close('deleted');
                            this.logger.saveDelete();
                        } else {
                            this.app.alert(resultDelete.inconsistencias.join(', '));
                        }
                    }, (error: HttpErrorResponse) => {
                        this.loading.hide();
                        this.app.alert(error.message);
                    });
                }

            });
    }
}
