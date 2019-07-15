import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EditorResultado} from '../editor-resultado-base';
import {ResultadoProducao, TiposProducaoTC, AppValidators, NoRequest, ResultadoResponse} from '@app/models';
import {Observable, of} from 'rxjs';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-resultado-cientifico',
    templateUrl: './resultado-cientifico.component.html',
    styleUrls: []
})
export class ResultadoCientificoComponent extends EditorResultado<any> {


    readonly formFields: string[] = ['tipo', 'dataPublicacao', 'confirmacao', 'nome', 'url', 'catalogPaisId', 'cidade', 'titulo'];

    readonly tiposProducao = TiposProducaoTC;

    paises: Array<{ id: number; nome: string; }>;

    @ViewChild('file') file: ElementRef;

    constructor(app: AppService, activeModal: NgbActiveModal) {
        super(app, activeModal, 'ResultadoProducao');
    }

    load() {
        return new Observable<void>(observer => {
            this.app.catalogo.paises()
                .subscribe(paises => {
                    this.paises = paises;
                    observer.next();
                }, error => {
                    console.error(error);
                    observer.error(error);
                });
        });
    }

    sanitizedValue(field: string, editable?: ResultadoProducao) {
        if (editable) {
            switch (field) {
                case 'tipo':
                    return editable.tipoValor;
                case 'dataPublicacao':
                    return editable.dataPublicacao.substr(0, 10);
            }
        }
        return super.sanitizedValue(field, editable);
    }

    configForm(): void {
        this.formFields.forEach(f => this.form.get(f).setValidators(Validators.required));
        if (this.editable === undefined) {
            const brasil = this.paises.find(p => p.nome === 'Brasil');
            if (brasil) {
                this.form.get('catalogPaisId').setValue(brasil.id);
            }
        }
        this.form.updateValueAndValidity();
    }

    changeFile() {
    }

    uploadFile(id) {
        const el = this.file.nativeElement as HTMLInputElement;

        if (el.files.length > 0) {
            return this.app.file.upload(el.files.item(0), new FormGroup({
                ResultadoProducaoId: new FormControl(id),
            })).pipe(tap(result => {
                if (result.sucesso) {
                    this.logger.save(`Arquivo ${el.files.item(0).name} adicionado`);
                    this.file.nativeElement.value = '';
                }
            }));
        }

        return of(NoRequest);
    }

    async afterSubmit(result: ResultadoResponse) {
        if (result && result.sucesso && (result.id || this.editable.id)) {
            await this.uploadFile(result.id || this.editable.id).pipe(tap(() => this.activeModal.close(true))).toPromise();
        }
        await super.afterSubmit(result);


    }
}

