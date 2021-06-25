import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  apoios: Array<any> = [
    {id: 1, tipo: 'Laboratório Novo em Instituição de Ensino Superior', cnpj: '13.844.202-0001/16'},
    {id: 2, tipo: 'Laboratório Existente em Empresa de Energia Elétrica.', cnpj: '13.844.202-0001/16'}
  ];

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'CNPJ Entidade', field: 'cnpj', order: true}
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

  async openModal(apoio?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.apoio = apoio;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
