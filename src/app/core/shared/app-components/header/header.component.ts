import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AppService } from '@app/services/app.service';
import { AuthService } from '@app/services/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(
    protected app: AppService,
    protected auth: AuthService
  ) {
  }

  get avatar() {
    return `url(${environment.api_url}/Users/${this.currentUser.id}/avatar)`;
  }

  get empresa() {
    if (this.currentUser) {
      return this.currentUser.catalogEmpresa ?
        this.currentUser.catalogEmpresa.nome :
        (this.currentUser.razaoSocial ? this.currentUser.razaoSocial : '');
    }
    return '';
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.app.users.currentUserUpdated.subscribe(user => {
      this.currentUser = user;
    });
  }

}
