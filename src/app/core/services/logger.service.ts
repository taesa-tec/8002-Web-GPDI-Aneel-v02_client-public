import {Injectable} from '@angular/core';
import {ProjetosService} from '@app/core/services/projetos.service';
import {UsersService} from '@app/core/services/users.service';
import {ProjetoFacade} from '@app/facades';
import {LogItem, User} from '@app/models';
import {HttpRequest} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {CreateLogProjetoRequest} from '@app/models';

const method2action = {
    'POST': 'Create',
    'PUT': 'Update',
    'DELETE': 'Delete',
    'GET': 'Read'
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

    static dataToHtml(label: string, value: any, headerTag = 'strong', bodyTag = 'p'): string {
        return `<${headerTag}>${label}</${headerTag}>
                <${bodyTag}>${String(value)}</${bodyTag}>`;
    }

    static logItemToHtml(data: LogItem = []): string {
        if (data && data.length > 0) {
            return data.map(log => {
                return LoggerService.dataToHtml(log.text, log.value);
            }).join('\n');
        }
        return null;
    }

    constructor(protected ps: ProjetosService, protected  us: UsersService, protected router: Router) {
        try {
            this.ps.getCurrent().then(p => this.projeto = p);
            this.us.currentUserUpdated.subscribe(user => this.user = user);
        } catch (e) {
            console.error(e);
        }
    }

    updateCurrentComponent(component) {
        this.tela = component.screenName || 'Não informado';
    }


    public submitLog(statusNovo: LogItem | string, statusAnterior?: LogItem | string, acao?: 'Create' | 'Update' | 'Delete', tela?: string, projetoId?: any, userId?: string) {

        const requestData: CreateLogProjetoRequest = {
            projetoId: projetoId || (this.projeto ? this.projeto.id : 0),
            userId: userId || this.user.id,
            acao: acao || this.acao,
            tela: tela || this.tela,
            statusAnterior: typeof statusAnterior === 'string' ? statusAnterior : LoggerService.logItemToHtml(statusAnterior),
            statusNovo: typeof statusNovo === 'string' ? statusNovo : LoggerService.logItemToHtml(statusNovo)
        };

        return this.ps.criarLogProjeto(requestData).subscribe(result => {
            // console.log(result);
        });
    }

    public simpleLog(log: string, acao?: 'Create' | 'Update' | 'Delete', tela?: string, projetoId?: any, userId?: string) {
        return this.submitLog(log, '', acao, tela, projetoId, userId);
    }

}
