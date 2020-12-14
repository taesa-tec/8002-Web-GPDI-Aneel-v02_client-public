import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {User} from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '@app/services/users.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;
  projetos: any;
  menu: Array<any>;
  protected currentUser: User;

  constructor(protected app: AppService, protected usersService: UsersService, protected modal: NgbModal) {
  }

  logout() {
    this.app.auth.logout();
  }

  ngOnInit() {
    this.currentUser = this.usersService.currentUser;
    this.usersService.currentUserUpdated.subscribe(user => {
      this.currentUser = user;
    });
    this.menu = [
      {text: 'Gestão de Demandas', icon: 'ta-projeto', path: '/dashboard/demandas'},
      {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: '/dashboard/captacao'},
      // {text: 'Projetos Em Proposta', icon: 'ta-projeto', path: '/dashboard/projetos/proposta'},
      // {text: 'Projetos Em Execução', icon: 'ta-box', path: '/dashboard/projetos/iniciado'},
      // {text: 'Projetos Em Finalização', icon: 'ta-ficha', path: '/dashboard/projetos/encerrado'},
      {text: 'Configurações do Sistema', icon: 'ta-gear', path: '/dashboard/configuracoes'},
    ];
  }
}
