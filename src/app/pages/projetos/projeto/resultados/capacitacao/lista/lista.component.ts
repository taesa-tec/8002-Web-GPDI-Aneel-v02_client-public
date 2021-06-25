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

  capacitacoes: Array<any> = [
    {id: 1, membro: 'André Moraes', capacitacao: 'PósDoutorado', arquivo: 'Sim'},
    {id: 2, membro: 'André Moraes', capacitacao: 'PósDoutorado', arquivo: 'Sim'}
  ];

  cols: TableComponentCols = [
    {title: 'Membro da Equipe', field: 'membro'},
    {title: 'Capacitação', field: 'capacitacao'},
    {title: 'Arquivo Cadastrado?', field: 'arquivo'}
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

  async openModal(capacitacao) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.capacitacao = capacitacao;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
