import {Component, Inject, OnInit, Optional} from '@angular/core';
import {CURRENT_USER, HEADER_MENU, MenuItem, User} from '@app/commons';
import {AppService} from '@app/services/app.service';
import {AuthService} from '@app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: Array<MenuItem>;

  get avatar() {

    return this.auth.user.fotoPerfil ? `url(${this.auth.user.fotoPerfil})` : '';
  }

  get empresa() {
    if (this.currentUser) {
      return this.currentUser.empresa || this.currentUser.razaoSocial || '';
    }
    return '';
  }

  constructor(
    @Optional() @Inject(HEADER_MENU) menu,
    @Inject(CURRENT_USER) public currentUser: User,
    protected app: AppService,
    protected auth: AuthService
  ) {
    this.menu = menu;
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.currentUser = this.auth.user;
  }

}
