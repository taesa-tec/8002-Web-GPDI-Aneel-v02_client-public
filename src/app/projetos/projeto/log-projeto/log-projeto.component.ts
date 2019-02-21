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
  args: { page: number, size: number, acao?: string };

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(protected app: AppService, protected route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }

  mudarStatus(value: string) {
    if (value !== '') {
      this.args.acao = value;
      this.loadData(true);
    }
  }

  mudarUsuario(value: string) {
    if (value !== '') {
      // this.args.acao = value;
      // this.loadData(true);
    }
  }

  loadData(reload?: boolean | false) {

    this.loading.show();

    if (!reload) {
      this.args = { page: 1, size: 10 };

    }

    const data$ = this.route.parent.data.pipe(
      map(d => d.projeto),
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
      this.usuarios = usuarios;

      console.log(logsProjeto);

      this.logsProjeto = logsProjeto.itens.map(log => {
        log.acaoValor = this.status.find(stat => stat.value === log.acaoValor).text;
        return log;
      });

      this.loading.hide();

    });

  }

}