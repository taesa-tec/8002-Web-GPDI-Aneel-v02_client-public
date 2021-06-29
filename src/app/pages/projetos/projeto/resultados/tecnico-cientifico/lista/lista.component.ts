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

  cientificos: Array<any> = [
    {id: 1, tipo: 'Periódico Nacional', periodico: 'Ciência Hoje', arquivo: 'Sim'},
    {id: 2, tipo: 'Anais de Evento Nacional', periodico: 'EDAO', arquivo: 'Sim'}
  ];
  paises: Array<{ id: number; nome: string }>;

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'Periódico', field: 'periodico', order: true},
    {title: 'Arquivo Cadastrado?', field: 'arquivo', order: true}
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
    const {paises} = this.route.snapshot.data;
    this.paises = paises;

    this.route.fragment.subscribe(id => {
      //console.log("AAA: ",d);
      //this.openModal(null);
      // this.data = d.registros;
      // this.title = d.title;
      // this.items = d.items;
      // if (d.registro) {
      //   this.openModal(d.registro, d.observacoes).then();
      // }
    });
  }

  async openModal(cientifico?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.cientifico = cientifico;
    ref.componentInstance.paises = this.paises;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
