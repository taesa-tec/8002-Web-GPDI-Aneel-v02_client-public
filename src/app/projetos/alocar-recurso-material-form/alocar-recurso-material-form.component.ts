import { Component, OnInit } from '@angular/core';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoMaterial, Projeto } from '@app/models';

@Component({
    selector: 'app-alocar-recurso-material-form',
    templateUrl: './alocar-recurso-material-form.component.html',
    styleUrls: ['./alocar-recurso-material-form.component.scss']
})
export class AlocarRecursoMaterialFormComponent implements OnInit {

    recursosMaterias: Array<any>;
    empresaRecebdora: Array<any>;
    projeto: Projeto;

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService) { }

    ngOnInit() {
        this.loadRecursoMaterial();
        this.loadEmpresaRecebdora();
        console.log(this.empresaRecebdora);
    }

    loadRecursoMaterial() {
        this.projetoService.getRecursoMaterial(this.projeto.id).subscribe(recursosMaterias => this.recursosMaterias = recursosMaterias || []);
    }
    loadEmpresaRecebdora() {
        this.projetoService.getEmpresa(this.projeto.id).subscribe(empresaRecebdora => {
            console.log(empresaRecebdora);

            this.empresaRecebdora = empresaRecebdora || [];
        });
    }
}
