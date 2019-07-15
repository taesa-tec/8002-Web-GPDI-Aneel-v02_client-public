import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {EditorResultado} from '../editor-resultado-base';
import {AppService} from '@app/core/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, of} from 'rxjs';
import {TiposCapacitacao, RecursoHumano, AppValidators, NoRequest, ResultadoResponse, ResultadoCapacitacao} from '@app/models';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-resultado-capacitacao',
    templateUrl: './resultado-capacitacao.component.html',
    styleUrls: []
})
export class ResultadoCapacitacaoComponent extends EditorResultado<ResultadoCapacitacao> {

    readonly formFields: string[] = ['recursoHumanoId', 'tipo', 'conclusao', 'dataConclusao', 'cnpjInstituicao', 'areaPesquisa', 'tituloTrabalho'];
    readonly tiposCapacitacao = TiposCapacitacao;

    recursosHumanos: Array<RecursoHumano>;

    @ViewChild('file') file: ElementRef;

    constructor(app: AppService, activeModal: NgbActiveModal) {
        super(app, activeModal, 'ResultadoCapacitacao');
    }

    load() {
        return new Observable<void>(observer => {
            this.projeto.REST.RecursoHumanos.listar<Array<RecursoHumano>>().subscribe(recursosHumanos => {
                this.recursosHumanos = recursosHumanos;
                observer.next();
            }, error => {
                console.error(error);
                observer.error(error);
            });
        });
    }

    sanitizedValue(field: string, editable?: ResultadoCapacitacao) {
        if (editable) {
            switch (field) {
                case 'tipo':
                    return editable.tipoValor;
                case 'dataConclusao':
                    return editable.dataConclusao.substr(0, 10);
            }
        }
        return super.sanitizedValue(field, editable);
    }

    configForm(): void {
        this.formFields.forEach(f => this.form.get(f).setValidators(Validators.required));
        this.form.get('cnpjInstituicao').setValidators([Validators.required, AppValidators.cnpj]);
        this.form.updateValueAndValidity();
    }

    async afterSubmit(result: ResultadoResponse) {
        if (result && result.sucesso && (result.id || this.editable.id)) {
            await this.uploadFile(result.id || this.editable.id).pipe(tap(() => this.activeModal.close(true))).toPromise();
        }
        await super.afterSubmit(result);
    }

    changeFile(event) {
    }

    uploadFile(id) {
        const el = this.file.nativeElement as HTMLInputElement;

        if (el.files.length > 0) {
            return this.app.file.upload(el.files.item(0), new FormGroup({
                ResultadoCapacitacaoId: new FormControl(id),
            })).pipe(tap(result => {
                if (result.sucesso) {
                    this.logger.save(`Arquivo ${el.files.item(0).name} adicionado`);
                    this.file.nativeElement.value = '';
                }
            }));
        }

        return of(NoRequest);
    }
}
