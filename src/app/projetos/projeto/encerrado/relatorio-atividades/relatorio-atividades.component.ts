import { Component, OnInit } from '@angular/core';
import { AtividadesComponent } from '../../proposta/atividades/atividades.component';

@Component({
    selector: 'app-relatorio-atividades',
    templateUrl: './relatorio-atividades.component.html',
    styles: []
})
export class RelatorioAtividadesComponent extends AtividadesComponent {
    disabled = true;
}
