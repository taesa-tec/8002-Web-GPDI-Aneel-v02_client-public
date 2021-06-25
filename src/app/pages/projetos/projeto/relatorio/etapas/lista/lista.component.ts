import { Component, OnInit } from '@angular/core';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  etapas: Array<any> = [
    {id: 1, etapas: 'Etapa 01', dataInicial: '2021-01-12', dataFinal: '2021-01-12', atividades: 'Sim'},
    {id: 2, etapas: 'Etapa 02', dataInicial: '2021-01-12', dataFinal: '2021-01-12', atividades: 'Não'}
  ];

  cols: TableComponentCols = [
    {title: 'Etapas', field: 'etapas'},
    {title: 'Data Inicial', field: 'dataInicial', pipe: new DatePipe('pt-BR'), value: item => [item.dataInicial, 'short']},
    {title: 'Data Final', field: 'dataFinal', pipe: new DatePipe('pt-BR'), value: item => [item.dataFinal, 'short']},
    {title: 'Atividades Cadastradas?', field: 'atividades'}
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

  async openModal(etapa) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.etapa = etapa;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
