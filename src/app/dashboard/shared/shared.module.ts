import {NgModule} from '@angular/core';
import {MainComponent} from './main/main.component';
import {ListaProjetosComponent} from './lista-projetos/lista-projetos.component';
import {ProjetoCardComponent} from './projeto-card/projeto-card.component';
import {MeusProjetosComponent} from './meus-projetos/meus-projetos.component';
// @todo Exportar para um modulo único de Demandas
import {FormFieldComponent, FormEditorComponent, FormFieldControlComponent, TemasComponent} from '@app/dashboard/shared/forms-demandas';
import {PdfViewerComponent} from '@app/dashboard/shared/pdf-viewer/pdf-viewer.component';
import {CoreModule} from '@app/core';
import {HeaderComponent} from '@app/dashboard/shared/header/header.component';
import {NovoProjetoComponent} from '@app/dashboard/shared/novo-projeto/novo-projeto.component';

const components = [
  FormFieldComponent,
  FormEditorComponent,
  FormFieldControlComponent,
  HeaderComponent,
  ListaProjetosComponent,
  MainComponent,
  MeusProjetosComponent,
  NovoProjetoComponent,
  PdfViewerComponent,
  ProjetoCardComponent,
  TemasComponent
];

@NgModule({
  declarations: components,
  entryComponents: [],
  imports: [
    CoreModule,
  ],
  exports: [CoreModule, ...components],
})
export class SharedModule {
}
