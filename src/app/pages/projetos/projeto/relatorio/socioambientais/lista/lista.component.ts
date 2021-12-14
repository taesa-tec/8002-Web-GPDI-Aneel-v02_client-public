import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';
import { Socioambiental } from '../../relatorio';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  socioambientais: Array<Socioambiental>;

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'Impacto Positivo?', field: 'resultadoPositivo', 
      value: item => item.resultadoPositivo ? 'Sim':'Não', order: true}
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
    this.route.data.subscribe(({socioambientais}) => {
      if(Array.isArray(socioambientais)) {
        this.socioambientais = socioambientais
      } else {
        this.openModal(socioambientais)
      }
    });

    this.route.fragment.subscribe(data => {
      if(data == 'novo') {
        this.openModal();
      }
    });
  }

  async openModal(socioambiental?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.socioambiental = socioambiental;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
