import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingComponent } from '@app/shared/loading/loading.component';
import { UiService } from '@app/shared/ui.service';
import { AuthService } from '@app/auth/auth.service';
import { UsersService } from '@app/users/users.service';
import { ProjetosService } from '@app/projetos/projetos.service';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { User } from '@app/models';

class Teste {
  a: string;
  aa() {
    return this.a + "aaaa";
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(LoadingComponent)
  private loading: LoadingComponent;

  currentUser: User;

  constructor(
    protected users: UsersService,
    protected catalogs: CatalogsService,
    protected uiService: UiService,
    protected projetos: ProjetosService,
    protected auth: AuthService
  ) { }

  get avatar() {
    return (this.currentUser && this.currentUser.fotoPerfil) ? this.currentUser.fotoPerfil : '/assets/default_avatar.png';
  }
  get empresa() {
    if (this.currentUser) {
      return this.currentUser.catalogEmpresa ?
        this.currentUser.catalogEmpresa.nome :
        (this.currentUser.razaoSocial ? this.currentUser.razaoSocial : '')
    }
    return '';
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.users.me().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

}
