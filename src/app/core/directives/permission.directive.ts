import {Directive, Inject, Input, Optional, TemplateRef, ViewContainerRef} from '@angular/core';
import {PERMISSIONS} from '@app/core/shared';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {
  get appPermissionLevel(): any {
    return this._appPermissionLevel;
  }

  @Input() set appPermissionLevel(value: any) {
    this._appPermissionLevel = value;
  }

  protected hasView = false;
  protected permissions: Map<string, any>[];

  private _appPermission: string;
  @Input() set appPermission(value: string) {
    this._appPermission = value;
    this.update();

  }

  @Input() private _appPermissionLevel: any = null;

  constructor(@Optional() @Inject(PERMISSIONS) permissions: Map<string, any>[],
              protected templateRef: TemplateRef<any>,
              protected vc: ViewContainerRef) {
    this.permissions = permissions?.reverse() || [];
  }

  protected update() {
    const hasPermission = this.permissions.find(p => p.has(this._appPermission))?.get(this._appPermission) || false;
    if (hasPermission && (this._appPermissionLevel == null || this._appPermissionLevel === hasPermission)) {
      this.show();
    } else {
      this.hide();
    }

  }

  protected show() {
    if (!this.hasView) {
      this.vc.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  protected hide() {
    if (this.hasView) {
      this.vc.clear();
    }
  }


}
