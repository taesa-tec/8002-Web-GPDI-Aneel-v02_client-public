import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { Projeto, LogProjeto, User } from '@app/models';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
  selector: 'app-log-projeto',
  templateUrl: './log-projeto.component.html',
  styleUrls: ['./log-projeto.component.scss']
})
export class LogProjetoComponent implements OnInit {

  projeto: Projeto;
  logsProjeto: Array<LogProjeto>;
  usuarios: Array<User>;
  status = ['Criação', 'Edição', 'Exclusão'];
  totalLog = 0;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(protected app: AppService, protected route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.loading.show();

    const data$ = this.route.parent.data.pipe(
      map(d => d.projeto),
      mergeMap(p =>
        zip(
          of(p),
          this.app.projetos.getLogProjeto(p.id),
          this.app.users.all()
        ))
    );

    data$.subscribe(([projeto, logsProjeto, usuarios]) => {
      this.projeto = projeto;
      this.totalLog = logsProjeto.length; // talvez mude
      this.usuarios = usuarios;
      this.logsProjeto = logsProjeto.map(log => {
        log.user = usuarios.find(user => user.id === log.userId);
        return log;
      });
      this.loading.hide();

    });

  }

}