import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AuthService} from '@app/services';
import {MainComponent} from '@app/dashboard/shared';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {UserRole} from '@app/commons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  template: `

  `,
  styles: []
})
export class IndexComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.redirect().then();
  }

  async redirect() {
    if (this.auth.userHasRoles(UserRole.Administrador, UserRole.User)) {
      return await this.router.navigateByUrl('/dashboard/demandas');
    }
    if (this.auth.userHasRoles(UserRole.Suprimento, UserRole.Fornecedor)) {
      return await this.router.navigateByUrl('/dashboard/captacoes');
    }

  }

}
