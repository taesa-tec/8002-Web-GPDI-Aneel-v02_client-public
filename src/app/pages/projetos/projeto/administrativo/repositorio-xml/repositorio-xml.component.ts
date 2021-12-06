import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TableComponentCols} from '@app/core/components';
import {DatePipe} from '@angular/common';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {AppService} from '@app/services';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-repositorio-xml',
  templateUrl: './repositorio-xml.component.html',
  styles: []
})
export class RepositorioXmlComponent implements OnInit {

  tableCols: TableComponentCols = [
    {
      field: 'file',
      title: 'XML Referência',
      order: true,
    }, {
      field: 'versao',
      title: 'Versão',
      order: true,
    },
    {
      field: 'data',
      title: 'Data',
      pipe: new DatePipe('pt-BR'), value: item => [item.data, 'short'],
      order: true,
    },
  ];
  buttons = [
    {
      action: '',
      text: 'Ver xml',
      icon: 'ta-eye',
      className: 'btn btn-primary'
    }
  ];
  xmls: any[];

  constructor(protected route: ActivatedRoute, protected service: ProjetoService, protected app: AppService,
              protected fileService: FileService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.xmls = data.xmls;

    });
  }

  async download({action, data}) {
    this.app.loading.show().then();
    await this.fileService.urlToBlobDownload(`Projetos/${data.projetoId}/Xml/${data.id}`, null);
    this.app.loading.hide();
  }
}
