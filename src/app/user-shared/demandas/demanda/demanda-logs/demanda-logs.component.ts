import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormViewerComponent} from '@app/user-shared/demandas/demanda/form-viewer/form-viewer.component';
import {DEMANDA} from '@app/user-shared/demandas/demanda/providers';


@Component({
  selector: 'app-demandas-log',
  templateUrl: './demanda-logs.component.html',
  styleUrls: []
})
export class DemandaLogsComponent implements OnInit {
  constructor(
    @Inject(DEMANDA) protected demanda: Demanda,
    protected app: AppService, protected route: ActivatedRoute, protected modal: NgbModal) {
  }

  logs: Array<any> = [];


  async ngOnInit() {

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
    cmp.formValue = data.form;
    cmp.key = data.form.key;
  }

}
