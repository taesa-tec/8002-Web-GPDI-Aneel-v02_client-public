import {Component, OnInit} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {ProjetoFacade} from '@app/facades/index';

@Component({
    selector: 'app-consultar-dados',
    templateUrl: './consultar-dados.component.html',
    styles: []
})
export class ConsultarDadosComponent implements OnInit {

    projeto: ProjetoFacade;

    constructor(protected app: AppService) {
    }

    ngOnInit() {
        this.load();
    }

    async load() {
        this.projeto = await this.app.projetos.getCurrent();
    }

}
