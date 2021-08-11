import {Component, OnInit} from '@angular/core';
import {MenuItem, TOPNAV_MENU, UserRole} from '@app/commons';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '@app/services';


@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  providers: [
    {
      provide: TOPNAV_MENU,
      deps: [ProjetoService, AuthService],
      useFactory: (service: ProjetoService, auth: AuthService) => {
        const behavior = new BehaviorSubject<Array<MenuItem>>([]);
        service.projeto.subscribe(p => {
          let menu: Array<MenuItem> = [

            {path: 'logs-duto', text: 'Logs DUTO'},
            {path: 'repositorio-xml', text: 'Repositório XMLs Gerados'},

          ];
          if (p.status === 'Finalizado') {
            menu = [{path: 'gerador-xml', text: 'Geração XMLS'}, ...menu];
          }
          if (auth.hasRoles(UserRole.Administrador)) {
            menu = [...menu, {path: 'status', text: 'Alteração de Status'}];
          }
          behavior.next(menu);
        });
        return behavior;


      }
    }
  ]
})
export class AdministrativoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
