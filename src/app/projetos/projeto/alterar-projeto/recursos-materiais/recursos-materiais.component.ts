import {Component, OnInit} from '@angular/core';
import {TableComponentCols} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-recursos-materiais',
  templateUrl: './recursos-materiais.component.html',
  styles: []
})
export class RecursosMateriaisComponent implements OnInit {

  tableCols: TableComponentCols = [
    {
      field: 'nome',
      title: 'Nome Recurso',
      order: true,
    },
    {
      field: 'categoriaContabil',
      title: 'Categoria Contabil',
      order: true,
    },
    {
      field: 'valorUnitario',
      title: 'Valor Unitário',
      type: 'currency',
      order: true,
    }
  ];
  buttons = [
    {
      isLink: true,
      action: './#${id}',
      text: 'EDITAR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];
  recursos = [];

  form = this.fb.group({
    id: 0,
    nome: ['', Validators.required],
    categoriaContabilId: ['', Validators.required],
    valorUnitario: [0, Validators.required],
    especificacaoTecnica: ['', Validators.required]
  });

  constructor(protected route: ActivatedRoute, protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.recursos = data.recursos;
    });
  }

}
