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
    produtos: Produto[] = [
        {
            created: "2019-01-07",
            desc: '',
            produtoId: 1,
            projetoId: 0,
            titulo: 'Produto A'
        },
        {
            created: "2019-01-07",
            desc: '',
            produtoId: 2,
            projetoId: 0,
            titulo: 'Produto B'
        },
        {
            created: "2019-01-07",
            desc: '',
            produtoId: 3,
            projetoId: 0,
            titulo: 'Produto C'
        },
        {
            created: "2019-01-07",
            desc: '',
            produtoId: 4,
            projetoId: 0,
            titulo: 'Produto D'
        },
    ];


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
