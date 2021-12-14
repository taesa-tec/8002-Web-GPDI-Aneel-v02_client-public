import {Component} from '@angular/core';
import {CaptacaoEtapa} from '@app/users-modules/suprimento/captacoes/commons';
import {TableComponentActions, TableComponentCols} from '@app/core/components';

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
