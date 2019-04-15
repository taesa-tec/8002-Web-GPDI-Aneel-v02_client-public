import {Injectable} from '@angular/core';
import {ProjetosService} from '@app/projetos/projetos.service';
import {UsersService} from '@app/users/users.service';
import {ProjetoFacade} from '@app/facades';
import {User} from '@app/models';
import {HttpRequest} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LogFactory} from '@app/classes/log-factory.class';
import {CreateLogProjetoRequest} from '@app/models';

const method2action = {
    'POST': 'Criar',
    'PUT': 'Editar',
    'DELETE': 'Deletar',
    'GET': 'Ler'
};

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    protected _tela: string;
    protected _request: HttpRequest<any>;
    projeto: ProjetoFacade;
    user: User;


    set request(value: HttpRequest<any>) {
        if (value.method !== 'GET') {
            console.log({request: value});
        }
        this._request = value;
    }

    protected get acao(): string {
        return (this._request && method2action[this._request.method]) ? method2action[this._request.method] : '';
    }

    protected get tela() {
        return this._tela;
    }

    protected set tela(value: string) {
        this._tela = value;
    }

    constructor(protected ps: ProjetosService, protected  us: UsersService, protected router: Router) {
        try {
            this.ps.projetoLoaded.subscribe(projeto => this.projeto = projeto);
            this.us.currentUserUpdated.subscribe(user => this.user = user);
            console.log('%cLoggerService OK', 'color:#0CF');
        } catch (e) {
            console.error(e);
        }
    }

    updateCurrentComponent(component) {
        this.tela = component.screenName || 'Não informado';
    }

    public log(log: LogFactory<any>) {
        const requestData: CreateLogProjetoRequest = {
            projetoId: this.projeto.id,
            userId: this.user.id,
            acao: this.acao,
            tela: this.tela,
            statusAnterior: log.statusAnterior,
            statusNovo: log.statusNovo
        };

        console.log(requestData);
    }
}
