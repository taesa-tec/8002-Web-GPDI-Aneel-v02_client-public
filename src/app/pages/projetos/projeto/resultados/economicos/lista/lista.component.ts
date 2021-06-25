import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  indicadores: Array<any> = [
    {id: 1, tipo: 'Redução de Homem/Hora - Produtividade', percentual: '25%'},
    {id: 2, tipo: 'Redução de DEC, FEC e TMA - Qualidade do Fornecimento', percentual: '25%'}
  ];

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'Percentual Impacto', field: 'percentual', order: true}
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
    this.openModal(null);
    this.route.data.subscribe(d => {
      // this.data = d.registros;
      // this.title = d.title;
      // this.items = d.items;
      // if (d.registro) {
      //   this.openModal(d.registro, d.observacoes).then();
      // }
    });
  }

  async openModal(indicador?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.indicador = indicador;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
