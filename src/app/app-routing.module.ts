import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestesComponent } from './testes/testes.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'testes', component: TestesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
