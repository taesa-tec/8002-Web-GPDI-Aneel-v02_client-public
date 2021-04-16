import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '@app/services/users.service';
import {MenuItem, SIDEBAR_MENU} from '@app/commons';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnDestroy {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;
  private readonly subscription: Subscription;
  projetos: any;
  menu: Array<MenuItem>;

  constructor(
    @Optional() @Inject(SIDEBAR_MENU) menu: Array<MenuItem> | BehaviorSubject<Array<MenuItem>>,
    protected app: AppService, protected usersService: UsersService, protected modal: NgbModal) {
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


}
