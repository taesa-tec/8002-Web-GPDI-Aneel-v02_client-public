import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '@app/core/components/components.module';
import {DirectivesModule} from '@app/core/directives/directives.module';
import {PipesModule} from '@app/core/pipes/pipes.module';
import {SharedModule} from '@app/core/shared';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    SharedModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class CoreModule {
}
