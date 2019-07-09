import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Projeto, ResultadoResponse, XmlType} from '@app/models';
import {Subscription} from 'rxjs';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjetoFacade} from '@app/facades/index';

@Component({
    selector: 'app-geracao-xml',
    templateUrl: './geracao-xml.component.html',
    styleUrls: []
})
export class GeracaoXmlComponent implements OnInit {


    projeto: ProjetoFacade;
    form: FormGroup;


    // Projeto Pesquisa E Desenvolvimento
    XmlProjetoPed: FormControl = new FormControl('', [Validators.required]);
    XmlInteresseExecucao: FormControl = new FormControl('', [Validators.required]);
    XmlRelatorioFinal: FormControl = new FormControl('', [Validators.required]);
    XmlAuditoriaContabil: FormControl = new FormControl('', [Validators.required]);

    // Projeto Gestão
    XmlProjetoGestao: FormControl = new FormControl('', [Validators.required]);
    XmlRelatorioFinalGestao: FormControl = new FormControl('', [Validators.required]);
    XmlRelatorioAuditoriaGestao: FormControl = new FormControl('', [Validators.required]);

    // Ambos Tipos de projeto
    XmlInicioExecucao: FormControl = new FormControl('', [Validators.required]);


    avaliacaoResult: ResultadoResponse;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    get inconsistencias() {
        return []; // this.avaliacaoResult ? this.avaliacaoResult.inconsistencias : [];
    }

    constructor(protected app: AppService) {
    }

    async ngOnInit() {

        this.projeto = await this.app.projetos.getCurrent();

        this.form = new FormGroup({
            // Projeto Pesquisa E Desenvolvimento
            XmlProjetoPed: this.XmlProjetoPed,
            XmlInteresseExecucao: this.XmlInteresseExecucao,
            XmlRelatorioFinal: this.XmlRelatorioFinal,
            XmlAuditoriaContabil: this.XmlAuditoriaContabil,

            // Projeto Gestão
            XmlProjetoGestao: this.XmlProjetoGestao,
            XmlRelatorioFinalGestao: this.XmlRelatorioFinalGestao,
            XmlRelatorioAuditoriaGestao: this.XmlRelatorioAuditoriaGestao,

            // Ambos Tipos de projeto
            XmlInicioExecucao: this.XmlInicioExecucao,

        });


        if (this.projeto.catalogStatus.status === 'Iniciado') {
            this.app.router.navigate(['dashboard', 'projeto', this.projeto.id, 'central-administrativa', 'logs-duto']);
        }


        this.validar().subscribe(result => {

        });


    }

    validar() {
        return this.app.projetos.validarDados(this.projeto.id).pipe(tap(result => {
            this.avaliacaoResult = result;
        }));
    }

    async gerarXml(tipo: XmlType, versao: any) {
        this.loading.show();

        versao = parseFloat(versao);

        if (versao < 10) {
            versao = `0${versao}`;
        }

        try {
            await this.projeto.gerarXml(tipo, versao);
        } catch (error) {
            this.app.alert(error.message, 'Erro não criação');
        }

        this.loading.hide();

    }

    gerarXmlInicioExecucao() {
        this.gerarXml(XmlType.InicioExecucaoProjeto, this.XmlInicioExecucao.value);
    }

    // Pesquisa E Desenvolvimento
    gerarXmlProjetoPed() {
        this.gerarXml(XmlType.ProjetoPed, this.XmlProjetoPed.value);
    }

    gerarXmlInteresseExecucao() {
        this.gerarXml(XmlType.InteresseProjetoPed, this.XmlInteresseExecucao.value);
    }

    gerarXmlRelatorioFinal() {
        this.gerarXml(XmlType.RelatorioFinalPed, this.XmlRelatorioFinal.value);
    }

    gerarXmlAuditoriaContabil() {
        this.gerarXml(XmlType.RelatorioAuditoriaPed, this.XmlAuditoriaContabil.value);
    }

    // Gestão
    gerarXmlProjetoGestao() {
        this.gerarXml(XmlType.ProjetoGestao, this.XmlProjetoGestao.value);
    }

    gerarXmlRelatorioFinalGestao() {
        this.gerarXml(XmlType.RelatorioFinalGestao, this.XmlRelatorioFinalGestao.value);
    }

    gerarXmlRelatorioAuditoriaGestao() {
        this.gerarXml(XmlType.RelatorioAuditoriaGestao, this.XmlRelatorioAuditoriaGestao.value);
    }
}
