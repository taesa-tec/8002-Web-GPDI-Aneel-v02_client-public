import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {NgbActiveModal, NgbTabChangeEvent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {EmpresaProjeto, Projeto, Empresa, UF, AppValidators} from '@app/models';
import {AppService} from '@app/core/services/app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjetoFacade} from '@app/facades/index';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-empresa-form',
    templateUrl: './empresa-form.component.html',
    styles: []
})
export class EmpresaFormComponent implements OnInit, AfterViewInit {


    @Input() empresa: EmpresaProjeto;

    projeto: ProjetoFacade;
    projetos_empresas: Array<EmpresaProjeto> = [];
    empresas: Array<Empresa>;
    estados: Array<UF>;

    formCooperada: FormGroup;
    formExecutora: FormGroup;
    formParceira: FormGroup;

    protected tabFixed = false;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(NgbTabset) tabs: NgbTabset;
    @ViewChild('loggerCooperada') loggerCooperada: LoggerDirective;
    @ViewChild('loggerExecutora') loggerExecutora: LoggerDirective;
    @ViewChild('loggerParceira') loggerParceira: LoggerDirective;

    constructor(public activeModal: NgbActiveModal, protected app: AppService) {
    }

    ngOnInit() {
        if (this.empresa.classificacaoValor) {

            this.tabFixed = true;
            switch (this.empresa.classificacaoValor) {
                case 'Energia':
                    this.tabs.activeId = 'cooperada';
                    break;
                case 'Executora':
                    this.tabs.activeId = 'executora';
                    break;
                case 'Parceira':
                    this.tabs.activeId = 'parceira';
                    break;
                default:
                    this.tabFixed = false;
            }
        }


        this.setupForm(this.empresa);

        this.empresas = this.empresas.filter(empresa => this.projetos_empresas.find(pe => {
            return pe.catalogEmpresaId === empresa.id;
        }) === undefined || (this.empresa && this.empresa.catalogEmpresaId === empresa.id));
    }

    ngAfterViewInit() {

    }

    setupForm(empresa: EmpresaProjeto | any = {}) {

        const projetoId = new FormControl(this.projeto.id);
        const cnpj = new FormControl(empresa.cnpj || '', AppValidators.cnpj);
        const razaoSocial = new FormControl(empresa.razaoSocial || '');
        const catalogEstadoId = new FormControl(empresa.catalogEstadoId || '');
        const catalogEmpresaId = new FormControl(empresa.catalogEmpresaId || '');

        this.formCooperada = new FormGroup({
            projetoId, classificacao: new FormControl('Energia'), catalogEmpresaId
        });

        this.formExecutora = new FormGroup({
            projetoId, classificacao: new FormControl('Executora'), cnpj, catalogEstadoId, razaoSocial
        });

        this.formParceira = new FormGroup({
            projetoId, classificacao: new FormControl('Parceira'), cnpj, razaoSocial
        });
        if (this.empresa.id) {
            [this.formCooperada, this.formExecutora, this.formParceira]
                .forEach(f => f.setControl('id', new FormControl(this.empresa.id)));
        }
    }

    setTab(tab) {

    }

    beforeChangeTab(event: NgbTabChangeEvent) {
        if (this.tabFixed) {
            event.preventDefault();
        }
        console.log(this);
    }

    submit(formName) {
        let form: FormGroup;
        let logger: LoggerDirective;
        switch (formName) {
            case 'Energia':
                form = this.formCooperada;
                logger = this.loggerCooperada;
                break;
            case 'Executora':
                form = this.formExecutora;
                logger = this.loggerExecutora;
                break;
            case 'Parceira':
                form = this.formParceira;
                logger = this.loggerParceira;
                break;
        }

        form.updateValueAndValidity();

        if (form.valid) {
            this.loading.show();
            const request = this.empresa.id ? this.app.projetos.editarEmpresa(form.value) :
                this.app.projetos.criarEmpresa(form.value);

            request.subscribe(result => {
                this.loading.hide();
                if (result.sucesso) {
                    this.activeModal.close(result);
                    if (this.empresa.id) {
                        logger.saveUpdate();
                    } else {
                        logger.saveCreate();
                    }
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
            });
        }
    }

    excluirEmpresa() {
        this.app.confirm('Tem certeza que deseja excluir esta empresa?', 'Confirmar Exclusão')
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delEmpresa(this.empresa.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {

                            this.activeModal.close('deleted');
                            switch (this.empresa.classificacaoValor) {
                                case 'Energia':
                                    this.loggerCooperada.saveDelete();
                                    break;
                                case 'Executora':
                                    this.loggerExecutora.saveDelete();
                                    break;
                                case 'Parceira':
                                    this.loggerParceira.saveDelete();
                                    break;
                                default:
                                    this.tabFixed = false;
                            }
                        } else {
                            this.app.alert(resultDelete.inconsistencias.join(', '));
                        }
                    }, (error: HttpErrorResponse) => {
                        this.app.alert(error.message);
                    });
                }

            });
    }

}
