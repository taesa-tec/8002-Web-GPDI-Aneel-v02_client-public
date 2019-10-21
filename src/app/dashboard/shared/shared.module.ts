import { NgModule } from '@angular/core';
import { SharedModule as SharedCoreModule } from '@app/core/shared/shared.module';
import { MainComponent } from './main/main.component';
import { ListaProjetosComponent } from './lista-projetos/lista-projetos.component';
import { ProjetoCardComponent } from './projeto-card/projeto-card.component';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';

@NgModule({
  declarations: [
    MainComponent,
    ListaProjetosComponent,
    ProjetoCardComponent,
    MeusProjetosComponent,
  ],
  entryComponents: [],
  imports: [
    SharedCoreModule
  ],
  exports: [
    SharedCoreModule,
    MainComponent,
    ListaProjetosComponent,
    ProjetoCardComponent,
    MeusProjetosComponent,
  ]
})
export class SharedModule {
}
