import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Projeto, Funcoes, Graduacoes, EmpresaProjeto, Empresa, AppValidators, RecursoHumano, LogItem} from '@app/models';
import {AppService} from '@app/core/services/app.service';
import {zip} from 'rxjs';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjetoFacade} from '@app/facades/index';
import {RecursoHumanoFacade} from '@app/facades/recurso-humano.facade';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-recurso-humano-form',
    templateUrl: './recurso-humano-form.component.html',
    styles: []
})
export class RecursoHumanoFormComponent implements OnInit {

    projeto: ProjetoFacade;
    funcoes = Funcoes;
    titulacao = Graduacoes;
    empresas: Array<any>;
    empresasCatalog: Array<Empresa>;
    recursoHumano: RecursoHumanoFacade;
    nacionalidades = [{value: 'Brasileiro', text: 'Sim'}, {value: 'Estrangeiro', text: 'Não'}];
    nacionalidade: FormControl;
    form: FormGroup;
    hasManager = false;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) {
    }

    get modalTitle() {
        return typeof this.recursoHumano.id !== 'undefined' ? 'Editar Recurso Humano' : 'Registrar Recurso Humano';
    }

    get buttonAction() {
        return typeof this.recursoHumano.id !== 'undefined' ? {text: 'Editar Pessoa', icon: 'ta-save'} :
            {text: 'Salvar Pessoa', icon: 'ta-plus-circle'};
    }

    ngOnInit() {

        this.loadData();
    }

    loadData() {
        this.loading.show();
        const empresas$ = this.projeto.relations.empresas.get();
        const empresasCatalog$ = this.app.catalogo.empresas();
        const recursos$ = this.projeto.REST.RecursoHumanos.listar<Array<RecursoHumano>>();

        zip(empresas$, empresasCatalog$, recursos$).subscribe(([empresas, empresasCatalog, recursos]) => {
            this.hasManager = recursos.find(rec => rec.gerenteProjeto === true) !== undefined;
            this.empresasCatalog = empresasCatalog;
            this.empresas = empresas;
            this.setup();
            this.loading.hide();
        });
    }

    setup() {
        const cpf = new FormControl(this.recursoHumano.cpf || '', [Validators.required, AppValidators.cpf]);
        const passaporte = new FormControl(this.recursoHumano.passaporte || '', Validators.required);
        const empresaCtrl = new FormControl(this.recursoHumano.empresaId || '', Validators.required);
        this.nacionalidade = new FormControl('', Validators.required);


        this.form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            empresaId: empresaCtrl,
            valorHora: new FormControl(this.recursoHumano.valorHora || '', Validators.required),
            nomeCompleto: new FormControl(this.recursoHumano.nomeCompleto || '', Validators.required),
            titulacao: new FormControl(this.recursoHumano.titulacaoValor || '', Validators.required),
            nacionalidade: this.nacionalidade,
            urlCurriculo: new FormControl(this.recursoHumano.urlCurriculo || '', [Validators.pattern(/^https?:\/\/(.+)\.(.+)/)]),
        });

        if (this.projeto.isPG) {
            this.form.addControl('gerenteProjeto', new FormControl(this.recursoHumano.gerenteProjeto || (this.hasManager ? 'false' : ''), Validators.required));
            this.nacionalidade.setValue('Brasileiro');
        } else {
            this.form.addControl('funcao', new FormControl(this.recursoHumano.funcaoValor || '', Validators.required));

        }

        empresaCtrl.valueChanges.subscribe(value => {
            const _empresa = this.empresas.find(e => e.id === parseInt(value, 10));

            if (_empresa.classificacaoValor !== 'Executora') {
                this.nacionalidade.reset({value: 'Brasileiro', disabled: true});
            } else {
                this.nacionalidade.reset({value: 'Brasileiro', disabled: false});
            }

        });

        this.nacionalidade.valueChanges.subscribe(value => {
            if (value === 'Brasileiro') {
                this.form.addControl('cpf', cpf);
                this.form.removeControl('passaporte');
            } else {
                this.form.removeControl('cpf');
                this.form.addControl('passaporte', passaporte);
            }
        });

        this.nacionalidade.setValue(this.recursoHumano.nacionalidadeValor || 'Brasileiro');

        if (this.recursoHumano.id !== undefined) {
            this.form.addControl('id', new FormControl(this.recursoHumano.id));
        }


    }


    submit() {
        if (this.form.valid) {
            const request = this.recursoHumano.id ? this.app.projetos.editarRH(this.form.value) : this.app.projetos.criarRH(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                if (result.sucesso) {
                    this.activeModal.close(result);

                    if (this.form.get('id')) {
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
        this.app.confirm('Tem certeza que deseja excluir esta pessoa?', 'Confirmar Exclusão')
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delRH(this.recursoHumano.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
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
