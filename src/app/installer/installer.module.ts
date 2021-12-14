import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InstallerRoutingModule} from './installer-routing.module';
import {InstallerComponent} from './installer/installer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '@app/core';
import {ScreensModule} from '@app/core/screens/screens.module';


@NgModule({
  declarations: [InstallerComponent],
    imports: [
        CommonModule,
        CoreModule,
        InstallerRoutingModule,
        ReactiveFormsModule,
        ScreensModule
    ]
})
export class InstallerModule {
}
