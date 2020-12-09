import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {User} from '@app/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {currentUserProvider} from '@app/providers/user.provider';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(LoadingComponent, { static: true })
  private loading: LoadingComponent;

  currentUser: User;

  constructor(protected app: AppService, protected modal: NgbModal) {
  }

  get avatar() {
    return this.currentUser.fotoPerfil;
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
    this.app.auth.logout();
  }

  ngOnInit() {
    this.app.users.currentUserUpdated.subscribe(user => {
      this.currentUser = user;
    });

  }

}
