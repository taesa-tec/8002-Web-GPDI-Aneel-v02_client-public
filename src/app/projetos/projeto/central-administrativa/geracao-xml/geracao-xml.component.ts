import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Projeto, ResultadoResponse } from '@app/models';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-geracao-xml',
    templateUrl: './geracao-xml.component.html',
    styleUrls: []
})
export class GeracaoXmlComponent implements OnInit, OnDestroy {


    projeto: Projeto;
    form: FormGroup;

    XmlProjetoPed: FormControl = new FormControl('', [Validators.required]);
    XmlInteresseExecucao: FormControl = new FormControl('', [Validators.required]);
    XmlInicioExecucao: FormControl = new FormControl('', [Validators.required]);

    avaliacaoResult: ResultadoResponse;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    protected projetoLoaded: Subscription;

    get inconsistencias() {
        return this.avaliacaoResult ? this.avaliacaoResult.inconsistencias : [];
    }

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.form = new FormGroup({
            XmlProjetoPed: this.XmlProjetoPed,
            XmlInteresseExecucao: this.XmlInteresseExecucao,
            XmlInicioExecucao: this.XmlInicioExecucao
        });

        this.projetoLoaded = this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
        });

        this.validar().subscribe(result => {

        });


    }

    validar() {
        return this.app.projetos.validarDados(this.projeto.id).pipe(tap(result => {
            this.avaliacaoResult = result;
        }));
    }
    ngOnDestroy() {
        if (this.projetoLoaded) {
            this.projetoLoaded.unsubscribe();
        }
    }

    gerarXmlProjetoPed() {
        this.loading.show();

        this.app.projetos.gerarXmlProjetoPed(this.projeto.id, this.XmlProjetoPed.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.app.file.download(result.id, `projeto-ped-${this.projeto.id}.xml`);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }

        }, (error: HttpErrorResponse) => {
            this.app.alert(error.message);
            this.loading.hide();
        });
    }

    gerarXmlInteresseExecucao() {
        this.loading.show();
        this.app.projetos.gerarXmlInteresseExecucao(this.projeto.id, this.XmlInteresseExecucao.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.app.file.download(result.id, `projeto-${this.projeto.id}-interesse-execucao.xml`);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
            console.log(result);
        }, (error: HttpErrorResponse) => {
            this.app.alert(error.message);
            this.loading.hide();
        });
    }

    gerarXmlInicioExecucao() {
        this.loading.show();
        this.app.projetos.gerarXmlInicioExecucao(this.projeto.id, this.XmlInicioExecucao.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.app.file.download(result.id, `projeto-${this.projeto.id}-inicio-execucao.xml`);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
        }, (error: HttpErrorResponse) => {
            this.app.alert(error.message);
            this.loading.hide();
        });
    }

}
