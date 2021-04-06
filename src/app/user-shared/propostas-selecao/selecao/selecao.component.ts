import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styles: []
})
export class SelecaoComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, protected  app: AppService) {
  }

  ngOnInit(): void {
  }

  selecionar(id) {
    console.log('@TODO: SELECIONAR PROPOSTA!');
  }

  async anexarArquivos() {
    const files = await this.app.uploadForm();
  }

}
