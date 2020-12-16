import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {NiveisUsuarios, UserRole} from '@app/commons';
import {ProjetoFacade} from '@app/facades/index';
import {AuthService} from '@app/services';

// @todo mudar para dentro de Dashboard
@Directive({
  selector: '[appRole], [appRoleAdmin], [appRoleUser], [appRoleSuprimento], [appRoleFornecedor]'
})
export class HasRoleDirective implements OnInit {

  hasView = false;
  permissao: any;

  @Input('appRole') set access(role: string | Array<string>) {


    if (role === 'public') {
      this.show();
    } else {
      if (Array.isArray(role)) {
        this.update(...role);
      } else {
        this.update(role);
      }
    }
  }

  @Input('appRoleAdmin') set userAdmin(value) {
    this.update(UserRole.Administrador);
  }

  @Input('appRoleUser') set userAprovador(value) {
    this.update(UserRole.User);
  }

  @Input('appRoleSuprimento') set userLeitura(value) {
    this.update(UserRole.Suprimento);
  }

  @Input('appRoleFornecedor') set userLeituraEscrita(value) {
    this.update(UserRole.Fornecedor);
  }


  get nativeElement() {
    return <HTMLElement>this.element.nativeElement;
  }

  constructor(
    protected auth: AuthService,
    protected element: ElementRef,
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef) {

  }

  async ngOnInit() {
    //this.currentProject = await this.app.projetos.getCurrent();
  }

  hide() {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  show() {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    this.hasView = true;
  }

  update(...roles: string[]) {
    if (this.auth.userHasRoles(...roles)) {
      this.show();
      return;
    }
    this.hide();


  }

}

