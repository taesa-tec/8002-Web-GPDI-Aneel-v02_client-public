import { Component, OnInit } from '@angular/core';
import { AlocarRecursoMaterialFormComponent } from '@app/projetos/alocar-recurso-material-form/alocar-recurso-material-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Projeto, AlocacaoRM, CategoriaContabil } from '@app/models';
import { zip, of } from 'rxjs';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-alocacao',
    templateUrl: './alocacao.component.html',
    styleUrls: ['./alocacao.component.scss']
})
export class AlocacaoComponent implements OnInit {

    categoriaContabel = CategoriaContabil;
    alocacoes: Array<any>;
    projeto: Projeto;

    constructor(
        private route: ActivatedRoute,
        protected app: AppService,
        protected modalService: NgbModal) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {

        const data$ = this.route.parent.data.pipe(
            map(d => d.projeto),
            mergeMap(p => zip(
                of(p),
                this.app.projetos.getAlocacaoRM(p.id),
            ))
        );

        data$.subscribe(([projeto, alocacoes]) => {

            this.projeto = projeto;

            this.alocacoes = alocacoes.map(aloc => {

                //this.loadRecursoMaterial(aloc);
                //this.loadEmpresas(aloc);

                return aloc;
            });

        });
    }

    /**
     * Não vai rolar só pegar o id do projeto, eu queria pegar o id do material e retornar a material
     * @param aloc 
     */
    loadRecursoMaterial(aloc) {

        this.app.projetos.getRecursoMaterial(aloc.recursoMaterialId).subscribe(rec => {

            aloc.recursoMaterial = rec;

            aloc.recursoMaterial = rec.map(recM => {
                recM.categoriaContabelNome = this.categoriaContabel.find(e => recM.categoriaContabilValor === e.value).text;
                return recM;
            });

        });
    }
    /**
     * Não vai rolar só pegar o id do projeto, eu queria pegar o id da empresa e retornar a empresa
     * @param aloc 
     */
    loadEmpresas(aloc) {

        this.app.projetos.getEmpresas(aloc.empresaFinanciadoraId).subscribe(rec => {
            aloc.empresaFinanciadora = rec;
        });

        this.app.projetos.getEmpresas(aloc.empresaRecebedoraId).subscribe(rec => {
            aloc.empresaRecebedora = rec;
        });
    }

    openModal(alocacao: AlocacaoRM | {} = {}) {
        const modalRef = this.modalService.open(AlocarRecursoMaterialFormComponent, { size: 'lg' });
        modalRef.componentInstance.alocacao = alocacao;
        modalRef.componentInstance.projeto = this.projeto;

        modalRef.result.then(result => {
            this.loadData();

        }, e => {

        });

    }

}
