import { NgModule } from '@angular/core';
import { CatalogsService } from './catalogs.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [],
    imports: [
        SharedModule
    ],
    providers: [CatalogsService]
})
export class CatalogsModule { }
