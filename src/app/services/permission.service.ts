import {Inject, Injectable, Optional, Provider} from '@angular/core';
import {PERMISSIONS} from '@app/core/shared';

@Injectable()
export class PermissionService {

  constructor(@Optional() @Inject(PERMISSIONS) permissions: Map<string, any>[]) {
    this.permissions = permissions?.reverse() || [];
  }

  protected permissions: Map<string, any>[];

  static ProvidePermissions(...permisions: string[]): Provider {
    return {
      provide: PERMISSIONS,
      multi: true,
      useValue: new Map(permisions.map(p => [p, true]))
    };
  }

  hasPermission(permission, level = null) {

    const hasPermission = this.permissions.find(p => p.has(permission))?.get(permission) || false;
    return hasPermission && (level == null || level === hasPermission);
  }
}
