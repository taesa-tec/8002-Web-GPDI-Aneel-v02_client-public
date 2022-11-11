import {Component, HostBinding, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute
} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {KONAMI_CODE, KONAMI_CODE_MAP} from '@app/commons';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '@app/services';
import {environment} from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  version = '';
  isDevelopment = !environment.production;
  protected ks = [];
  protected isKs = false;

  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  constructor(protected app: AppService, @Inject(KONAMI_CODE) protected kc: BehaviorSubject<boolean>) {

    this.version = app.config.version;

  }

  @HostBinding('class.konami') get ko() {
    return this.isKs;
  }

  @HostListener('window:keyup', ['$event'])
  keyup(evt: KeyboardEvent) {
    if (this.isKs) {
      return;
    }
    this.ks.push(KONAMI_CODE_MAP.get(evt.key) || '_');
    if (this.ks.length > 10) {
      this.ks.splice(0, 1);
    }
    if (evt.key === 'a' && 'uuddlrlrba' === this.ks.join('')) {

      this.kc.next(true);
    }
  }

  async ngOnInit() {
    this.kc.subscribe(c => {
      this.isKs = c;
    });
    this.loading.show();
    this.app.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      this.loading.show();
    });
    this.app.router.events.pipe(
      filter(e => (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError)))
      .subscribe(_ => {
        this.loading.hide();
      });

    this.app.loading.observable.subscribe(show => {
      show ? this.loading.show() : this.loading.hide();
    });

    this.loading.hide();
  }
}

@Component({
  selector: 'app-entrance',
  styles: ['h4{width: 360px}'],
  template: `
    <app-wrap-full>
      <div class="d-flex flex-column justify-content-center align-items-center mt-5">
        <h5 class="text-center">Carregando</h5>
        <app-loading [isLoading]="true" type="inline"></app-loading>
      </div>
    </app-wrap-full>`,
})
export class AppEntranceComponent implements OnInit {
  constructor(protected auth: AuthService,
              private app: AppService,
              protected route: ActivatedRoute,
              protected router: Router) {
  }

  ngOnInit(): void {
    const status = this.route.snapshot.data?.status;

    if (status) {

      const {installed} = status;

      if (installed) {
        this.app.setInstalled();
      } else {
        this.app.updateRoutes();
      }
    } else {
      this.app.errorRoutes();
    }
    //this.router.onSameUrlNavigation = 'reload';
    //this.router.navigateByUrl(location.pathname).then();

  }

}
