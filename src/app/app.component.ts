import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoadingComponent } from './shared/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(protected router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      this.loading.show();
    });
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.loading.hide();
    });
  }
}
