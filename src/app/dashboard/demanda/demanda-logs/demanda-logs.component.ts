import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {zip, of} from 'rxjs';
import {Projeto, LogProjeto, User, AcaoLog, TotalLog} from '@app/models';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {size} from 'lodash-es';
import {Demanda} from '@app/models/demandas';
import {FormEditorComponent} from '@app/dashboard/demanda/form-editor/form-editor.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormViewerComponent} from '@app/dashboard/demanda/form-viewer/form-viewer.component';


@Component({
  selector: 'app-demandas-log',
  templateUrl: './demanda-logs.component.html',
  styleUrls: []
})
export class DemandaLogsComponent implements OnInit {
  constructor(protected app: AppService, protected route: ActivatedRoute, protected modal: NgbModal) {
  }

  demanda: Demanda;
  logs: Array<any> = [];


  async ngOnInit() {

    const demandaRoute = this.route.snapshot.parent.data['demanda'];
    this.demanda = demandaRoute.demanda;
    try {
      await this.loadData();
    } catch (e) {

    }
  }

  async loadData() {
    this.logs = await this.app.demandas.getLogs(this.demanda.id);
  }

  viewFormData(data) {
    const modal = this.modal.open(FormViewerComponent, {size: 'lg', backdrop: true});
    const cmp = <FormViewerComponent>modal.componentInstance;
    cmp.demanda = this.demanda;
    cmp.demandaId = this.demanda.id;
    cmp.formValue = data.form;
    cmp.key = data.form.key;
  }

}
