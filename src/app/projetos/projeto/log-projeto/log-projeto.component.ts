import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { Projeto, LogProjeto } from '@app/models';

@Component({
  selector: 'app-log-projeto',
  templateUrl: './log-projeto.component.html',
  styleUrls: ['./log-projeto.component.scss']
})
export class LogProjetoComponent implements OnInit {

  projeto: Projeto;
  logsProjeto: Array<LogProjeto>;

  constructor(protected app: AppService, protected route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    const data$ = this.route.parent.data.pipe(
      map(d => d.projeto),
      mergeMap(p =>
        zip(
          of(p),
          this.app.projetos.getLogPorjeto(p.id)
        ))
    );

    data$.subscribe(([projeto, logsProjeto]) => {
      this.projeto = projeto;
      this.logsProjeto = logsProjeto;

    });

  }

}