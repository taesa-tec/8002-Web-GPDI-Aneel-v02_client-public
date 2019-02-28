import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './shared/alert/alert.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { CatalogsService } from './catalogs/catalogs.service';
import { ProjetosService } from './projetos/projetos.service';
import { AuthService } from './auth/auth.service';
import { FileService } from './shared/file.service';
import { UsersService } from './users/users.service';
import { PromptComponent } from './shared/prompt/prompt.component';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { RequestCacheService } from './request-cache.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    moment: any;

    constructor(
        public modal: NgbModal,
        public catalogo: CatalogsService,
        public projetos: ProjetosService,
        public users: UsersService,
        public file: FileService,
        public auth: AuthService,
        public router: Router,
        public requestCache: RequestCacheService
    ) { }

    alert(message: string | Array<string>, title: string = "Alerta") {
        const ref = this.modal.open(AlertComponent);
        ref.componentInstance.title = title;
        ref.componentInstance.setMessage(message);
        return ref.result;
    }

    confirm(message: string, title: string = "Confirme",
        options: { text: string, value: any, cssClass: string }[] =
            [
                { text: "Cancelar", value: false, cssClass: 'btn btn-link' },
                { text: "Ok", value: true, cssClass: 'btn-primary' }
            ]) {
        const ref = this.modal.open(ConfirmComponent, { backdrop: 'static' });
        ref.componentInstance.setMessage(message);
        ref.componentInstance.title = title;
        ref.componentInstance.options = options;
        return ref.result;
    }
    prompt(message: string, title: string = "Confirme") {
        const ref = this.modal.open(PromptComponent, { backdrop: 'static' });
        ref.componentInstance.setMessage(message);
        ref.componentInstance.title = title;
        return ref.result;
    }
}
