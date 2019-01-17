import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from '../projeto.service';
import { Produto } from '../common';

@Component({
    selector: 'app-produto-form',
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

    @Input() produto_id: number;

    // @todo Carregar o produto quando o id for alterado
    produto: Produto;

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetoService) { }

    get modalTitle() {
        return typeof this.produto_id !== 'undefined' ? "Editar Produto" : "Novo Produto";
    }
    get buttonAction() {
        return typeof this.produto_id !== 'undefined' ? { text: "Salvar Alterações", icon: 'ta-save' } :
            { text: "Criar Produto", icon: 'ta-plus' };
    }

    ngOnInit() {
        if (this.produto_id) {
            this.getProduto();
        }
    }

    getProduto() {

    }

}
