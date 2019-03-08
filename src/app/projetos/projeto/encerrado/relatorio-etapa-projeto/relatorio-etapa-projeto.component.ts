import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/facades';

@Component({
    selector: 'app-relatorio-etapa-projeto',
    templateUrl: './relatorio-etapa-projeto.component.html',
    styleUrls: []
})
export class RelatorioEtapaProjetoComponent implements OnInit {

    projeto: ProjetoFacade;

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            // this.projeto.relations.
        });
    }

}
