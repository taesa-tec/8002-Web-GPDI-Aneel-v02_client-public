import {NgModule} from '@angular/core';
import {NotDefinedPipe} from '@app/core/shared/pipes/not-defined.pipe';
import {OrderByPipe} from '@app/core/shared/pipes/order-by.pipe';
import {TipoProjetoPipe} from '@app/core/shared/pipes/tipo-projeto.pipe';
import {N2arrayPipe} from '@app/core/shared/pipes/n2array.pipe';
import {FilesizePipe} from '@app/core/shared/pipes/filesize.pipe';


@NgModule({
  declarations: [
    NotDefinedPipe,
    OrderByPipe,
    TipoProjetoPipe,
    N2arrayPipe,
    FilesizePipe
  ],
  exports: [
    NotDefinedPipe,
    OrderByPipe,
    TipoProjetoPipe,
    N2arrayPipe,
    FilesizePipe
  ]
})
export class AppPipesModule {

}
