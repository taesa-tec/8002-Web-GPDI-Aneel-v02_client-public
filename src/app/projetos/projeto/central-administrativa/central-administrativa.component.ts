import { Component, OnInit, Input } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Projeto } from '@app/models';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/projetos/projeto.facade';

@Component({
    selector: 'app-central-administrativa',
    templateUrl: './central-administrativa.component.html',
    styles: []
})
export class CentralAdministrativaComponent implements OnInit {

    routes: Routes;
    projeto: ProjetoFacade;

    menus: { [propName: string]: Array<{ text: string, path: string }> } = {
        proposta: [
            { text: "Geração XMLS", path: 'geracao-xml' },
            { text: "Logs DUTO", path: 'logs-duto' },
            { text: "Repositório XMLs Gerados", path: 'repositorio-xml' },
            { text: "Alteração Status Projeto", path: 'alteracao-status-projeto' },
            { text: "Usuários", path: 'usuarios' },
        ],
        iniciado: [
            { text: "Logs DUTO", path: 'logs-duto' },
            { text: "Repositório XMLs Gerados", path: 'repositorio-xml' },
            { text: "Alteração Status Projeto", path: 'alteracao-status-projeto' },
            { text: "Usuários", path: 'usuarios' },
        ],
        finalizado: [
            { text: "Logs DUTO", path: 'logs-duto' },
            { text: "Repositório XMLs Gerados", path: 'repositorio-xml' },
            { text: "Alteração Status Projeto", path: 'alteracao-status-projeto' },
            { text: "Usuários", path: 'usuarios' },
        ]
    };

    menu: Array<{ text: string, path: string }>;

    constructor(private route: ActivatedRoute, protected app: AppService) { }

    ngOnInit() {
        const projeto$ = this.app.projetos.projetoLoaded;
        zip(projeto$).subscribe(([projeto]) => {
            this.projeto = projeto;
            this.projeto.onUpdate
                .pipe(filter(event => event.prop === 'catalogStatus'))
                .subscribe((event) => {
                    this.setMenu(event.value.status);
                });
            this.setMenu(this.projeto.catalogStatus.status);
        });
    }
    setMenu(status) {
        switch (status.toLocaleLowerCase()) {
            case 'proposta':
                this.menu = this.menus.proposta;
                break;
            case 'iniciado':
                this.menu = this.menus.iniciado;
                break;
            case 'encerrado':
                this.menu = this.menus.finalizado;
        }
    }

}
