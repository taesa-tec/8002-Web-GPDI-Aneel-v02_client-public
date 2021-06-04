import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  title = '';
  cols: TableComponentCols = [
    {title: 'Nome/Beneficiário', field: 'recurso'},
    {title: 'Categoria Contábil', field: 'categoriaContabil'},
    {title: 'Empresa Pagadora', field: 'financiador'},
    {title: 'Empresa Recebedora', field: 'recebedor'},
    {title: 'Valor', field: 'custo', type: 'currency'},
  ];
  data: any[] = [];
  actions: TableComponentActions = [{text: 'Ver Detalhes', icon: 'ta-eye', action: 'detalhes', className: 'btn btn-primary'}];


  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(d => {
      this.data = d.registros;
      this.title = d.title;
    });
  }

}
