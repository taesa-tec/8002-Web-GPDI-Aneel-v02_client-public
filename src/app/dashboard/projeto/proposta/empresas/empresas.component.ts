import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpresaFormComponent} from '@app/dashboard/projeto/common/empresa-form/empresa-form.component';
import {AppService} from '@app/core/services/app.service';
import {Empresa, Projeto, EmpresaProjeto, UF} from '@app/models';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {zip, of} from 'rxjs';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjetoFacade} from '@app/facades/projeto.facade';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: []
})
export class EmpresasComponent implements OnInit {

    empresas: Array<EmpresaProjeto> = [];
    projeto: ProjetoFacade;
    empresasCatalog: Array<Empresa>;
    estados: Array<UF>;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, private route: ActivatedRoute, protected modal: NgbModal) {
    }

    openModal(empresa: EmpresaProjeto | any = {}) {
        const modalRef = this.modal.open(EmpresaFormComponent, {size: 'lg'});
        modalRef.componentInstance.projeto = this.projeto;
        modalRef.componentInstance.empresa = empresa;
        modalRef.componentInstance.projetos_empresas = this.empresas;
        modalRef.componentInstance.empresas = this.empresasCatalog;
        modalRef.componentInstance.estados = this.estados;
        modalRef.result.then(r => {
            this.loadData(true);
        }, e => {

        });
    }

    ngOnInit() {
        this.loadData();
    }

    async loadData(clearCache = false) {
        this.loading.show();

        if (clearCache) {
            this.projeto.REST.Empresas.clearCache();
        }

        this.projeto = await this.app.projetos.getCurrent();
        this.empresasCatalog = this.empresasCatalog || await this.app.catalogo.empresas().toPromise();
        this.estados = this.estados || await this.app.catalogo.estados().toPromise();

        this.empresas = (await this.projeto.REST.Empresas.listar<Array<EmpresaProjeto>>().toPromise());


        this.loading.hide();
    }

}
