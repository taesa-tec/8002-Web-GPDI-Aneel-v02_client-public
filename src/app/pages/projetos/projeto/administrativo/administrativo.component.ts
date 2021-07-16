import {Component, OnInit} from '@angular/core';
import {MenuItem, TOPNAV_MENU} from '@app/commons';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  providers: [
    {
      provide: TOPNAV_MENU,
      deps: [ProjetoService],
      useFactory: (service: ProjetoService) => {
        const behavior = new BehaviorSubject<Array<MenuItem>>([]);
        service.projeto.subscribe(p => {
          let menu: Array<MenuItem> = [

            {path: 'logs-duto', text: 'Logs DUTO'},
            {path: 'repositorio-xml', text: 'Repositório XMLs Gerados'},
            {path: 'status', text: 'Alteração de Status'},
          ];
          if (p.status === 'Finalizado') {
            menu = [{path: 'gerador-xml', text: 'Geração XMLS'}, ...menu];
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
