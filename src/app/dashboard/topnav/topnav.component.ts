import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '@app/services/users.service';
import {MenuItem, TOPNAV_MENU} from '@app/commons';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
})
export class TopnavComponent implements OnDestroy {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;
  private readonly subscription: Subscription;
  projetos: any;
  menu: Array<MenuItem>;

  constructor(
    @Optional() @Inject(TOPNAV_MENU) menu: Array<MenuItem> | Observable<Array<MenuItem>>,
    protected app: AppService, protected usersService: UsersService, protected modal: NgbModal) {
    if (menu instanceof Observable) {
      this.subscription = menu.subscribe(_menu => {
        this.menu = _menu;
      });
    } else {
      this.menu = menu;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
