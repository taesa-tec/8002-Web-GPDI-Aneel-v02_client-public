import {Component, OnInit} from '@angular/core';
import {MenuItem, TOPNAV_MENU, UserRole} from '@app/commons';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-projetos-captacao',
  templateUrl: './captacao.component.html',
  styleUrls: ['./captacao.component.scss'],
  providers: [
    {
      provide: TOPNAV_MENU,
      deps: [HttpClient],
      useFactory: (http: HttpClient) => {
        const behavior = new BehaviorSubject<Array<MenuItem>>([]);

        http.get('Captacoes/Counts').subscribe((data: any) => {
          const {Cancelada, Elaboracao, Encerrada, Fornecedor, Pendente} = data;
          const t = n => `<span class="mx-1">(${n})</span>`;
          behavior.next([
            {text: `Captação Pendente`, afterText: t(Pendente), path: 'pendente', role: [UserRole.Administrador, UserRole.User]},
            {
              text: `Captação em Elaboração`,
              afterText: t(Elaboracao),
              path: 'elaboracao',
              role: [UserRole.Administrador, UserRole.User, UserRole.Suprimento]
            },
            {text: `Captação Aberta`, afterText: t(Fornecedor), path: 'aberta', role: [UserRole.Administrador, UserRole.User]},
            {text: `Captação Encerrada`, afterText: t(Encerrada), path: 'encerrada', role: [UserRole.Administrador, UserRole.User]},
            {text: `Captação Cancelada`, afterText: t(Cancelada), path: 'cancelada', role: [UserRole.Administrador, UserRole.User]},
          ]);
        });

        return behavior;
      }

    }
  ]
})
export class CaptacaoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
