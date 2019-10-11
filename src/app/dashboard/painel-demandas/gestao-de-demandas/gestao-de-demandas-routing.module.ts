import { AuthGuard } from './../../../auth/auth.guard';
import { EnviadasParaCaptacaoComponent } from './enviadas-para-captacao/enviadas-para-captacao.component';
import { ReprovadasComponent } from './reprovadas/reprovadas.component';
import { AprovadasComponent } from './aprovadas/aprovadas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestaoDeDemandasComponent } from './gestao-de-demandas.component';
import { ElaboracaoComponent } from './elaboracao/elaboracao.component';

const routes: Routes = [
    {
        path: '',
        component: GestaoDeDemandasComponent,
        children: [
            {
                path: '',
                redirectTo: 'elaboracao',
                pathMatch: 'full',
            },
            {
                path: 'elaboracao',
                component: ElaboracaoComponent,
            },
            {
                path: 'reprovadas',
                component: ReprovadasComponent,
            }
            , {
                path: 'aprovadas',
                component: AprovadasComponent,
                data: {
                    text: 'Aprovadas'
                }
            }
            , {
                path: 'enviadas-para-captacao',
                component: EnviadasParaCaptacaoComponent,
                data: {
                    text: 'Enviadas Para Captação'
                }
            },
        ],

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestaoDeDemandasRoutingModule { }
