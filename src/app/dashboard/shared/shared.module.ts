import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {ComponentsModule} from '@app/dashboard/shared/components/components.module';
import {DirectivesModule} from '@app/dashboard/shared/directives/directives.module';
// @todo Exportar para um modulo único de Demandas
import {
  FormFieldComponent,
  FormEditorComponent,
  FormFieldControlComponent,
  TemasComponent
} from '@app/dashboard/shared/components/forms-demandas';
import {AdminGuard, HasRoleGuard} from '@app/dashboard/shared/guards';

const components = [
  FormFieldComponent,
  FormEditorComponent,
  FormFieldControlComponent,
  TemasComponent
];

@NgModule({
  declarations: components,
  imports: [
    DirectivesModule,
    ComponentsModule,
    CoreModule,
  ],
  exports: [CoreModule, ...components, ComponentsModule],
  providers: [
    AdminGuard,
    HasRoleGuard
  ]
})
export class SharedModule {
}
