import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from './app.service';
import { User } from './models';
import { ProjetoFacade } from './facades';

@Directive({
    selector: '[appUserAccess]'
})
export class UserAccessDirective {

    hasView = false;
    currentUser: User;
    currentProject: ProjetoFacade;
    @Input('appUserAccess') set access(permissao: any) {
        console.log(permissao);

        if (typeof permissao === 'boolean' && permissao) {
            this.show();
            return;
        }

        this.hide();
        
        if (this.currentProject !== undefined) {
            this.app.users.currentUserCanAccess(this.currentProject, permissao).subscribe(can => {
                can ? this.show() : this.hide();
            });
        }
    }

    get nativeElement() {
        return <HTMLElement>this.element.nativeElement;
    }

    constructor(
        protected app: AppService,
        protected element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {

        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.currentProject = projeto;
        });

    }

    hide() {
        if (this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
    show() {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
    }

}
