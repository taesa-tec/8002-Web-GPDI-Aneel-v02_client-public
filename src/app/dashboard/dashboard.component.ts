import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {User} from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '@app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  currentUser: User;

  constructor(protected app: AppService, protected modal: NgbModal, public auth: AuthService) {
  }

  get avatar() {
    return this.currentUser.fotoPerfil;
  }

  get empresa() {
    if (this.currentUser) {
      return this.currentUser.empresa;
    }
    return '';
  }

  logout() {
    this.app.auth.logout();
  }

  ngOnInit() {
    this.currentUser = this.auth.user;
  }

}
