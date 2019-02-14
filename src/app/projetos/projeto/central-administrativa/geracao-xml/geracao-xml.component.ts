import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Projeto } from '@app/models';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';

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

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    protected projetoLoaded: Subscription;


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
                this.app.file.download(result.id, 'projeto-ped.xml');
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
            console.log(result);
        });
    }

    gerarXmlInteresseExecucao() {
        this.loading.show();
        this.app.projetos.gerarXmlInteresseExecucao(this.projeto.id, this.XmlProjetoPed.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.app.file.download(result.id);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
            console.log(result);
        });
    }

    gerarXmlInicioExecucao() {
        this.loading.show();
        this.app.projetos.gerarXmlInicioExecucao(this.projeto.id, this.XmlProjetoPed.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.app.file.download(result.id);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
            console.log(result);
        });
    }

}
