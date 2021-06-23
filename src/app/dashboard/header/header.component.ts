import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import {HEADER_MENU, MenuItem, ROOT_URL, User} from '@app/commons';
import {AppService} from '@app/services/app.service';
import {AuthService} from '@app/services/auth.service';
import {UsersService} from '@app/services';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: Array<MenuItem>;
  avatar = '';

  get empresa() {
    if (this.currentUser) {
      return this.currentUser.empresa || this.currentUser.razaoSocial || '';
    }
    return '';
  }

  currentUser: User;

  constructor(
    @Optional() @Inject(HEADER_MENU) menu,
    protected app: AppService,
    protected auth: AuthService,
    protected userService: UsersService,
    protected cdr: ChangeDetectorRef
  ) {
    this.menu = menu;
  }

  openCadastro() {
    this.app.router.navigate(['/meu-cadastro']).then();
  }

  logout() {
    this.auth.logout().then();
  }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
    this.auth.user.pipe(filter(u => u != null)).subscribe(user => {

      this.currentUser = user;
      this.avatar = user.fotoPerfil.concat('?time=', Date.now().toString());
    });
  }

}
