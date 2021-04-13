import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SelecaoComponent} from '@app/user-shared/propostas-selecao/selecao/selecao.component';

@Component({
  selector: 'app-pendente',
  templateUrl: './pendente.component.html',
  styles: []
})
export class PendenteComponent implements OnInit {

  buttons: TableComponentActions = [
    {
      action: '',
      text: 'Confirmar Seleção',
      icon: 'ta-edit'
    }
  ];
  data: Array<any>;
  cols: TableComponentCols = [
    {field: 'titulo', title: 'Titulo'},
    {field: 'proposta', title: 'Proposta Recebidas'},
  ];

  constructor(protected route: ActivatedRoute, protected modal: NgbModal) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {

    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo' || !isNaN(parseFloat(f))) {
        this._openModal();
      }
    });
  }

  private _openModal() {
    const ref = this.modal.open(SelecaoComponent, {size: 'lg'});
  }

}
