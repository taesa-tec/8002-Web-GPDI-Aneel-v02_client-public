import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SistemaStatusResolver} from '@app/resolvers';
import {AppEntranceComponent} from '@app/app.component';

const routes: Routes = [
  {
    path: '**',
    component: AppEntranceComponent,
    resolve: {
      status: SistemaStatusResolver
    }
  }
  //{path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
