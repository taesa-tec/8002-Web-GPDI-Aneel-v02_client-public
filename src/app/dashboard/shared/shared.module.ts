import {NgModule} from '@angular/core';
import {SharedModule as SharedCoreModule} from '@app/core/shared/shared.module';
import {MainComponent} from './main/main.component';
import {ListaProjetosComponent} from './lista-projetos/lista-projetos.component';
import {ProjetoCardComponent} from './projeto-card/projeto-card.component';
import {MeusProjetosComponent} from './meus-projetos/meus-projetos.component';
import {FormFieldComponent} from './form-edit-components/form-field/form-field.component';
import {FormEditorComponent} from './form-edit-components/form-editor/form-editor.component';
import {FormFieldControlComponent} from './form-edit-components/form-field/form-field-control.component';
import {TemasComponent} from './form-edit-components/form-field/temas/temas.component';

const components = [
  MainComponent,
  ListaProjetosComponent,
  ProjetoCardComponent,
  MeusProjetosComponent,
  FormFieldComponent,
  FormEditorComponent,
  FormFieldControlComponent,
  TemasComponent
];

@NgModule({
  declarations: components,
  entryComponents: [],
  imports: [
    SharedCoreModule,
  ],
  exports: [SharedCoreModule, ...components]
})
export class SharedModule {
}
