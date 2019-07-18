import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {zip, of} from 'rxjs';
import {Projeto, LogProjeto, User, AcaoLog, TotalLog} from '@app/models';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {size} from 'lodash-es';


@Component({
    selector: 'app-log-projeto',
    templateUrl: './log-projeto.component.html',
    styleUrls: ['./log-projeto.component.scss']
})
export class LogProjetoComponent implements OnInit {
    static readonly pageOffsetSize = 5;
    size = 10;
    projeto: Projeto;
    totalLog: TotalLog;
    logsProjeto: Array<LogProjeto>;
    usuarios: Array<User>;
    status = AcaoLog;
    total = 0;
    paginas = [1];
    currentPagina = 1;
    args: { pag: number, size: number, acao?: string, user?: string };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, protected route: ActivatedRoute) {
    }

    get pageOffset() {
        return {
            min: Math.max(1, this.currentPagina - LogProjetoComponent.pageOffsetSize),
            max: this.total > 0 ? Math.min(Math.floor(this.total / this.size), this.currentPagina + LogProjetoComponent.pageOffsetSize) : 1
        };
    }

    async ngOnInit() {

        try {
            await this.loadData();
        } catch (e) {
            console.log(e);
            this.loading.hide();
            await this.app.alert('Não foi possível carregar os logs no momento.', 'Erro');

        }
    }

    mudarStatus(value: string) {

        if (value !== '') {
            this.args.acao = value;
        } else {
            delete this.args.acao;
        }

        delete this.args.pag;
        this.paginas = [1];
        this.currentPagina = 1;
        this.loadData();
    }

    mudarUsuario(value: string) {

        if (value !== '') {
            this.args.user = value;
        } else {
            delete this.args.user;
        }

        delete this.args.pag;
        this.paginas = [1];
        this.currentPagina = 1;
        this.loadData();
    }

    async loadData() {
        this.loading.show();

        this.args = {pag: this.currentPagina, size: this.size};

        this.projeto = await this.app.projetos.getCurrent();

        this.usuarios = await this.app.users.all().toPromise();

        const logsProjeto = await this.app.projetos.getLogPorjeto(this.projeto.id, this.args).toPromise();

        this.total = logsProjeto.total;

        const paginas = Math.ceil(this.total / this.size);
        this.paginas = Array(paginas).fill(0).map((x, i) => i + 1);
        //.filter(p => p >= this.pageOffset.min && p <= this.pageOffset.max);
        this.logsProjeto = logsProjeto.itens.map(log => {
            try {
                log.acaoValor = this.status.find(stat => stat.value === log.acaoValor).text;

            } catch (e) {
                log.acaoValor = 'Desconhecido';
            }
            return log;
        });

        this.loading.hide();

    }

    mudarPagina(pagina: number) {
        if (pagina !== this.currentPagina) {
            this.currentPagina = pagina;
            this.args.pag = pagina;
            this.loadData();

        }

    }

}
