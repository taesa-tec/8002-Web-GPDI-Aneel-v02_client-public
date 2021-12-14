import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AuthService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRole} from '@app/commons';

interface RoleItemPriority {
  role: UserRole | Array<UserRole>;
  priority: number;
}

export interface RoleComponent extends RoleItemPriority {
  component: Type<any>;
}

export type RoleComponents = Array<RoleComponent>;

export interface RolePath extends RoleItemPriority {
  path: string;
}

export type RolePaths = Array<RolePath>;

function getRoleItem<T extends RoleItemPriority>(roles: Array<UserRole>, items: Array<T>) {
  return roles
    .map(r => items.filter(rc => Array.isArray(rc.role) && rc.role.indexOf(r) >= 0 || rc.role === r))
    .reduce((p, c) => [...p, ...c], [])
    .reduce((p, c) => (p && p.priority > c.priority ? p : c));
}

@Component({
  selector: 'app-by-role',
  templateUrl: './by-role.component.html',
  styleUrls: ['./by-role.component.scss']
})
export class ByRoleComponent implements OnInit, AfterViewInit {

  protected component: Type<any>;

  @ViewChild('templateRef', {static: true, read: ViewContainerRef}) viewContainer: ViewContainerRef;

  get user() {
    return this.auth.getUser();
  }

  get roles() {
    return this.user?.roles || [];
  }

  get rolesclass() {
    return this.roles.map(r => `role-${r.toLowerCase()}`).join(' ');
  }

  constructor(protected auth: AuthService, protected cmpFactory: ComponentFactoryResolver, protected route: ActivatedRoute) {
  }

  createComponent() {
    if (!this.component) {
      console.warn('Nenhum componente encontrado');
      return;
    }
    const cmpFac = this.cmpFactory.resolveComponentFactory(this.component);
    this.viewContainer?.clear();
    this.viewContainer?.createComponent(cmpFac);
  }

  ngOnInit(): void {
    this.route.data.subscribe(({roleComponents}: { roleComponents: RoleComponents }) => {
      if (roleComponents) {
        const roleComponent = getRoleItem(this.roles, roleComponents);
        this.component = roleComponent?.component;
      }
    });
  }

  ngAfterViewInit() {
    this.createComponent();
  }


}


@Component({
  selector: 'app-redirect-by-role',
  template: `Redirecionando...`,
  styles: []
})
export class RedirectByRoleComponent implements OnInit {
  get user() {
    return this.auth.getUser();
  }

  get roles() {
    return this.user?.roles || [];
  }

  constructor(private auth: AuthService, private router: Router, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.redirect().then();
  }

  async redirect() {
    const {rolePaths} = this.route.snapshot.data;
    try {
      if (rolePaths) {
        const rolePath = getRoleItem(this.roles, rolePaths as RolePaths);
        if (rolePath) {
          await this.router.navigate([rolePath.path], {relativeTo: this.route});
        } else {
          console.warn('Url não encontrada');
        }
      } else {
        throw new Error('RedirectByRoleComponent: rolePaths não definida');
      }
    } catch (e) {
      console.error(e);
    }
  }


}
