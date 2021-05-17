import {Component, HostBinding, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, ActivationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {KONAMI_CODE, KONAMI_CODE_MAP} from '@app/commons';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  version = '';
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
      console.log('%cKONAMI CODE - Você sabe o que está fazendo?', 'color:red; background: white');
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
      .subscribe(e => {
        this.loading.hide();
      });

    this.app.loading.observable.subscribe(show => {
      show ? this.loading.show() : this.loading.hide();
    });

    if (this.app.auth.isLoggedIn) {

    }
    this.loading.hide();
  }
}
