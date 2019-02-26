import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-prorrogar',
    templateUrl: './prorrogar.component.html',
    styles: []
})
export class ProrrogarComponent implements OnInit {

    constructor(protected app: AppService) { }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    projeto: ProjetoFacade;

    xmlProjetoProrrogacao: FormControl = new FormControl('', [Validators.required]);
    
    form = new FormGroup({
        xmlProjetoProrrogacao: this.xmlProjetoProrrogacao
    });

    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
        });

    }

    gerarXmlProrrogacao() {
        this.loading.show();
        this.app.projetos.gerarXmlProrrogacao(this.projeto.id, this.xmlProjetoProrrogacao.value).subscribe(result => {
            this.loading.hide();
            if (result.sucesso) {
                this.app.file.download(result.id, `projeto-${this.projeto.id}-prorrogacao.xml`);
            } else {
                this.app.alert(result.inconsistencias.join(', '));
            }
        }, (error: HttpErrorResponse) => {
            this.app.alert(error.message);
            this.loading.hide();
        });
    }

}
