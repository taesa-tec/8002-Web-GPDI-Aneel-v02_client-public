import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaFormComponent } from '@app/projetos/projeto/common/empresa-form/empresa-form.component';
import { AppService } from '@app/app.service';
import { Empresa, Projeto, EmpresaProjeto, UF } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

    empresas: Array<EmpresaProjeto> = [];
    projeto: Projeto;
    empresasCatalog: Array<Empresa>;
    estados: Array<UF>;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService, private route: ActivatedRoute) { }

    openModal(empresa: EmpresaProjeto | any = {}) {
        const modalRef = this.app.modal.open(EmpresaFormComponent, { size: 'lg' });
        modalRef.componentInstance.projeto = this.projeto;
        modalRef.componentInstance.empresa = empresa;
        modalRef.componentInstance.projetos_empresas = this.empresas;
        modalRef.componentInstance.empresas = this.empresasCatalog;
        modalRef.componentInstance.estados = this.estados;
        modalRef.result.then(r => {
            this.loadData();
        }, e => {

        });
    }

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.loading.show();
        const data$ = this.route.parent.data.pipe(
            map(d => d.projeto),
            mergeMap(p => zip(
                of(p),
                this.app.catalogo.empresas(),
                this.app.catalogo.estados(),
                this.app.projetos.getEmpresas(p.id)
            ))
        );

        data$.subscribe(([projeto, empresas, estados, projeto_empresas]) => {
            this.projeto = projeto;
            this.empresasCatalog = empresas;
            this.estados = estados;
            this.empresas = projeto_empresas.map(pe => {
                if (pe.catalogEmpresaId) {
                    pe.catalogEmpresa = empresas.find(e => pe.catalogEmpresaId === e.id);
                }
                return pe;
            });
            this.loading.hide();
        });
    }

}
