import {NgModule} from '@angular/core';
import {ListComponent} from '@app/user-shared/demandas/list/list.component';
import {EtapaComponent, ProgressComponent} from '@app/user-shared/demandas/list/progress/progress.component';
import {SharedModule} from '@app/dashboard/shared';


@NgModule({
  declarations: [
    ListComponent,
    ProgressComponent,
    EtapaComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [ListComponent]
})
export class ListModule {
}
