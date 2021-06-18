import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {CaptacaoEtapa} from '@app/users-modules/suprimento/captacoes/commons';
import {TableComponentActions, TableComponentCols, TableComponentFilter} from '@app/core/components';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {filter} from 'rxjs/operators';
import {CriarComponent} from '@app/pages/captacao/criar/criar.component';
import {EnviarComponent} from '@app/pages/captacao/enviar/enviar.component';

export interface CaptacaoTableConfig {
  captacoes: Array<any>;
  cols: TableComponentCols;
  buttons: TableComponentActions;
  captacaoEtapaStatus: CaptacaoEtapa;

  [prop: string]: any;
}

@Component({
  selector: 'app-projetos-captacao',
  templateUrl: './captacoes.component.html',
})
export class CaptacoesComponent {

}
