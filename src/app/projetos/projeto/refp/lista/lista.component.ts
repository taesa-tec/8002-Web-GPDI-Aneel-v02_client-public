import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  cols: TableComponentCols = [
    {title: 'Nome/Beneficiário', field: ''},
    {title: 'Categoria Contábil', field: ''},
    {title: 'Empresa Pagadora', field: ''},
    {title: 'Valor', field: ''},
  ];
  data: any[] = [];
  actions: TableComponentActions = [{text: 'Ver Detalhes', icon: 'ta-eye', action: 'detalhes', className: 'btn btn-primary'}];


  constructor() {
  }

  ngOnInit(): void {
  }

}
