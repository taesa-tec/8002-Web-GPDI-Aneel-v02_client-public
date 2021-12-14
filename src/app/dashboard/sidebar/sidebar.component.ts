import {Component, HostBinding, Inject, OnDestroy, Optional, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {MenuItem, SIDEBAR_MENU} from '@app/commons';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {clamp} from 'lodash-es';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;
  private readonly subscription: Subscription;
  projetos: any;
  menu: Array<MenuItem>;
  width = 256;

  @HostBinding('style')
  get widthstyle() {

    return {
      '--side-bar-width': `${this.width}px`
    };
  }

  constructor(
    @Optional() @Inject(SIDEBAR_MENU) menu: Array<MenuItem> | BehaviorSubject<Array<MenuItem>>) {
    if (menu instanceof Observable) {
      this.subscription = menu.subscribe(_menu => {
        this.menu = _menu;
      });
    } else if (Array.isArray(menu)) {
      this.menu = menu;
    } else {
      console.error('SIDEBAR: Menu não configurado corretamente', menu);
      this.menu = [];
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resize(x) {
    this.width = clamp(this.width + x, 200, 400);
  }
}
