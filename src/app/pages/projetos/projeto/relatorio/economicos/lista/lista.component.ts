import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';
import { IndicadorEconomico } from '../../relatorio';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  indicadores: Array<IndicadorEconomico>;

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'Percentual Impacto', field: 'porcentagemImpacto', value: i => `${i.porcentagemImpacto}%`, order: true}
  ];

  buttons: TableComponentActions = [
    {isLink: true, text: 'Editar', action: './#${id}', className: 'btn btn-primary', icon: 'ta-edit'}
  ];

  constructor(
    protected route: ActivatedRoute, 
    protected modal: NgbModal, 
    protected router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({indicadores}) => {
      if(Array.isArray(indicadores)) {
        this.indicadores = indicadores
      } else {
        this.openModal(indicadores)
      }
    });

    this.route.fragment.subscribe(data => {
      if(data == 'novo') {
        this.openModal();
      }
    });
  }

  async openModal(indicador?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.indicador = indicador;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
