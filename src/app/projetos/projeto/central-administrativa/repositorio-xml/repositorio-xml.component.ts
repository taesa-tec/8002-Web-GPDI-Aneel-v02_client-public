import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { Projeto, FileUploaded } from '@app/models';

@Component({
    selector: 'app-repositorio-xml',
    templateUrl: './repositorio-xml.component.html',
    styles: []
})
export class RepositorioXmlComponent implements OnInit {

    projetoLoaded: Subscription;
    projeto: Projeto;
    xmls: Array<FileUploaded> = [];
    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'created',
        direction: 'asc'
    };
    constructor(protected app: AppService) { }

    ngOnInit() {

        this.projetoLoaded = this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.loadXmlList();
        });
    }
    loadXmlList() {
        this.app.projetos.obterXmls(this.projeto.id).subscribe(result => {
            this.xmls = result;
        }, error => {
            console.log(error);
        });
    }

}
