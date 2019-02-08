import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Produto } from '@app/models';


@Component({
    selector: 'app-etapa-form',
    templateUrl: './etapa-form.component.html',
    styleUrls: ['./etapa-form.component.scss']
})
export class EtapaFormComponent {

    @Input() etapa_id;

    etapaProdutos: Number[] = [0];
    produtos: Produto[] = [];


    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService) { }
    adicionarProduto() {
        this.etapaProdutos = [0, ...this.etapaProdutos];
    }
    removerProduto(index) {
        console.log(index);

        this.etapaProdutos.splice(index, 1);
    }

    submit() {
        this.activeModal.close('submit');
    }

}
