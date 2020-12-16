import {Component, Inject, OnInit} from '@angular/core';
import {User} from '@app/commons';
import {AppService} from '@app/services/app.service';
import {AuthService} from '@app/services/auth.service';
import {environment} from '@env/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  get avatar() {
    return `url(${environment.api_url}/Users/${this.currentUser.id}/avatar)`;
  }

  get empresa() {
    if (this.currentUser) {
      return this.currentUser.empresa || this.currentUser.razaoSocial || '';
    }
    return '';
  }

  constructor(
    protected app: AppService,
    protected auth: AuthService
  ) {
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.currentUser = this.auth.user;
  }

}
