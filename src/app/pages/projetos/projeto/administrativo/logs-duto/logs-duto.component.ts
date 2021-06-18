import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TableComponentCols} from '@app/core/components';
import {Funcoes, Graduacoes} from '@app/commons';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {AppService} from '@app/services';
import {DatePipe} from '@angular/common';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-logs-duto',
  templateUrl: './logs-duto.component.html',
  styles: []
})
export class LogsDutoComponent implements OnInit {

  logs: Array<any> = [];

  tableCols: TableComponentCols = [
    {
      field: 'file',
      title: 'XML Referência',
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
      text: 'Ver log',
      icon: 'ta-eye',
      className: 'btn btn-primary'
    }
  ];

  constructor(protected route: ActivatedRoute, protected service: ProjetoService, protected app: AppService,
              protected fileService: FileService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.logs = data.logs;
    });
  }

  async reloadLogs() {
    const p = this.service.getCurrentProjeto();
    this.logs = await this.service.obter(`${p.id}/LogsDuto`);
  }

  async uploadLog(evt: Event) {
    if (await this.app.confirm('Confirme o envio')) {
      this.app.loading.show().then();
      const i = evt.target as HTMLInputElement;
      const p = this.service.getCurrentProjeto();
      try {
        await this.service.upload([i.files.item(0)], `${p.id}/LogsDuto`);
        await this.reloadLogs();
      } catch (e) {
        console.error(e);
        this.app.alertError('Erro no upload').then();
      }
      i.value = '';
      this.app.loading.hide();

    }
  }

  async download({action, data}) {
    this.app.loading.show().then();
    await this.fileService.urlToBlobDownload(`Projetos/${data.projetoId}/Xml/${data.id}`, null);
    this.app.loading.hide();
  }

}
