import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Provider} from '@angular/core';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {FileService} from '@app/services/file.service';

export class DocumentoResolver implements Resolve<any> {

  static ToPath(path: string, providerAs): Provider {
    return {
      provide: providerAs,
      deps: [Router, ProjetoService, FileService],
      useFactory: (router: Router, service: ProjetoService, fileService: FileService) =>
        new DocumentoResolver(router, service, fileService, path)
    };
  }

  constructor(protected router: Router, protected service: ProjetoService, protected fileService: FileService, protected path: string) {

  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projeto = this.service.getCurrentProjeto();
    return await this.fileService.download(`Projetos/${projeto.id}/${this.path}`);
  }
}
