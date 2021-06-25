import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  socioambientais: Array<any> = [
    {id: 1, tipo: 'Possibilidade de impactos ambientais (água, ar ou solo)', impacto: 'Sim'},
    {id: 2, tipo: 'Possibilidade de diversificação da matriz energética', impacto: 'Sim'}
  ];

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'Impacto Positivo?', field: 'impacto', order: true}
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

  async openModal(socioambiental?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.socioambiental = socioambiental;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
