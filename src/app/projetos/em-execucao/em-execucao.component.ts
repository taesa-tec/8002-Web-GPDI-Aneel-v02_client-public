import {Component, OnInit} from '@angular/core';
import {TableComponentCols} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-em-execucao',
  templateUrl: './em-execucao.component.html',
  styleUrls: ['./em-execucao.component.scss']
})
export class EmExecucaoComponent implements OnInit {

  cols: TableComponentCols = [
    {title: 'Titulo Resumido Projeto', field: 'titulo'},
    {title: 'Data Aprovação', field: 'dataCriacao'},
  ];

  projetos: Array<any> = [];

  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      this.projetos = data.projetos;
    });
  }

}
