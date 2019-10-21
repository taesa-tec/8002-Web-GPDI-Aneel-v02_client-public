import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-padrao-formularios',
  templateUrl: './padrao-formularios.component.html',
  styleUrls: ['./padrao-formularios.component.scss']
})
export class PadraoFormulariosComponent implements OnInit {

  constructor(protected app: AppService) {
  }

  ngOnInit() {
  }

  save() {
    this.app.alert('Atualização aplicada com sucesso');
  }

}
