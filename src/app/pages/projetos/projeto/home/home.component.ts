import {Component, OnInit} from '@angular/core';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';

@Component({
  template: `
    <p></p>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  projeto: Projeto;

  constructor(protected service: ProjetoService, protected router: Router, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const status = this.service.getCurrentProjeto().status;
    switch (status) {
      case 'Execucao':
        this.router.navigate(['refp'], {relativeTo: this.route}).then();
        break;
      case 'Finalizado':
        this.router.navigate(['relatorio'], {relativeTo: this.route}).then();
        break;
      default:
        this.router.navigate(['../'], {relativeTo: this.route}).then();
    }
  }

}
