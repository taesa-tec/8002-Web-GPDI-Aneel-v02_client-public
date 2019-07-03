import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ProjetoStatus, Empresa, ResultadoResponse} from '@app/models';
import {Observable} from 'rxjs';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {AppService} from '@app/core/services/app.service';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-novo-projeto',
    templateUrl: './novo-projeto.component.html',
    styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit {


    maxTituloContent = 500;

    resultado: ResultadoResponse;

    empresas: Observable<Array<Empresa>> = this.app.catalogo.empresas();


    form: FormGroup;

    readonly numeroPatterns = {
        'S': {pattern: /[A-Za-z]/, optional: true},
        '0': {pattern: /\d/, optional: false}
    };

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(public activeModal: NgbActiveModal, protected app: AppService) {
    }

    get tituloDescRestante() {
        return this.maxTituloContent - this.tituloDesc.value.length;
    }

    get numero() {
        return this.form.get('numero');
    }

    get titulo() {
        return this.form.get('titulo');
    }

    get tituloDesc() {
        return this.form.get('tituloDesc');
    }

    get empresaProponente() {
        return this.form.get('empresaProponente');
    }

    ngOnInit() {
        this.app.catalogo.status().subscribe(status => {

            const catalogoStatus = status.find(s => s.status === 'Proposta');
            this.form = new FormGroup({
                Numero: new FormControl('', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(5),
                ]),
                Titulo: new FormControl('', [
                    Validators.maxLength(60),
                    Validators.required
                ]),
                TituloDesc: new FormControl('', [
                    Validators.maxLength(this.maxTituloContent),
                    Validators.required
                ]),
                CatalogEmpresaId: new FormControl('', [Validators.required]),
                CatalogStatusId: new FormControl(catalogoStatus.id, [Validators.required])
            });
            console.log(this);
        });
    }

    onSubmit() {
        this.loading.show();
        this.app.projetos.criarProjeto(this.form.value).subscribe(resultado => {
            this.loading.hide();
            this.resultado = resultado;
            if (resultado.sucesso) {
                this.activeModal.close(resultado);
                if (resultado.id) {
                    this.logger.saveCreate(resultado.id);
                    this.app.router.navigate(['dashboard', 'projeto', resultado.id, 'proposta']);
                } else {
                    this.app.router.navigate(['dashboard']);
                }
            }
        }, error => {
            if (error && error.message) {
                this.app.alert(error.message);
            }
            this.loading.hide();
        });
    }

    save() {

    }

}
