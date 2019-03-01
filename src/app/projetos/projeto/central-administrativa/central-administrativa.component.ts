import { Component, OnInit, Input } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { filter } from 'lodash-es';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Projeto } from '@app/models';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-central-administrativa',
    templateUrl: './central-administrativa.component.html',
    styles: []
})
export class CentralAdministrativaComponent implements OnInit {

    routes: Routes;
    projeto: Projeto;

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

    constructor(private route: ActivatedRoute, protected app: AppService) {


        const projeto$ = this.app.projetos.projetoLoaded;

        const rotas$ = this.route.data.pipe(map(d => d.routes.filter(r => r.path !== "**" && r.path.length > 0)));

        zip(projeto$, rotas$).subscribe(([projeto, rotas]) => {
            this.routes = rotas;
            this.projeto = projeto;
        });
    }

    ngOnInit() {
        this.setMenu();
    }
    setMenu() {
        switch (this.projeto.catalogStatus.status.toLocaleLowerCase()) {
            case 'proposta':
                this.menu = this.menus.proposta;
                break;
            case 'iniciado':
                this.menu = this.menus.iniciado;
                break;
        }
    }

}
