import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {NiveisUsuarios} from '@app/models';
import {ProjetoFacade} from '@app/facades/index';

@Directive({
    selector: '[appUserAccess], [appUserAdmin], [appUserAprovador], [appUserEscrita], [appUserLeitura]'
})
export class UserAccessDirective implements OnInit {

    hasView = false;
    currentProject: ProjetoFacade;
    permissao: any;

    @Input('appUserAccess') set access(permissao: any) {
        this.update(permissao);
    }

    @Input('appUserAdmin') set userAdmin(value) {
        this.update(NiveisUsuarios.admin);
    }

    @Input('appUserAprovador') set userAprovador(value) {
        this.update(NiveisUsuarios.aprovador);
    }

    @Input('appUserEscrita') set userLeituraEscrita(value) {
        this.update(NiveisUsuarios.leituraEscrita);
    }

    @Input('appUserLeitura') set userLeitura(value) {
        this.update(NiveisUsuarios.leitura);
    }


    get nativeElement() {
        return <HTMLElement>this.element.nativeElement;
    }

    constructor(
        protected app: AppService,
        protected element: ElementRef,
        protected templateRef: TemplateRef<any>,
        protected viewContainer: ViewContainerRef) {

    }

    async ngOnInit() {
        this.currentProject = await this.app.projetos.getCurrent();
        this.update(this.permissao);
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

    async update(permissao) {
        this.permissao = permissao;
        if (typeof permissao === 'boolean' && permissao) {
            this.show();
            return;
        }

        this.hide();

        if (this.currentProject !== undefined) {
            const can = await this.app.users.currentUserCanAccess(this.currentProject, permissao);
            can ? this.show() : this.hide();
        }
    }

}

