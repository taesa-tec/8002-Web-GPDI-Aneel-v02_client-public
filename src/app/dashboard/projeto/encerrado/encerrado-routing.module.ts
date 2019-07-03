import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RelatorioFinalAuditoriaComponent} from './relatorio-final-auditoria/relatorio-final-auditoria.component';
import {RelatorioEtapaProjetoComponent} from './relatorio-etapa-projeto/relatorio-etapa-projeto.component';
import {ResultadoCapacitacaoComponent} from './resultado-capacitacao/resultado-capacitacao.component';
import {ResultadoCientificoComponent} from './resultado-cientifico/resultado-cientifico.component';
import {ResultadoInfraEstruturaComponent} from './resultado-infra-estrutura/resultado-infra-estrutura.component';
import {ResultadoPropriedadeIntelectualComponent} from './resultado-propriedade-intelectual/resultado-propriedade-intelectual.component';
import {ResultadoSocioambientalComponent} from './resultado-socioambiental/resultado-socioambiental.component';
import {ResultadoEconomicoComponent} from './resultado-economico/resultado-economico.component';
import {RelatorioAtividadesComponent} from './relatorio-atividades/relatorio-atividades.component';
import {ProjetoStatusGuard} from '@app/dashboard/projeto/guards/projeto-status.guard';


export const routes: Routes = [
    {path: '', redirectTo: 'relatorio-final-auditoria', pathMatch: 'full'},
    {path: 'relatorio-final-auditoria', component: RelatorioFinalAuditoriaComponent},
    {path: 'relatorio-atividades', component: RelatorioAtividadesComponent},
    {path: 'relatorio-etapas-projeto', component: RelatorioEtapaProjetoComponent},
    {path: 'resultados-capacitacao', component: ResultadoCapacitacaoComponent},
    {path: 'resultados-cientificos', component: ResultadoCientificoComponent},
    {path: 'resultados-infra-estrutura', component: ResultadoInfraEstruturaComponent},
    {path: 'resultados-propriedade-intelectual', component: ResultadoPropriedadeIntelectualComponent},
    {path: 'resultados-socioambientais', component: ResultadoSocioambientalComponent},
    {path: 'resultados-economicos', component: ResultadoEconomicoComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EncerradoRoutingModule {
}
