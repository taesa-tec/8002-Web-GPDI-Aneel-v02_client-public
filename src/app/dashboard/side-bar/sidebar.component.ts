import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '@app/services/users.service';
import {MenuItem, SIDEBAR_MENU} from '@app/commons';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;
  projetos: any;
  menu: Array<MenuItem>;

  constructor(
    @Optional() @Inject(SIDEBAR_MENU) menu: Array<MenuItem>,
    protected app: AppService, protected usersService: UsersService, protected modal: NgbModal) {
    this.menu = menu;
  }

  ngOnInit() {

  }
}
