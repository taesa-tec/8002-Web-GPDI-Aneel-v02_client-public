import {NgModule} from '@angular/core';
import {NotDefinedPipe} from '@app/core/pipes/not-defined.pipe';
import {OrderByPipe} from '@app/core/pipes/order-by.pipe';
import {TipoProjetoPipe} from '@app/core/pipes/tipo-projeto.pipe';
import {N2arrayPipe} from '@app/core/pipes/n2array.pipe';
import {FilesizePipe} from '@app/core/pipes/filesize.pipe';
import {PadCharPipe} from '@app/core/pipes/pad-char.pipe';
import {ListUniquePipe} from '@app/core/pipes/list-unique.pipe';
import {LabelReplacePipe} from '@app/core/pipes/label-replace.pipe';

const pipes = [
  LabelReplacePipe,
  NotDefinedPipe,
  OrderByPipe,
  TipoProjetoPipe,
  N2arrayPipe,
  FilesizePipe,
  PadCharPipe,
  ListUniquePipe
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class PipesModule {

}
