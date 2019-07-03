import {Injectable, Inject} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from '../shared/entry-components/alert/alert.component';
import {ConfirmComponent} from '../shared/entry-components/confirm/confirm.component';
import {CatalogsService} from '@app/core/services/catalogs.service';
import {ProjetosService} from '@app/core/services/projetos.service';
import {AuthService} from '@app/core/services/auth.service';
import {FileService} from '@app/core/services/file.service';
import {UsersService} from '@app/core/services/users.service';
import {PromptComponent} from '../shared/entry-components/prompt/prompt.component';
import {Router} from '@angular/router';
import {environment} from '@env/environment';
import {ModalPageComponent} from '@app/core/shared/entry-components/modal-page/modal-page.component';
import {LoggerService} from '@app/core/services/logger.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    moment: any;
    config: any;

    constructor(
        public modal: NgbModal,
        public catalogo: CatalogsService,
        public projetos: ProjetosService,
        public users: UsersService,
        public file: FileService,
        public auth: AuthService,
        public router: Router,
        public logger: LoggerService,
        public modalConfig: NgbModalConfig
    ) {
        this.config = environment;
        this.modalConfig.backdrop = 'static';
    }

    alert(message: string | Array<string>, title: string = 'Alerta') {
        const ref = this.modal.open(AlertComponent, {backdrop: 'static'});
        ref.componentInstance.title = title;
        ref.componentInstance.setMessage(message);
        return ref.result;
    }

    confirm(message: string, title: string = 'Confirme',
            options: { text: string, value: any, cssClass: string }[] =
                [
                    {text: 'Cancelar', value: false, cssClass: 'btn btn-link'},
                    {text: 'Ok', value: true, cssClass: 'btn-primary'}
                ]) {
        const ref = this.modal.open(ConfirmComponent, {backdrop: 'static'});
        ref.componentInstance.setMessage(message);
        ref.componentInstance.title = title;
        ref.componentInstance.options = options;
        return ref.result;
    }

    prompt(message: string, title: string = 'Confirme') {
        const ref = this.modal.open(PromptComponent, {backdrop: 'static'});
        ref.componentInstance.setMessage(message);
        ref.componentInstance.title = title;
        return ref.result;
    }

    openPage(pageName) {
        const ref = this.modal.open(ModalPageComponent, {backdrop: 'static', size: 'lg'});
        const component = <ModalPageComponent>ref.componentInstance;
        try {
            component.setPage(pageName);
        } catch (e) {
            ref.dismiss(e);
            this.alert(e.message);
        }

        return ref.result;
    }
}
