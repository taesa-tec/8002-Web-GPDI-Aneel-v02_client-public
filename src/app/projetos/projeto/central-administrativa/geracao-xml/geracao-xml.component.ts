import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Projeto, ResultadoResponse, XmlType } from '@app/models';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetoFacade } from '@app/facades';

@Component({
    selector: 'app-geracao-xml',
    templateUrl: './geracao-xml.component.html',
    styleUrls: []
})
export class GeracaoXmlComponent implements OnInit, OnDestroy {


    projeto: ProjetoFacade;
    form: FormGroup;

    XmlProjetoPed: FormControl = new FormControl('', [Validators.required]);
    XmlInteresseExecucao: FormControl = new FormControl('', [Validators.required]);
    XmlInicioExecucao: FormControl = new FormControl('', [Validators.required]);
    XmlRelatorioFinal: FormControl = new FormControl('', [Validators.required]);
    XmlAuditoriaContabil: FormControl = new FormControl('', [Validators.required]);

    avaliacaoResult: ResultadoResponse;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    protected projetoLoaded: Subscription;

    get inconsistencias() {
        return this.avaliacaoResult ? this.avaliacaoResult.inconsistencias : [];
    }

    constructor(protected app: AppService) { }

    ngOnInit() {
        console.log(XmlType.InicioExecucaoProjeto);

        this.form = new FormGroup({
            XmlProjetoPed: this.XmlProjetoPed,
            XmlInteresseExecucao: this.XmlInteresseExecucao,
            XmlInicioExecucao: this.XmlInicioExecucao,
            XmlRelatorioFinal: this.XmlRelatorioFinal,
            XmlAuditoriaContabil: this.XmlAuditoriaContabil

        });

        this.projetoLoaded = this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            if (this.projeto.catalogStatus.status === 'Iniciado') {
                this.app.router.navigate(['dashboard', 'projeto', projeto.id, 'central-administrativa', 'logs-duto']);
            }
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

    gerarXml(tipo: XmlType, versao: any) {
        this.loading.show();

        this.projeto.gerarXml(tipo, versao).subscribe(result => {
            this.loading.hide();
        }, (error) => {
            this.app.alert(error.message);
            this.loading.hide();
        });
    }
    gerarXmlProjetoPed() {
        this.gerarXml(XmlType.ProjetoPed, this.XmlProjetoPed.value);
    }
    gerarXmlInteresseExecucao() {
        this.gerarXml(XmlType.InteresseProjetoPed, this.XmlInteresseExecucao.value);
    }
    gerarXmlInicioExecucao() {
        this.gerarXml(XmlType.InicioExecucaoProjeto, this.XmlInicioExecucao.value);
    }
    gerarXmlRelatorioFinal() {
        this.gerarXml(XmlType.RelatorioFinalPed, this.XmlInicioExecucao.value);
    }
    gerarXmlAuditoriaContabil() {
        this.gerarXml(XmlType.RelatorioAuditoriaPed, this.XmlAuditoriaContabil.value);
    }
}