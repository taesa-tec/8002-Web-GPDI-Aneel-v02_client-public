import { Component, OnInit } from '@angular/core';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';
import { RelatorioEtapa } from '../../relatorio';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  relatoriosEtapa: Array<RelatorioEtapa>;

  cols: TableComponentCols = [
    {title: 'Etapas', field: 'etapa', value: item => `Etapa ${item.etapa.ordem}`, order: true},
    {title: 'Data Inicial', field: 'inicio', pipe: new DatePipe('pt-BR'), value: item => [item.inicio, 'short'], order: true},
    {title: 'Data Final', field: 'fim', pipe: new DatePipe('pt-BR'), value: item => [item.fim, 'short'], order: true},
    {title: 'Atividades Cadastradas?', field: 'hasAtividadeCadastrada', 
      value: item => item.hasAtividadeCadastrada? 'Sim':'Não', order: true
    }
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
    this.route.data.subscribe(({relatoriosEtapa}) => {
      if(Array.isArray(relatoriosEtapa)) {
        this.relatoriosEtapa = relatoriosEtapa
      } else {
        this.openModal(relatoriosEtapa)
      }
    });
  }

  async openModal(relatorioEtapa?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.relatorioEtapa = relatorioEtapa;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
