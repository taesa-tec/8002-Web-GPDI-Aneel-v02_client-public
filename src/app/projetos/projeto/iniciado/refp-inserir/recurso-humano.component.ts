import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { RecursoHumano, Projeto, Empresa, TiposDoc, EmpresaProjeto } from '@app/models';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { zip } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-recurso-humano',
    templateUrl: './recurso-humano.component.html',
    styles: []
})
export class RecursoHumanoComponent implements OnInit {


    projeto: ProjetoFacade;
    recursos: Array<RecursoHumano>;
    empresas: Array<{ id: number; nome: string; }>;
    tipoDocs = TiposDoc;
    form: FormGroup;

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.form = new FormGroup({

        });
        this.loadData();
    }

    loadData() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = new ProjetoFacade(projeto, this.app.projetos);
            const rhs = this.projeto.recursosHumanos.get();
            const empresas$ = this.projeto.empresas.get();
            zip(rhs, empresas$).subscribe(([recursos, empresas]) => {
                this.recursos = recursos;
                this.empresas = empresas.map(e => {
                    const empresa = {
                        id: e.id,
                        nome: e.catalogEmpresaId ? `${e.catalogEmpresa.nome} - ${e.catalogEmpresa.valor}` : e.razaoSocial
                    };

                    return empresa;
                });
            });
            // const empresas = this.app.projetos

        });
    }


}
