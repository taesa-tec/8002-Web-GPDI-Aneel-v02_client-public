import {FormGroup, FormControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn, Validators} from '@angular/forms';
import {ProjetoFacade, ProjetoREST} from '@app/facades/index';
import {AppService} from '@app/core/services/app.service';
import {OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EMPTY, of, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ResultadoResponse, FileUploaded} from '@app/models';
import {LoggerDirective} from '@app/logger/logger.directive';

export abstract class EditorResultado<T extends { id: number; uploads?: Array<FileUploaded> }> implements OnInit {

    editable: T;
    projeto: ProjetoFacade;
    projetoREST: ProjetoREST;
    form: FormGroup;
    sender: any;

    protected submiting = false;


    get isEdit() {
        return this.editable && this.editable.id;
    }

    get textSave() {
        return this.isEdit ? 'Salvar' : 'Adicionar';
    }

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(protected app: AppService, public activeModal: NgbActiveModal, protected restService: string) {
    }

    abstract get formFields(): Array<string>;

    abstract configForm(): void;

    async ngOnInit() {
        try {
            this.projeto = await this.app.projetos.getCurrent();
            this.projetoREST = this.projeto.REST[this.restService];
            this.loadingShow();
            this.load().subscribe(() => {
                this.editable ? this.buildForm(this.editable) : this.buildForm();
                this.loadingHide();
            }, e => this.loadingHide());
        } catch (e) {
            console.log('REST não encontrada no projeto');
        }
    }

    load(): Observable<void> {
        return Observable.create(o => o.next());
    }

    loadingShow() {
        if (this.loading) {
            this.loading.show();
        }
    }

    loadingHide() {
        if (this.loading) {
            this.loading.hide();
        }
    }

    setEditable(editable: T, sender?: any) {
        this.editable = editable;
        if (sender) {
            this.sender = sender;
        }
    }

    sanitizedValue(field: string, editable?: T) {
        return editable ? editable[field] : '';
    }

    buildForm(editable?: T) {
        this.form = new FormGroup({});
        if (editable) {
            this.form.addControl('id', new FormControl(editable.id));
        } else {
            this.form.addControl('projetoId', new FormControl(this.projeto.id));
        }

        this.formFields.forEach(field => {
            const value = this.sanitizedValue(field, editable);
            this.form.addControl(field, new FormControl(value));
        });

        this.configForm();
    }

    close() {
        this.activeModal.close(false);
    }

    async beforeSubmit() {
        return;
    }

    async submit() {
        if (this.form.invalid || this.submiting) {
            return;
        }
        this.submiting = true;

        this.loadingShow();


        const request = this.editable ?
            this.projetoREST.editar(this.form.value) :
            this.projetoREST.criar(this.form.value);

        try {
            await this.beforeSubmit();

            const result = await request.toPromise();

            await this.afterSubmit(result);

            if (result.sucesso) {
                if (this.editable) {
                    this.editable.id = result.id || this.editable.id;
                }
                this.app.alert('Salvo com sucesso');


                if (this.logger) {
                    if (result.id) {
                        this.logger.saveCreate();
                    } else {
                        this.logger.saveUpdate();
                    }
                }
            } else {
                this.app.alert(result.inconsistencias);
            }
        } catch (e) {
            console.error(e);
            this.app.alert(e.message);
        }
        this.submiting = false;
        this.loadingHide();
    }

    async afterSubmit(result?: ResultadoResponse) {
        return;
    }

    remove() {
        this.app.confirm('Tem certeza que deseja excluir?', 'Confirmar Exclusão')
            .then(result => {
                if (result) {
                    this.loadingShow();
                    this.projetoREST.remover(this.editable.id).subscribe(resultDelete => {
                        this.loadingHide();
                        if (resultDelete.sucesso) {
                            this.activeModal.close(true);
                        } else {
                            this.app.alert(resultDelete.inconsistencias.join(', '));
                        }
                    }, (error: HttpErrorResponse) => {
                        this.loadingHide();
                        this.app.alert(error.message);
                    });
                }

            });
    }

    deletarArquivo(file: FileUploaded) {

        this.app.confirm('Tem certeza que deseja remover este arquivo?').then(response => {
            if (response) {
                this.loadingShow();
                this.editable.uploads.splice(this.editable.uploads.indexOf(file), 1);
                this.app.file.remover(file).subscribe((result: ResultadoResponse) => {
                    this.loadingHide();
                    if (result.sucesso) {
                        this.app.alert('Excluido com sucesso');
                        this.logger.save(`Arquivo ${file.nomeArquivo} Excluído`, this.logger.getLog(), 'Delete');
                    } else {
                        this.app.alert(result.inconsistencias, 'Erro');
                    }
                }, error => {
                    this.loadingHide();
                });
            }
        });

    }


}
