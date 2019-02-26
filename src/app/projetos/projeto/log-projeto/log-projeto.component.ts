import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { Projeto, LogProjeto, User, AcaoLog, TotalLog } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-log-projeto',
    templateUrl: './log-projeto.component.html',
    styleUrls: ['./log-projeto.component.scss']
})
export class LogProjetoComponent implements OnInit {

    projeto: Projeto;
    totalLog: TotalLog;
    logsProjeto: Array<LogProjeto>;
    usuarios: Array<User>;
    status = AcaoLog;
    total = 0;
    paginas = [1];
    currentPagina = 1;
    size = 10;
    args: { pag: number, size: number, acao?: string, user?: string };

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, protected route: ActivatedRoute) { }

    ngOnInit() {
        this.loadData();
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
        this.reLoadData();
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
        this.reLoadData();
    }

    loadData() {

        this.loading.show();
        this.args = { pag: this.currentPagina, size: this.size };

        console.log(this.args);

        const data$ = this.app.projetos.projetoLoaded.pipe(
            mergeMap(p =>
                zip(
                    of(p),
                    this.app.projetos.getLogPorjeto(p.id, this.args),
                    this.app.users.all()
                ))
        );

        data$.subscribe(([projeto, logsProjeto, usuarios]) => {
            this.projeto = projeto;
            this.total = logsProjeto.total;

            const paginas = Math.ceil(this.total / this.size);
            this.paginas = Array(paginas).fill(0).map((x, i) => i + 1);

            this.usuarios = usuarios;

            console.log(this.paginas);

            this.logsProjeto = logsProjeto.itens.map(log => {
                log.acaoValor = this.status.find(stat => stat.value === log.acaoValor).text;
                return log;
            });

            this.loading.hide();

        });

    }

    reLoadData() {

        this.logsProjeto = [];

        this.loading.show();

        const data$ = this.app.projetos.projetoLoaded.pipe(
            mergeMap(p =>
                zip(
                    of(p),
                    this.app.projetos.getLogPorjeto(p.id, this.args),
                ))
        );

        data$.subscribe(([projeto, logsProjeto]) => {
            this.projeto = projeto;
            this.total = logsProjeto.total;

            const paginas = Math.ceil(this.total / this.size);
            this.paginas = Array(paginas).fill(0).map((x, i) => i + 1);

            console.log(logsProjeto);

            this.logsProjeto = logsProjeto.itens.map(log => {
                log.acaoValor = this.status.find(stat => stat.value === log.acaoValor).text;
                return log;
            });

            this.loading.hide();

        });

    }

    mudarPagina(pagina: number) {
        if (pagina !== this.currentPagina) {
            this.currentPagina = pagina;
            this.args.pag = pagina;
            this.reLoadData();

        }

    }

}