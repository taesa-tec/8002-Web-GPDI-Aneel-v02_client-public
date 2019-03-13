import { FormGroup, FormControl, AbstractControlOptions, AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { ProjetoFacade, ProjetoREST } from '@app/facades';
import { AppService } from '@app/app.service';
import { OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ResultadoResponse } from '@app/models';

export abstract class EditorResultado<T extends { id: number }> implements OnInit {

    editable: T;
    projeto: ProjetoFacade;
    projetoREST: ProjetoREST;
    form: FormGroup;


    get isEdit() {
        return this.editable && this.editable.id;
    }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, public activeModal: NgbActiveModal, protected restService: string) { }

    abstract get formFields(): Array<string>;
    abstract configForm(): void;

    ngOnInit(): void {


        this.app.projetos.projetoLoaded.subscribe(projeto => {
            try {
                this.projeto = projeto;
                this.projetoREST = this.projeto.REST[this.restService];
                this.loadingShow();
                this.load().subscribe(() => {
                    this.editable ? this.buildForm(this.editable) : this.buildForm();
                    this.loadingHide();
                }, e => this.loadingHide());
            } catch (e) {
                console.log("REST não encontrada no projeto");
            }
        });
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

    setEditable(editable: T) {
        this.editable = editable;
    }

    sanitizedValue(field: string, editable?: T) {
        return editable ? editable[field] : '';
    }

    buildForm(editable?: T) {
        console.log({ editable });
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

    beforeSubmit() { return Observable.create(o => o.next()); }

    submit() {
        if (this.form.invalid) {
            return;
        }
        this.beforeSubmit().subscribe(() => {
            this.loadingShow();

            const request = this.editable ?
                this.projetoREST.editar(this.form.value) :
                this.projetoREST.criar(this.form.value);

            request.subscribe(result => {
                this.afterSubmit(result).subscribe(() => {
                    if (result.sucesso) {
                        if (this.editable) {
                            this.editable.id = result.id || this.editable.id;
                        }
                        this.app.alert("Salvo com sucesso");
                    } else {
                        this.app.alert(result.inconsistencias);
                    }
                    this.loadingHide();
                });
            }, error => {
                this.loadingHide();
                this.app.alert(error);
            });

        });
    }
    afterSubmit(result?: ResultadoResponse) { return Observable.create(o => o.next()); }

    remove() {
        this.app.confirm("Tem certeza que deseja excluir?", "Confirmar Exclusão")
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


}
