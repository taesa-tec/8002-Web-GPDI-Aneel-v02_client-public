import {Component, OnInit, Input} from '@angular/core';
import {Routes, ActivatedRoute} from '@angular/router';
import {map, filter} from 'rxjs/operators';
import {zip} from 'rxjs';
import {Projeto, AppMenu, NiveisUsuarios} from '@app/models';
import {AppService} from '@app/core/services/app.service';
import {ProjetoFacade} from '@app/facades/index';

@Component({
    selector: 'app-central-administrativa',
    templateUrl: './central-administrativa.component.html',
    styles: []
})
export class CentralAdministrativaComponent implements OnInit {

    routes: Routes;
    projeto: ProjetoFacade;

    commonMenu: AppMenu = [
        {text: 'Alteração Status Projeto', path: 'alteracao-status-projeto', nivel: NiveisUsuarios.admin},
        {text: 'Usuários', path: 'usuarios', nivel: NiveisUsuarios.admin}
    ];
    menus: { [propName: string]: AppMenu } = {
        proposta: [
            {text: 'Geração XMLS', path: 'geracao-xml'},
            {text: 'Logs DUTO', path: 'logs-duto'},
            {text: 'Repositório XMLs Gerados', path: 'repositorio-xml'},
        ],
        iniciado: [
            {text: 'Logs DUTO', path: 'logs-duto'},
            {text: 'Repositório XMLs Gerados', path: 'repositorio-xml'},
        ],
        finalizado: [
            {text: 'Geração XMLS', path: 'geracao-xml'},
            {text: 'Logs DUTO', path: 'logs-duto'},
            {text: 'Repositório XMLs Gerados', path: 'repositorio-xml'},

        ]
    };

    menu: AppMenu;

    constructor(private route: ActivatedRoute, protected app: AppService) {
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();
        this.projeto.onUpdate
            .pipe(filter(event => event.prop === 'catalogStatus'))
            .subscribe((event) => {
                this.setMenu(event.value.status);
            });
        this.setMenu(this.projeto.catalogStatus.status);
    }

    setMenu(status) {
        this.menu = this.getMenu(status).concat(this.commonMenu).map(item => {
            item.nivel = item.nivel || true;
            return item;
        });
        // commonMenu
    }

    getMenu(status) {
        switch (status.toLocaleLowerCase()) {
            case 'proposta':
                return this.menus.proposta;
            case 'iniciado':
                return this.menus.iniciado;
            case 'encerrado':
                return this.menus.finalizado;
            default:
                return [];
        }
    }

}
