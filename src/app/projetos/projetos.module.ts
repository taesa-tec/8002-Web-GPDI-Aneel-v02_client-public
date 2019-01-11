import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';

import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [MeusProjetosComponent, NovoProjetoComponent],
    entryComponents: [NovoProjetoComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class ProjetosModule { }
