import {AppService} from '@app/services/app.service';
import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components/table/table';

@Component({
  selector: 'app-padrao-formularios',
  templateUrl: './padrao-formularios.component.html',
  styleUrls: ['./padrao-formularios.component.scss']
})
export class PadraoFormulariosComponent implements OnInit {
  cols: TableComponentCols = [{
    field: 'title',
    title: 'Título',
  }];
  buttons: TableComponentActions = [{
    action: 'edit',
    text: 'Editar',
    icon: 'ta-edit',
    className: 'btn btn-primary'
  }];
  forms = [];

  constructor(protected app: AppService) {
  }

  async ngOnInit() {
    this.forms = await this.app.demandas.getForms().toPromise();
  }

  tableAction({action, data}) {
    if (action === 'edit') {
      this.app.router.navigate(['/admin/configuracoes/padrao-formularios', data.key]);
    }
  }

}
