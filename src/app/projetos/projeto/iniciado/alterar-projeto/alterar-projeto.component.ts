import { Component, OnInit } from '@angular/core';
import { ProjetoFacade } from '@app/facades';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-alterar-projeto',
    templateUrl: './alterar-projeto.component.html',
    styles: []
})
export class AlterarProjetoComponent implements OnInit {

    projeto: ProjetoFacade;

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
        });

    }

}
