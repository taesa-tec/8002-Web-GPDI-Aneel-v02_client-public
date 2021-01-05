import {Component, OnInit} from '@angular/core';
import {TableComponentCols} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {PropostasComponent} from '@app/user-suprimento/captacoes/captacao/propostas/propostas.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cols: TableComponentCols = [
    {title: 'Nome do fornecedor', field: 'fornecedor'},
    {title: 'Data de Recebimento', field: 'dataRecebimento'},
    {title: 'Status', field: 'status'},
  ];
  data: Array<any>;

  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      this.data = data.propostas;
    });
  }

}
